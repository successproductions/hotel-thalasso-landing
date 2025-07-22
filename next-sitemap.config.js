// next-sitemap.config.js - ENHANCED for better SEO
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://offer.dakhlaclub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/_next/*', '/404', '/500'],
  
  transform: async (config, path) => {
    // Handle 3-day offer
    if (path === '/fr/evasion-holistique-3-jours' || path === '/en/evasion-holistique-3-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // 🆕 ADD 5-DAY OFFER HANDLING
    if (path === '/fr/evasion-holistique-5-jours' || path === '/en/evasion-holistique-5-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }
  },

  additionalPaths: async () => {
    return [
      {
        loc: '/fr/evasion-holistique-3-jours',
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: '/en/evasion-holistique-3-jours',
        changefreq: 'weekly', 
        priority: 1.0,
      },
      {
        loc: '/fr/evasion-holistique-5-jours',
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: '/en/evasion-holistique-5-jours',
        changefreq: 'weekly',
        priority: 1.0,
      }
    ]
  }
}