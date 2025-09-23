import ContactDetail from "@/components/contactDetail/ContactDetail";
import ContactM from "@/models/contact";
import DBconnection from "@/util/connectDB";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import "@reimujs/aos/dist/aos.css";

export default function Home({ ContactList }) {
  const [contacts, setContacts] = useState(ContactList);
  const [searchkey , setSearchkey]= useState('')
  const [searchgen , setSearchgen] = useState('')

  useEffect(() => {
    // Dynamically import AOS to avoid SSR issues
    import("@reimujs/aos").then(({ default: AOS }) => {
      AOS.init({
        duration: 800, // animation duration
        once: true, // run only once
      });
    });
  }, []);
  //the search function
  const searchHandler = async()=>{
  try {
     const res = await fetch(`/api/contact?gen=${searchgen}&&search=${searchkey}`)
    const data = await res.json()
    setContacts(data.Con)
  } catch (error) {
    toast.error("خطا سمت سرور رخ داده")
  }
  }

  useEffect(()=>{
    searchHandler()
  },[searchkey,searchgen])

  return (
    <>
      <div
        className="container mx-auto flex justify-center my-4 "
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <input
          type="text"
          onChange={(e)=>setSearchkey(e.target.value)}
          placeholder="firstname or lastname"
          className="border-1 outline-0 md:w-80 sm:w-50 w-30 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
        />
        <select onChange={(e)=>setSearchgen(e.target.value)} className="border-purple-200 border hover:text-black mx-3  hover:border-transparent  px-4 py-2 rounded-full shadow">
          <option value="">all</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
        <button onClick={searchHandler} className="border-purple-200 border hover:border-transparent text-white bg-purple-700 px-4 py-2 rounded-full shadow">
          search
        </button>
      </div>

      <div className="flex flex-wrap  justify-center lg:justify-start  gap-1 my-4 container mx-auto">
        {contacts.length > 0 && 
        contacts.map((contact) => (
          <div
            className="sm:mx-0"
            key={contact._id}
            // add animation attribute
            data-aos="fade-up"
          >
            <ContactDetail {...contact} contacts={contacts} setContacts={setContacts} />
          </div>
        ))
        }
        {contacts.length == 0 && <div className="mx-auto px-22 py-3 w-120 mt-3 border-l-7 border-red-600 rounded-2xl border ">
          <h1 className="text-center">there is no audiance</h1>
          </div>}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  DBconnection();
  const data = await ContactM.find({});
  return {
    props: {
      ContactList: JSON.parse(JSON.stringify(data)),
    },
  };
}
