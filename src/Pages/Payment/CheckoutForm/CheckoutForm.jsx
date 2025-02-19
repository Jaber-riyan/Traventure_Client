import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
// import UseCart from '../../../../Hooks/UseCart/UseCart';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import UsePaymentHistory from '../../../Hooks/UsePaymentHistory/UsePaymentHistory';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../../Hooks/UseAuth/UseAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const axiosInstanceSecure = UseAxiosSecure();
    const { price, id: packageId } = useParams()
    // console.log(price, id);
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (price > 0) {
            axiosInstanceSecure.post('/create-payment-intent', { price: parseFloat(price) })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosInstanceSecure, price])

    console.log(clientSecret);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log(error);
            setErrorMsg(error.message);
            toast.error(error.message);
        }
        else {
            // console.log(paymentMethod);
            if (paymentMethod.id) {
                setErrorMsg("");
            }
        }

        // confirm payment 
        const { paymentIntent, error: confirmPaymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                }
            }
        })

        if (confirmPaymentError) {
            // setErrorMsg(confirmPaymentError.message);
            console.log(confirmPaymentError);
            toast.error(confirmPaymentError.message, { position: 'top-right' }
            );
        }

        else {
            if (paymentIntent.status === "succeeded") {
                // console.log(paymentIntent);
                const timestamp = paymentIntent.created;
                const date = new Date(timestamp * 1000);
                const formattedDate = new Date(date.toISOString()).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                    timeZoneName: 'short',
                });
                const paymentInfo = {
                    email: user?.email,
                    totalPrice: price,
                    paymentDate: formattedDate,
                    trxid: paymentIntent.id,
                    packageId: packageId,
                    status: "pending"
                }


                // add payment history API calling 
                const { data: addPayment } = await axiosInstanceSecure.post('/add-payment-statement', paymentInfo);
                console.log(addPayment);
                if (addPayment.status) {
                    toast.success("Payment Successfully")
                    navigate("/dashboard/payment-history")
                }
                else toast.error("Something went wrong to payment")
            }

        }

    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='md:w-3/4 mx-auto'>
                    <CardElement className=' border-4 border-[#f5bf6f] p-3 rounded-lg'></CardElement>
                    {
                        errorMsg
                        &&
                        <p className="text-red-500 text-sm mt-5">{errorMsg}</p>
                    }
                    {
                        transactionId
                        &&
                        <p className="text-green-500 text-sm mt-5">TnxID: {transactionId}</p>
                    }
                    <button
                        // disabled={!stripe || !clientSecret || !price || !cart?.data?.length}
                        type="submit"
                        className="w-full btn mt-3 btn-primary text-white rounded-lg transition duration-300 ease-in-out disabled:cursor-not-allowed"
                    >
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;