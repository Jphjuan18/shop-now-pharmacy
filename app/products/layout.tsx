
import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: 'Peptide Products',
    description: 'Peptide Research Labs Products Page',
};
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {children}
      </section>
    );
  }