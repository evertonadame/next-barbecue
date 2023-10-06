import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmar Email | Churras admin",
  description: "Entre e participe do nosso churras",
};

const ConfirmEmailLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ConfirmEmailLayout;
