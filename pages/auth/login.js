import Link from "next/link";
import { useEffect, useState } from "react";
import "@reimujs/aos/dist/aos.css";


export default function Login() {
  const [spin, setSpin] = useState(false);

//AOS
  useEffect(() => {
    // Dynamically import AOS to avoid SSR issues
    import("@reimujs/aos").then(({ default: AOS }) => {
      AOS.init({
        duration: 800,
        once: true,
      });
    });
  }, []);



  return (
    <>
      <div className="container mx-auto">
        <div
          data-aos="fade-up"
          className="mx-auto my-12 p-8 border border-purple-400 rounded-2xl flex flex-col items-center justify-center w-100"
        >
          <h1 className="text-center my-5 text-[32px] ">Login Form</h1>

          <input
            type="text"
            placeholder="Email"
            className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
          />
        {/* //the button is conttrolled by state spin  */}
          {spin ? (
            <button className="bg-purple-500 outline-none hover:bg-purple-600 text-white font-bold py-2 mx-auto rounded-2xl w-60 flex items-center justify-center gap-2">
              <PiSpinnerGapBold className="animate-spin" />
              <span>Processing...</span>
            </button>
          ) : (
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 mx-auto  rounded-2xl w-60 flex items-center justify-center">
              Login
            </button>
          )}
          <p className="my-4">Has not Account <Link href="/auth/register"><span className="text-purple-500 underline px-2">Register?</span></Link></p>
        </div>
      </div>
    </>
  );
}
