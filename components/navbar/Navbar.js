import Link from "next/link";
import { useRouter } from "next/router";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaListOlSolid } from "react-icons/lia";

export default function MyNavabar() {
  const { route } = useRouter();
  console.log(route);
  return (
    <>
      <div className="shadow-xl/5 bg-gray-100 p-1 grid grid-cols-1">
        <div className="mx-auto flex p-3">
          <Link href="/contacts/addcontact" className="flex mx-6 justify-center items-center">
            <IoPersonAddOutline   size={18}
              className={route == "/contacts/addcontact" ? "text-purple-700" : "inline align-middle text-gray-950"}
            />
            <span className="mx-4">AddContact</span>
          </Link>
          <Link href="/" className="flex justify-center items-center ">
            <LiaListOlSolid size={20}
              className={route == "/" ? " text-purple-700" : " text-gray-950"}
            />
            <span className="mx-4"> Contact LIst</span>

           
          </Link>
        </div>
      </div>
    </>
  );
}
