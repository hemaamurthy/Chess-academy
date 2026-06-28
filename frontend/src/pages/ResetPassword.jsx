const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("TOKEN =", token);
  console.log("PASSWORD =", password);

  const url =
    `https://chess-academy-0t5x.onrender.com/reset-password?token=${token}&new_password=${encodeURIComponent(password)}`;

  console.log("URL =", url);

  try {
    const res = await fetch(url, {
      method: "POST",
    });

    const data = await res.json();

    console.log("RESPONSE =", data);

    setMessage(data.message);
  } catch (err) {
    console.error("ERROR =", err);
    setMessage("Request Failed");
  }
};