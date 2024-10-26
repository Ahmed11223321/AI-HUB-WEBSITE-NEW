import keywords from '@/lib/keywords.json';

const baseUrl = 'https://ainewshub.com';

export default async function sitemap() {
  const routes = [
    '',
    '/about',
    '/contact',
    '/latest',
    '/opinion',
    '/events',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const categories = keywords.categories.map((category) => ({
    url: `${baseUrl}/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString(),
  }));

  const topics = keywords.topics.map((topic) => ({
    url: `${baseUrl}/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString(),
  }));

  const technologies = keywords.technologies.map((technology) => ({
    url: `${baseUrl}/technologies/${technology.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...categories, ...topics, ...technologies];
}