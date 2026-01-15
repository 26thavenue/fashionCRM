import type { Metadata } from "next";
import { Source_Sans_3, Rethink_Sans,  } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});


const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Thalia",
  description: "CRM for Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
        className={`${sourceSans.variable} ${rethinkSans.variable}  antialiased bg-secondary `}
      >
        <AuthProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}