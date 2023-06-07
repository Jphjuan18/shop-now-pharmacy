import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Show Now Pharmacy Shopping Login Page",
};
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
