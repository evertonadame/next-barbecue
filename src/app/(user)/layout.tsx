import Logo from "@/components/ui/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="auth-container">{children}</div>
      <Logo />
    </>
  );
};

export default AuthLayout;
