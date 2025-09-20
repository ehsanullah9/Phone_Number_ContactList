import MyNavabar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
 return(
  <>
  <MyNavabar />
<div><Toaster/></div>

  <Component {...pageProps} />
  </>
 )
}


