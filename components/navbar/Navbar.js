import Link from "next/link";
import { useRouter } from "next/router";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaListOlSolid } from "react-icons/lia";
import { MdSpaceDashboard } from "react-icons/md";
import { CiLogin ,CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";

export default function MyNavabar({isAuth , setIsAuth}) {
  const { route } = useRouter();
  
const LogoutHandler =async()=>{
  const res = await fetch("/api/auth/logout",{method:"GET"
    
  })
  const data = await res.json()
  setIsAuth(false)
  return toast.success(data.message)

}
  return (
    <>
      <div className="shadow-xl/5 bg-gray-100 p-1 flex">
        <div className="mx-auto flex p-3">
          
{isAuth?
<Link
            href="/auth/login"
            onClick={LogoutHandler}
            className="flex mx-6 justify-center items-center"
          >
            <CiLogout 
              size={18}
              className={
                route == "/auth/login"
                  ? "text-purple-700"
                  : "inline align-middle text-gray-950"
              }
            />
            <span className="mx-4">Logout</span>
          </Link>:
          <Link
            href="/auth/login"
            className="flex mx-6 justify-center items-center"
          >
            <CiLogin
              size={18}
              className={
                route == "/auth/login"
                  ? "text-purple-700"
                  : "inline align-middle text-gray-950"
              }
            />
            <span className="mx-4">login</span>
          </Link>
}

          {isAuth &&
          <Link
            href="/contacts/addcontact"
            className="flex mx-6 justify-center items-center"
          >
            <IoPersonAddOutline
              size={18}
              className={
                route == "/contacts/addcontact"
                  ? "text-purple-700"
                  : "inline align-middle text-gray-950"
              }
            />
            <span className="mx-4">AddContact</span>
          </Link>
           }
          <Link href="/" className="flex justify-center items-center ">
            <LiaListOlSolid
              size={20}
              className={route == "/" ? " text-purple-700" : " text-gray-950"}
            />
            <span className="mx-4"> Contact LIst</span>
          </Link>
          {isAuth &&
          <Link
            href="/contacts/dashboard"
            className="flex mx-6 justify-center items-center"
          >
            <MdSpaceDashboard
              size={18}
              className={
                route == "/contacts/dashboard"
                  ? "text-purple-700"
                  : "inline align-middle text-gray-950"
              }
            />
            <span className="mx-4">Dashboard</span>
          </Link>
          }
        </div>
      </div>
    </>
  );
}

