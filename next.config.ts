
module.exports = {
  // … your existing config …
  async redirects() {
    return [
      // Redirect all www.* traffic to the non-www root
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.offer.dakhlaclub.com",
          },
        ],
        permanent: true,
        destination: "https://offer.dakhlaclub.com/:path*",
      },
      // Redirect bare "/" to "/fr" (if you chose Option A above)
      {
        source: "/",
        permanent: true,
        destination: "/fr/sejour-serenite-5-jours",
      },
    ];
  },

  // ensure production JS is minified
  swcMinify: true,
};
