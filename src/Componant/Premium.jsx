import axios from "axios";
import BASE_URL from "../utils/constant";

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
            alert("Premium Activated");
          }
        },

        theme: {
          color: "#6366f1",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Premium Plan</h1>

      <button onClick={handlePayment}>Buy Premium</button>
    </div>
  );
};

export default Premium;
