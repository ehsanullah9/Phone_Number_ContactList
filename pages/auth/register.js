import { useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa6";
import validateRegisterform from "@/validations/RgisterFormValidation";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter()
  const [spin, setSpin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
  });

  const showhide = () => setShowPass(!showPass);

  const FormHandler = async (e) => {
    e.preventDefault();

    const validateData = validateRegisterform(formdata);

    if (validateData !== true) {
      const errorMessages = validateData.map((error) => error.message);
      errorMessages.forEach((msg) => toast.error(msg));
      return;
    }
    setSpin(true)
    const res = await fetch('/api/auth/register' , {
      method:"POST",
      body:JSON.stringify(formdata),
      headers:{
        'Content-Type':'application/json'
      }
    });

    const data = await res.json()
    setSpin(false)
    toast.success(data.message)
    router.replace('/auth/login')
  }
  return (
    <div className="container mx-auto">
      <div
        data-aos="fade-up"
        className="mx-auto my-12 p-8 border border-purple-400 rounded-2xl flex flex-col items-center justify-center w-100"
      >
        <h1 className="text-center my-5 text-[32px] ">User Register Form</h1>

        <input
          onChange={(e) =>
            setFormdata({ ...formdata, firstname: e.target.value })
          }
          value={formdata.firstname}
          type="text"
          placeholder="first name"
          className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
        />

        <input
          onChange={(e) =>
            setFormdata({ ...formdata, lastname: e.target.value })
          }
          value={formdata.lastname}
          type="text"
          placeholder="last name"
          className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
        />

        <select
          value={formdata.gender}
          onChange={(e) =>
            setFormdata({ ...formdata, gender: e.target.value })
          }
          className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
        >
          <option value="" disabled hidden>
            gender
          </option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>

        <input
          onChange={(e) =>
            setFormdata({ ...formdata, email: e.target.value })
          }
          value={formdata.email}
          type="text"
          placeholder="Email"
          className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
        />

        <div className="border-1 outline-0 w-80 focus:outline-0 my-2 flex justify-between items-center border-purple-400 px-4 py-1 rounded-2xl">
          <input
            className="[all:unset]"
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
            value={formdata.password}
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          {!showPass ? (
            <FaRegEyeSlash onClick={showhide} />
          ) : (
            <FiEye onClick={showhide} />
          )}
        </div>

        {spin ? (
          <button className="bg-purple-500 outline-none hover:bg-purple-600 text-white font-bold py-2 mx-auto rounded-2xl w-60 flex items-center justify-center gap-2">
            <PiSpinnerGapBold className="animate-spin" />
            <span>Registering...</span>
          </button>
        ) : (
          <button
            onClick={FormHandler}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 mx-auto  rounded-2xl w-60 flex items-center justify-center"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}
