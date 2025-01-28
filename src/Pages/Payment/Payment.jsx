import React from "react";
import { FaCreditCard } from "react-icons/fa";
import 'animate.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

// stripe promise 
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);



const Payment = () => {
    return (
        <div className="min-h-screen">
            <section className="mt-10">
                <SectionTitle heading={"Payment"} subHeading={"Eat after Paying :)"}></SectionTitle>
            </section>
            <section>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </section>
        </div>
    );
};

export default Payment;


{/* <div className="flex justify-center items-center bg-gray-200">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate__animated animate__fadeIn">
        <form className="space-y-6">
            <div className="flex flex-col space-y-2">
                <label htmlFor="card-number" className="font-medium text-gray-700">
                    Card number
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaCreditCard className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        id="card-number"
                        placeholder="Card number"
                        className="w-full focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="expiry-cvc" className="font-medium text-gray-700">
                    MM/YY/CVC
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <input
                        type="text"
                        id="expiry-cvc"
                        placeholder="MM/YY/CVC"
                        className="w-full focus:outline-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-[#D1A054] text-white rounded-lg hover:bg-[#d19f54a8] transition duration-300 ease-in-out"
            >
                Pay
            </button>
        </form>
    </div>
</div> */}