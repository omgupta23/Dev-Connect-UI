import { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constant";

const Premium = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        BASE_URL + "/create-order",
        {},
        { withCredentials: true },
      );

      const options = {
        key: "rzp_test_Sum5et5dbEE5q2",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "DevConnect",
        description: "Premium Membership",
        handler: async function (response) {
          await axios.post(
            BASE_URL + "/verify-payment",
            { ...response },
            { withCredentials: true },
          );
          alert("Premium activated!");
        },
        modal: { ondismiss: () => setLoading(false) },
        theme: { color: "#7c3aed" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", () => setLoading(false));
      razorpay.open();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm text-center">
        <span className="text-4xl">👑</span>
        <h2 className="text-2xl font-bold text-white mt-3 mb-1">Go Premium</h2>
        <p className="text-gray-400 text-sm mb-6">
          One-time payment. Lifetime access.
        </p>

        <ul className="text-left space-y-3 mb-8">
          {[
            "Unlimited connection requests",
            "Boost your profile visibility",
            "Premium badge on profile",
            "Priority access to new features",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <span className="text-violet-400">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="text-4xl font-extrabold text-white mb-6">₹499</div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          {loading ? "Opening…" : "Upgrade Now"}
        </button>

        <p className="text-gray-600 text-xs mt-4">Secured by Razorpay</p>
      </div>
    </div>
  );
};

export default Premium;
