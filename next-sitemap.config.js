// next-sitemap.config.js - ENHANCED for better SEO
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://offer.dakhlaclub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/_next/*', '/404', '/500'],
  
  // ENHANCED: Better transform function with proper canonicalization
  transform: async (config, path) => {
    // Handle locale-specific paths with proper priority and canonicalization
    if (path === '/fr/evasion-holistique-3-jours' || path === '/en/evasion-holistique-3-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        // FIXED: Proper canonical enforcement
        alternateRefs: [
          {
            href: `${config.siteUrl}/fr/evasion-holistique-3-jours`,
            hreflang: 'fr-FR',
          },
          {
            href: `${config.siteUrl}/en/evasion-holistique-3-jours`,
            hreflang: 'en-US',
          },
          {
            href: `${config.siteUrl}/fr/evasion-holistique-3-jours`,
            hreflang: 'x-default',
          },
        ],
      }
    }

    // Handle root paths
    if (path === '/' || path === '/fr' || path === '/en') {
      return {
        loc: '/fr/evasion-holistique-3-jours', // Redirect to canonical URL
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Default transform with proper priorities
    return {
      loc: path,
      changefreq: 'monthly',
      priority: path === '/fr/evasion-holistique-3-jours' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    }
  },

  // ENHANCED: Better robots.txt with proper directives
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/', '/*.json$'],
      },
      // ADDED: Specific rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      }
    ],
    additionalSitemaps: [
      `https://offer.dakhlaclub.com/sitemap.xml`,
    ],
    // ADDED: Additional robots.txt directives
    additionalPaths: async (config) => [
      await config.transform(config, '/fr/evasion-holistique-3-jours'),
      await config.transform(config, '/en/evasion-holistique-3-jours'),
    ]
  },

  // ADDED: Additional sitemap generation options
  outDir: './public',
  generateRobotsTxt: true,
  
  // ADDED: Custom additionalPaths for better internal linking
  additionalPaths: async () => {
    return [
      {
        loc: '/fr/evasion-holistique-3-jours',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/en/evasion-holistique-3-jours', 
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    ]
  }
}