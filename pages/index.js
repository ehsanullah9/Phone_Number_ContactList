import ContactDetail from "@/components/contactDetail/ContactDetail";
import ContactM from "@/models/contact";
import DBconnection from "@/util/connectDB";
import { useState, useEffect } from "react";
import "@reimujs/aos/dist/aos.css";

export default function Home({ ContactList }) {
  const [contacts, setContacts] = useState(ContactList);

  useEffect(() => {
    // Dynamically import AOS to avoid SSR issues
    import("@reimujs/aos").then(({ default: AOS }) => {
      AOS.init({
        duration: 8000, // animation duration
        once: true, // run only once
      });
    });
  }, []);

  return (
    <>
      <div className="container mx-auto flex justify-center my-4 ">
        <input
          type="text"
          placeholder="firstname or lastname"
          className="border-1 outline-0 md:w-80 sm:w-50 w-30 focus:outline-0 my-2 border-purple-400 px-4 py-1 rounded-2xl block"
        />
        <select className="border-purple-200 border hover:text-black mx-3 text-purple-600 hover:border-transparent bg-green-400 px-4 py-2 rounded-full shadow">
          <option value="">all</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
        <button className="border-purple-200 border hover:border-transparent text-white bg-purple-700 px-4 py-2 rounded-full shadow">
          search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-1 my-4 md:container mx-auto">
        {contacts.map((contact) => (
          <div
            key={contact._id}
             // add animation attribute
            data-aos="fade-up"

          >
            <ContactDetail {...contact} />
          </div>
        ))}
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
