import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Show Now Pharmacy Checkout Page",
};
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
