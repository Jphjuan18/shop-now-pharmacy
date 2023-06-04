
import { Metadata } from 'next';
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";
 
export const metadata: Metadata = {
    title: 'Shop Now Pharmacy Products',
    description: 'Show Now Pharmacy Products Page',
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
