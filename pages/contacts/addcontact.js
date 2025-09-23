import validateContact from "@/validations/validateContact";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiSpinnerGapBold } from "react-icons/pi";

export default function addContact() {
  const [spin, setSpin] = useState(false);

  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    phone: "",
  });
  //form handler method to post the data to db
  const FormdataHandler = async (e) => {
    e.preventDefault();
    const validata = validateContact({
      ...formdata,
      age: Number(formdata.age),
    });
    if (validata !== true) {
      const errorMessages = validata.map((err) => err.message);
      errorMessages.forEach((msg) => toast.error(msg));
      return;
    }
    setSpin(true)
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setSpin(false)
    toast.success(data);
       setFormdata({
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
      phone: "",
    });

  };
  

  return (
    <>
      <div className="container mx-auto">
        <div className="mx-auto my-12 p-8 border border-purple-400 rounded-2xl flex flex-col items-center justify-center w-100">
          <h1 className="text-center my-5 text-[32px] ">Add new contact</h1>

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
            type="text"
            onChange={(e) =>
              setFormdata({ ...formdata, lastname: e.target.value })
            }
            value={formdata.lastname}
            placeholder="last name"
            className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
          />
          <input
            type="text"
            onChange={(e) => setFormdata({ ...formdata, age: e.target.value })}
            value={formdata.age}
            placeholder="age name"
            className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
          />
          <select
            onChange={(e) =>
              setFormdata({ ...formdata, gender: e.target.value })
            }
            value={formdata.gender}
            className="border-1 outline-0 w-80 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
          >
            <option value="" disabled selected hidden>
              gedner
            </option>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
          <input
            type="text"
            onChange={(e) =>
              setFormdata({ ...formdata, phone: e.target.value })
            }
            value={formdata.phone}
            placeholder="phone name"
            className="border-1 outline-0 w-80 focus:outline-0 my-2  border-purple-400 px-4 py-1 rounded-2xl block"
          />
          {spin ? (
            <button
              onClick={FormdataHandler}
              className="bg-purple-500 outline-none hover:bg-purple-600 text-white font-bold py-2 mx-auto rounded-2xl w-60 flex items-center justify-center gap-2"
            >
              <PiSpinnerGapBold className="animate-spin" />
              <span>Processing...</span>
            </button>
          ) : (
            <button
              onClick={FormdataHandler}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 mx-auto  rounded-2xl w-60 flex items-center justify-center"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </>
  );
}
