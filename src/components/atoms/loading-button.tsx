'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Button, ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, Props>(({ loading, children, ...props }, ref) => {
  return (
    <Button disabled={loading || props.disabled} ref={ref} {...props}>
      {loading ? (
        <span className="flex gap-1 items-center">
          Loading...
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </span>
      ) : (
        children
      )}
    </Button>
  );
});
LoadingButton.displayName = 'LoadingButton';
