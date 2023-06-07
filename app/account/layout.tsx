import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
};
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
