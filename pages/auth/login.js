import Link from "next/link";
import { useEffect, useState } from "react";
import "@reimujs/aos/dist/aos.css";
import validateLogin from "@/validations/LoginValidation";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [spin, setSpin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const LoginFormHandler = async (e) => {
    e.preventDefault();
    const validate = validateLogin(loginData);

    if (validate !== true) {
      const errorMsg = validate.map((err) => err.message);
      errorMsg.forEach((msg) => {
        toast.error(msg);
      });
    }

    const res = await fetch('/api/auth/login' , {
      method:"POST",
      body:JSON.stringify(loginData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(res.status == 422 || res.status == 500 || res.status == 409)return
    const data = await res.json()
    toast.success(data.message)
  };

  const showhide = () => setShowPass(!showPass);

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
            value={loginData.email}
            onChange={(e)=>setLoginData({ ...loginData, email: e.target.value })}
            type="text"
            placeholder="Email"
            className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
          />
          <div className="border-1 outline-0 w-80 focus:outline-0 my-2 flex justify-between items-center border-purple-400 px-4 py-1 rounded-2xl">
            <input
              className="[all:unset]"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              value={loginData.password}
              type={showPass ? "text" : "password"}
              placeholder="Password"
            />
            {!showPass ? (
              <FaRegEyeSlash onClick={showhide} />
            ) : (
              <FiEye onClick={showhide} />
            )}
          </div>
          {/* //the button is conttrolled by state spin  */}
          {spin ? (
            <button className="bg-purple-500 outline-none hover:bg-purple-600 text-white font-bold py-2 mx-auto rounded-2xl w-60 flex items-center justify-center gap-2">
              <PiSpinnerGapBold className="animate-spin" />
              <span>Processing...</span>
            </button>
          ) : (
            <button
              onClick={LoginFormHandler}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 mx-auto  rounded-2xl w-60 flex items-center justify-center"
            >
              Login
            </button>
          )}
          <p className="my-4">
            Has not Account{" "}
            <Link href="/auth/register">
              <span className="text-purple-500 underline px-2">Register?</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
