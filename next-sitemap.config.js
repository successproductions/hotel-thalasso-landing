/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://offer.dakhlaclub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  exclude: ['/api/*', '/admin/*', '/_next/*', '/404', '/500', '/fr', '/en', '/'],

  transform: async (config, path) => {
    // Handle Halloween special event (highest priority)
    if (path === '/fr/halloween' || path === '/en/halloween') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Handle 3-day offers
    if (path === '/fr/evasion-holistique-3-jours' || path === '/en/evasion-holistique-3-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Handle 5-day offers
    if (path === '/fr/evasion-holistique-5-jours' || path === '/en/evasion-holistique-5-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Handle 7-day offers
    if (path === '/fr/evasion-holistique-7-jours' || path === '/en/evasion-holistique-7-jours') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Handle legal pages
    if (path.includes('/legal/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async () => {
    return [
      // Halloween special event
      {
        loc: '/fr/halloween',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/en/halloween',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      // 3-day programs
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
      },
      // 5-day programs
      {
        loc: '/fr/evasion-holistique-5-jours',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/en/evasion-holistique-5-jours',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      // 7-day programs
      {
        loc: '/fr/evasion-holistique-7-jours',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/en/evasion-holistique-7-jours',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      // Legal pages
      {
        loc: '/fr/legal/cgv',
        changefreq: 'monthly',
        priority: 0.3,
      },
      {
        loc: '/en/legal/cgv',
        changefreq: 'monthly',
        priority: 0.3,
      },
      {
        loc: '/fr/legal/privacy',
        changefreq: 'monthly',
        priority: 0.3,
      },
      {
        loc: '/en/legal/privacy',
        changefreq: 'monthly',
        priority: 0.3,
      },
      {
        loc: '/fr/legal/cookies',
        changefreq: 'monthly',
        priority: 0.3,
      },
      {
        loc: '/en/legal/cookies',
        changefreq: 'monthly',
        priority: 0.3,
      },
    ];
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
};
