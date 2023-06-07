import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Show Now Pharmacy Shopping Cart Page",
};
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
