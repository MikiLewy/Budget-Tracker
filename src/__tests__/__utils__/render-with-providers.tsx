import { cleanup, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

import { createQueryClientWrapper } from './create-query-client-wrapper';
import { createThemeWrapper } from './create-theme-wrapper';

afterEach(() => {
  cleanup();
});

const renderWithProviders = (ui: ReactElement, options = {}) => {
  const QueryClientWrapper = createQueryClientWrapper();
  const ThemeWrapper = createThemeWrapper();

  return render(ui, {
    ...options,
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientWrapper>
        <ThemeWrapper>{children}</ThemeWrapper>
      </QueryClientWrapper>
    ),
  });
};

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render method
export { renderWithProviders as render };
