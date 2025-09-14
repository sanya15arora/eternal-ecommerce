import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PaymentCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const returnTo = sessionStorage.getItem("returnTo") || "/";
        navigate(returnTo, { replace: true });
    }, [navigate]);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-red-50">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Payment Cancelled
            </h1>
            <p className="text-gray-700">Redirecting you back...</p>
        </section>
    );
};

export default PaymentCancel;
