import { Metadata } from 'next';

import Settings from '@/features/settings/components/templates/settings/settings';

export const metadata: Metadata = {
  title: 'Settings',
  description:
    'Customize your budget tracker experience. Manage your account, preferences, and financial settings to fit your needs.',
};

const SettingsPage = () => {
  return <Settings />;
};

export default SettingsPage;
