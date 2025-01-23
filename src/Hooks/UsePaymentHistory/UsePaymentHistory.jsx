import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecureAndNormal/UseAxiosSecure";
import useAuth from "../UseAuth/UseAuth";


const UsePaymentHistory = () => {
    const axiosInstanceNormal = UseAxiosSecure();
    const { user } = useAuth();

    const { data: paymentHistory, refetch: paymentHistoryRefetch } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosInstanceNormal.get(`/payment-history/${user?.email}`);
            return res.data;
        }
    })

    return { paymentHistory, paymentHistoryRefetch };
};

export default UsePaymentHistory;