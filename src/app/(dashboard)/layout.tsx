'use client';

import { ReactNode, useEffect } from 'react';

import OnboardingDialog from '@/components/organisms/dialogs/onboarding-dialog/onboarding-dialog';
import { Navbar } from '@/components/organisms/navbar';
import { useDialog } from '@/hooks/use-dialog';
import { useCurrentUser } from '@/shared/hooks/query/use-current-user';

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [isOpenOnboardingDialog, handleOpenOnboardingDialog, handleCloseOnboardingDialog] = useDialog();

  const { data: userData } = useCurrentUser();

  useEffect(() => {
    if (userData && !userData?.completedOnboarding) {
      handleOpenOnboardingDialog();
    }
  }, [userData, handleOpenOnboardingDialog]);

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <main className="grow flex flex-col p-8 pt-6">{children}</main>
      <OnboardingDialog open={isOpenOnboardingDialog} onClose={handleCloseOnboardingDialog} />
    </div>
  );
};

export default DashboardLayout;
