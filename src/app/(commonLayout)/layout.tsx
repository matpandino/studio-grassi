import Header from "../components/header";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Estúdio Grassi",
  description: "Estúdio de Bodypiercing e tatoo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <Header rightElement='Contato' />
        {children}
      </body>
    </html>
  );
}
