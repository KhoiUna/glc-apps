module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://glc-admin.vercel.app",
          "https://glc-cooking.vercel.app",
          "https://glc-events.vercel.app",
        ]
      : /(http:\/\/localhost:300)\d{1}$/,
  eventSubmissionOrigin:
    process.env.NODE_ENV === "production"
      ? "https://glc-events.vercel.app"
      : "http://localhost:3001",
};
