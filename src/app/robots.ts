import { loadEnvConfig } from '@next/env';
import type { MetadataRoute } from 'next';

const dev = process.env.NODE_ENV !== 'production';
const { ROBOT_DISALLOW } = loadEnvConfig('./', dev).combinedEnv;

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots['rules'] = { userAgent: '*' };
  if (ROBOT_DISALLOW) {
    rules.disallow = '/';
  } else {
    rules.allow = '/';
  }
  return {
    rules,
    sitemap: 'https://watcharc.org/sitemap.xml',
  };
}
