const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url(/assets/main-bg.png)]">
      {children}
    </main>
  );
};

export default AuthLayout;
