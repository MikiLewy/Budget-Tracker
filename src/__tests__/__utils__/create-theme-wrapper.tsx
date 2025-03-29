import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export const createThemeWrapper = () => {
  const ThemeWrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );

  ThemeWrapper.displayName = 'ThemeWrapper';

  return ThemeWrapper;
};
