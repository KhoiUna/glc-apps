module.exports = {
  swcMinify: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  //Redirect pages
  async redirects() {
    return [
      {
        source: "/apply",
        destination: "/",
        permanent: true,
      },
      {
        source: "/time",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
