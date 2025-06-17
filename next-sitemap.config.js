/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://offer.dakhlaclub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  
  // Transform function to handle multilingual URLs
  transform: async (config, path) => {
    // Handle locale-specific paths
    if (path === '/fr' || path === '/en') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${config.siteUrl}/fr`,
            hreflang: 'fr',
          },
          {
            href: `${config.siteUrl}/en`,
            hreflang: 'en',
          },
          {
            href: `${config.siteUrl}/fr`,
            hreflang: 'x-default',
          },
        ],
      }
    }

    // Default transform
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    additionalSitemaps: [
      `https://offer.dakhlaclub.com/sitemap.xml`,
    ],
  },
}