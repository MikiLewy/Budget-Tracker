import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Budget Tracker',
    short_name: 'Budget Tracker',
    description:
      'Track your budget and expenses with ease. Budget Tracker is a simple and easy-to-use tool that helps you manage your money.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
