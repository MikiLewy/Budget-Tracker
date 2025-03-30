import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sign-in`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sign-up`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/overview`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/transactions`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/recurring-transactions`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/settings`,
      lastModified: new Date(),
    },
  ];
}
