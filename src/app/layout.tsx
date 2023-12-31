import HeaderSignOut from "@/components/alpha/HeaderSignOut";
import "@/styles/globals.scss";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Link from "next/link";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={raleway.className}>
          <div className="shadow-container">
            <HeaderSignOut />
            <Link href="/">
              <h1 className="page-title">
                <a>Agenda de Churras🍖</a>
              </h1>
            </Link>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
