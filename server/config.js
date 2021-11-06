module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://cooking-reservation.vercel.app"
      : "http://localhost:3000",
};
