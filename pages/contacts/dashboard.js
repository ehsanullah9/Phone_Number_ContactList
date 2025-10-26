import User from "@/models/User";
import ValidatToken from "@/util/auths";
import DBconnection from "@/util/connectDB";
import { verify } from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";

export default function Dashboard({ user }) {
  const { firstname, lastname } = user;
  return (
    <>
      <h1 className="text-8xl text-center">
        Hi {firstname} {lastname}
      </h1>
      <h1 className="text-8xl text-center">welcome</h1>;
    </>
  );
}

export async function getServerSideProps(context) {
 
  const tokenPayload =ValidatToken(context)

  if(!tokenPayload){
    return {
      redirect:{
        destination:"/auth/login"
      }
    }
  }
  await DBconnection();

  //finde user in db by payload info
  const user = await User.findOne({ email: tokenPayload.email })
    .select("firstname lastname -_id")
    .lean();
  console.log(user);
  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
