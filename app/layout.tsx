import './globals.css'
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import { Be_Vietnam_Pro } from "next/font/google"

const be_vietnam_pro_bold = Be_Vietnam_Pro({ subsets: ['latin'], weight: ["500"] })

export const metadata = {
  title: 'Shop Now',
  description: 'Shop Now landing page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={be_vietnam_pro_bold.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
      
    </html>
  )
}
