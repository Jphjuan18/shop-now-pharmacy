import './globals.css'
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import { Be_Vietnam_Pro } from "next/font/google"

import { CartContextProvider } from "./context/dataContext";

const be_vietnam_pro_bold = Be_Vietnam_Pro({ subsets: ['latin'], weight: ["500"] })

export const metadata = {
  title: 'Peptide Research Labs Home',
  description: 'Peptide Research Labs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={be_vietnam_pro_bold.className}>
      
      
        <CartContextProvider>
      
        <Navbar />
        {children}
        <Footer />
        
        
        </CartContextProvider>
        
        </body>
      
    </html>
  )
}
