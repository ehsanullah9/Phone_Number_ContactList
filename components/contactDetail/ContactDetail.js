import { useMemo } from "react";
import Image from "next/image";


export default function ContactDetail({firstname , lastname ,age ,phone ,_id}) {
  // Define some Tailwind text colors
  const colors = [
    "text-red-500",
    "text-red-300",
    "text-green-500",
    "text-blue-500",
    "text-purple-500",
    "text-pink-500",
    "text-yellow-500",
    "text-teal-500",
    "text-gray-500",
    "text-orange-500",
    "text-pink-500",
    "text-pink-300",
    "text-rose-500",
    "text-violet-500",
    "text-blue-500",
    "text-emerald-500",
    "text-amber-600",
    "text-red-400",
    "text-green-500",
  ];

  const randomColor = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <>
      <div className="flex  gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 shadow-purple-200 shadow-lg rounded-4xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="space-y-0.5">
              <Image
              className="rounded-full"
              src="/images/erin-lindford.90b9d461.jpg"
              width={60}
              height={60}
              alt="Picture of the author"
            />
            
            <p className={`text-lg font-semibold ${randomColor}`}>
              {firstname}
            </p>
            <p className="font-medium text-gray-500">{phone}</p>
          </div>
          <div className="flex justify-center items-center">
            <button className="border-purple-200 border text-purple-600 hover:border-transparent hover:bg-green-400 hover:text-white active:bg-purple-700 px-4 py-2 rounded-full shadow">
              Edit
            </button>
            <button className="border-purple-200 border mx-6 text-purple-600 hover:border-transparent hover:bg-red-600 hover:text-white active:bg-purple-700 px-4 py-2 rounded-full shadow">
              Delete
            </button>
            <button className="border-purple-200 border text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 px-4 py-2 rounded-full shadow">
              Favorite
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
