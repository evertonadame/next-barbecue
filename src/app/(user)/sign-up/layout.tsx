import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastre-se | Churras admin",
  description: "Cadastre-se e participe do nosso churras",
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
