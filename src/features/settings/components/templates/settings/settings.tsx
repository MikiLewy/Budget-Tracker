import SettingsForm from '../organisms/settings-form/settings-form';

import Page from '@/components/organisms/page/page';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';
import { prefetchUser } from '@/shared/api/lib/user.prefetch';

const Settings = () => {
  return (
    <Page>
      <Page.Header title="Settings" description="Manage your account settings" />
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchUser(queryClient)]}>
          <SettingsForm />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default Settings;
