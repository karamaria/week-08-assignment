import { Comfortaa } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/structure/NavBar";

const comfortaa = Comfortaa({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: "panda blog!",
  description: "a super cool website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
