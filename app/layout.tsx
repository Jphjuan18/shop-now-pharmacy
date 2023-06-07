import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Be_Vietnam_Pro } from "next/font/google";

import { CartContextProvider } from "./context/cartContext";
import { ProductsContextProvider } from "./context/productsContext";
import Head from "next/head";
import { Metadata } from "next";

const be_vietnam_pro_bold = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shop-now-e0870.firebaseapp.com/"),
  title: {
    default: "Shop Now Pharmacy",
    template: `%s | Shop Now Pharmacy`,
  },
  description: "Shop Now Pharmacy is an online pharmacy store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={be_vietnam_pro_bold.className}>
        <ProductsContextProvider>
          <CartContextProvider>
            <Navbar />
            {children}
            <Footer />
          </CartContextProvider>
        </ProductsContextProvider>
      </body>
    </html>
  );
}
