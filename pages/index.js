import ContactDetail from "@/components/contactDetail/ContactDetail";
import ContactM from "@/models/contact";
import DBconnection from "@/util/connectDB";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import "@reimujs/aos/dist/aos.css";
import ValidatToken from "@/util/auths";
import { useRouter } from "next/router";

export default function contact({ conctactList }) {
  const [contact, setContactlist] = useState(conctactList);
  const [searchkey, setSearchkey] = useState("");
  const [searchgen, setSearchgen] = useState("");
  // AOS animation init
  useEffect(() => {
    import("@reimujs/aos").then(({ default: AOS }) => {
      AOS.init({
        duration: 800,
        once: true,
      });
    });
  }, []);

  //extract the gen and search from url
  const router = useRouter();
  const { gen, search } = router.query;
  useEffect(() => {
    gen ? setSearchgen(gen) : "";
    search ? setSearchkey(search) : "";
  }, []);

  // search Handler
  const searchHandler = async () => {
    try {
      const res = await fetch(
        `/api/contact?search=${searchkey}&gen=${searchgen}`
      );
      const data = await res.json();
      setContactlist(data);
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // trigger search when inputs change

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 bg-gray-50">
      {/* Search Bar Section */}
      <div
        className="flex flex-wrap justify-center items-center gap-3 w-full max-w-3xl mb-8 px-4"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <input
          type="text"
          onChange={(e) => setSearchkey(e.target.value)}
          value={searchkey}
          placeholder="firstname or lastname"
          className="border border-purple-400 outline-none w-30 md:w-80 sm:w-60 px-4 py-2 rounded-full focus:ring-2 focus:ring-purple-300"
        />
        <select
          onChange={(e) => setSearchgen(e.target.value)}
          value={searchgen}
          className="border border-purple-400 bg-white px-4 py-2 rounded-full shadow-sm focus:ring-2 focus:ring-purple-300"
        >
          <option value="">all</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
        <button
          onClick={searchHandler}
          className="bg-purple-700 text-white px-6 py-2 rounded-full shadow hover:bg-purple-800 transition"
        >
          search
        </button>
      </div>
      {/* contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-6xl">
        {contact.length > 0 ? (
          contact.map((contact) => (
            <div
              key={contact._id}
              dta-aos="fade-up"
              className="w-full sm:w-auto"
            >
              <ContactDetail {...contact} />
            </div>
          ))
        ) : (
          <div className="flex justify-center col-span-full">
            <div className="px-8 py-4 w-full max-w-md border-l-8 border-red-600 rounded-2xl bg-white shadow">
              <h1 className="text-center text-gray-700">
                There is no audience
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  DBconnection();

  const payload = ValidatToken(context);
  if (!payload) return { redirect: { destination: "/auth/login" } };
  const userId = payload.userId;
  console.log(userId);

  const { gen, search } = context.query;
  let Contact = null;
  if (gen && search) {
    if (gen == "male" || gen == "female") {
      Contact = await ContactM.find({
        $and: [
          { gender: gen },
          {
            $and: [
              {
                $or: [
                  { firstname: { $regex: search } },
                  { lastname: { $regex: search } },
                ],
              },
              { userId },
            ],
          },
        ],
      });
    }
  } else if (gen) {
    if (gen == "male") {
      Contact = await ContactM.find({ gender: gen, userId });
    } else if (gen == "female") {
      Contact = await ContactM.find({ gender: gen, userId });
    } else {
      Contact = await ContactM.find({ userId });
    }
  }

  //the search qs
  else if (search) {
    Contact = await ContactM.find({
      $and: [
        {
          $or: [
            { firstname: { $regex: search } },
            { lastname: { $regex: search } },
          ],
        },
        { userId },
      ],
    });
  } else {
    Contact = await ContactM.find({ userId });
  }
  console.log(Contact);

  return {
    props: {
      conctactList: JSON.parse(JSON.stringify(Contact)),
    },
  };
}
