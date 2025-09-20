import ContactDetail from "@/components/contactDetail/ContactDetail";
import DBconnection from "@/util/connectDB";

export default function Home() {
  return (
    <>
      <div className="row flex flex-wrap justify-center gap-1 my-4 md:container mx-auto">
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
        <ContactDetail />
      </div>
    </>
  );
}

