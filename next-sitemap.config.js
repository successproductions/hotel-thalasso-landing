/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://offer.dakhlaclub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/_next/*'],
  
  // Enhanced transform function
  transform: async (config, path) => {
    // Handle locale-specific paths with proper priority
    if (path === '/fr/evasion-holistique-3-jours' || path === '/en/evasion-holistique-3-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${config.siteUrl}/fr/evasion-holistique-3-jours`,
            hreflang: 'fr',
          },
          {
            href: `${config.siteUrl}/en/evasion-holistique-3-jours`,
            hreflang: 'en',
          },
          {
            href: `${config.siteUrl}/fr/evasion-holistique-3-jours`,
            hreflang: 'x-default',
          },
        ],
      }
    }

    // Default transform with proper priorities
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/']
      }
    ],
    additionalSitemaps: [
      `https://offer.dakhlaclub.com/sitemap.xml`,
    ],
  },
}