import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Show Now Pharmacy Products Page",
};
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
