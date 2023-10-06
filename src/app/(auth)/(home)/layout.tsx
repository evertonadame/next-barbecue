import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Churras | Admin",
  description: "Churras | Admin",
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
