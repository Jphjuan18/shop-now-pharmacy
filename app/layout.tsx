import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Be_Vietnam_Pro } from "next/font/google";

import { CartContextProvider } from "./context/dataContext";
import { ProductsContextProvider } from "./context/productsContext";

const be_vietnam_pro_bold = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata = {
  title: "Shop Now Pharmacy Home",
  description: "Shop Now Pharmacy Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
