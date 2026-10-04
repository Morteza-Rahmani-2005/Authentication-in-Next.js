import { serialize } from "cookie";



const handler = (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    return res.setHeader("Set-Cookie", serialize("token", "", {
        path: "/",
        maxAge: 0
    })).status(200).json({ message: "You have successfully logged out." })
}
export default handler;