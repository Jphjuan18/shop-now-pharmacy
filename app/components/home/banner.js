import Image from "next/image";

export default function banner() {
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center md:px-52">
      {" "}
      <div className="relative mx-auto">
        <Image
          className="w-full"
          width={300}
          height={300}
          src="../../../capsulesBackground.jpg"
          alt="Shop Now Pharmacy Home Image"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-4 w-2/3">
          <p className="text-lg font-bold text-center">Buy More Spend Less</p>
        </div>
      </div>
    </div>
  );
}
