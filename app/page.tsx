import Image from "next/image";
import Best from "./components/best";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-100">
      <section className="bg-gray-100 flex flex-col justify-center items-center py-10 px-5">
        <h1 className="text-5xl font-bold mb-8">
          Unlock the Power of Peptides
        </h1>

        <Link href="/products"> 
        <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
          Shop Now
          </button>
        </Link>

        <p className="text-sm mt-8">
          Join our community of peptide enthusiasts!
        </p>
      </section>
      <section>
        <Best />
      </section>
    </main>
  );
}
