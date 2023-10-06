import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | Churras admin",
  description: "Entre e participe do nosso churras",
};

const SignLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SignLayout;
