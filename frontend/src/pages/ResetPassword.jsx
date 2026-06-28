import { useState } from "react";

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("TOKEN =", token);
    console.log("PASSWORD =", password);

    try {
      const res = await fetch("https://chess-academy-0t5x.onrender.com/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });

      const data = await res.json();
      console.log("RESPONSE =", data);
      setMessage(data.message);
    } catch (err) {
      console.error("ERROR =", err);
      setMessage("Request Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-900 p-8 rounded-xl border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-6">
        Reset Password
      </h1>

      {!token && (
        <p className="text-red-400 mb-4">Invalid or missing reset token. Please request a new reset link.</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
          required
        />
        <button
          type="submit"
          disabled={!token}
          className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg"
        >
          Reset Password
        </button>
      </form>

      {message && (
        <p className={`mt-4 break-words ${message.toLowerCase().includes("success") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}