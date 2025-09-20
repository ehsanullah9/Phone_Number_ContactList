import { useRouter } from "next/router";

export default function Custome404() {
    const router = useRouter()
    const goBack=()=>{
        return router.back()
    }
 return (
   <div>
    <h1>my custome 404</h1>
    <button className="bg-blue-300 px-5 py-2 rounded" onClick={goBack}>go back</button>
   </div>
 );
}