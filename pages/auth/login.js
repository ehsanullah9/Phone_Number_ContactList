import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import "@reimujs/aos/dist/aos.css";
import validateLogin from "@/validations/LoginValidation";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/router";
import ValidatToken from "@/util/auths";

export default function Login({isAuth , setIsAuth}) {
  const [spin, setSpin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter()

  const LoginFormHandler = async (e) => {
    e.preventDefault();
    const validate = validateLogin(loginData);
    setSpin(true)
    if (validate !== true) {
      const errorMsg = validate.map((err) => err.message);
      errorMsg.forEach((msg) => {
       return toast.error(msg);
      });
      setSpin(false)

    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {"Content-Type": "application/json",},
    });
    const data = await res.json();
    if (res.status == 422 || res.status == 500 || res.status == 409){
      setSpin(false)
      return toast.error(data.message);
    }
    toast.success(data.message);
    router.replace('../contacts/dashboard')
    setIsAuth(true)
  };

  const showhide = () => setShowPass(!showPass);

  const emailRef = useRef(null)

  //AOS
  useEffect(() => {
    emailRef.current.focus()
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
          <form onSubmit={LoginFormHandler}>
            <h1 className="text-center my-5 text-[32px] ">Login Form</h1>

            <input
            ref={emailRef}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
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
              <button
                disabled
                className="bg-purple-500 outline-none hover:bg-purple-600 text-white font-bold py-2 mx-auto rounded-2xl w-60 flex items-center justify-center gap-2"
              >
                <PiSpinnerGapBold nerGapBold className="animate-spin" />
                <span>Processing...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 mx-auto  rounded-2xl w-60 flex items-center justify-center"
              >
                Login
              </button>
            )}
          </form>
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



export async function getServerSideProps(context) {
  const payload = ValidatToken(context)
  if(payload){
    return{
      redirect:{
        destination:'/contacts/dashboard'
      }
    }
  }

  return{
    props:{
      
    }
  }
}