module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://glc-admin.vercel.app",
          "https://glc-cooking.vercel.app",
          "https://glc-events.vercel.app",
        ]
      : ["http://localhost:3000", "http://localhost:3001"],
};
