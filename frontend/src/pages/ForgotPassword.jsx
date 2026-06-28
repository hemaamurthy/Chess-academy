import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://chess-academy-0t5x.onrender.com/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("ERROR =", err);
      setMessage("Request Failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-900 p-8 rounded-xl border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-6">
        Forgot Password
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg"
        >
          Send Reset Link
        </button>
      </form>

      {message && (
        <p className={`mt-4 break-words ${message.toLowerCase().includes("failed") ? "text-red-400" : "text-green-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}