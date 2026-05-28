import axios from "axios";
import BASE_URL from "../utils/constant";
import { Crown, Check, Sparkles, Zap } from "lucide-react";

const Premium = () => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        BASE_URL + "/create-order",
        {},
        {
          withCredentials: true,
        },
      );

      const options = {
        key: "rzp_test_Sum5et5dbEE5q2",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "DevConnect",

        description: "Premium Membership",

        handler: async function (response) {
          const verify = await axios.post(
            BASE_URL + "/verify-payment",
            {
              ...response,
            },
            {
              withCredentials: true,
            },
          );

          if (verify.data.success) {
            alert("🚀 Premium Activated Successfully");
          }
        },

        theme: {
          color: "#8b5cf6",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT SECTION */}

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Crown className="text-yellow-400" size={40} />
            <h1 className="text-5xl font-bold">DevConnect Premium</h1>
          </div>

          <p className="text-gray-400 text-lg mb-8">
            Unlock premium networking features and grow your developer circle
            faster.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl">
              <Check className="text-green-400" />
              <p>Unlimited Connection Requests</p>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl">
              <Sparkles className="text-pink-400" />
              <p>Boost Your Profile Visibility</p>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl">
              <Zap className="text-yellow-300" />
              <p>Priority Access To New Features</p>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl">
              <Crown className="text-purple-400" />
              <p>Premium Badge On Your Profile</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div className="bg-gradient-to-br from-purple-900 via-zinc-900 to-black border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6">
              <Crown size={18} />
              Most Popular
            </div>

            <h2 className="text-4xl font-bold mb-2">Premium Plan</h2>

            <p className="text-gray-400 mb-6">One-time payment</p>

            <div className="mb-8">
              <span className="text-6xl font-bold">₹499</span>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-all duration-300 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg"
            >
              Upgrade To Premium 🚀
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Secure payments powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
