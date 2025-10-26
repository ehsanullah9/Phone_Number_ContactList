import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // clear the cookie named "token"
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0, // delete immediately
      })
    );

    return res
      .status(200)
      .json({ message: "موافقانه از سایت خارج شدید" }); // "Successfully logged out"
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
