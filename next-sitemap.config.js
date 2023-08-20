/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_ORIGIN,
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml', '/quiz', '/401', '/404', '/login'],
  sitemapSize: 5000,
  priority: 1,
  changefreq: 'daily',
  robotsTxtOptions: {
    policies: [
      // TODO: 추후 공개되는 페이지 sitemap.xml ssr 페이지 만들어서 동적 추가할 것
      { userAgent: '*', allow: '/$', disallow: '/' },
    ],
  },
};
