import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://corewear.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://corewear.vercel.app/products',
      lastModified: new Date(),
    },
  ]
}