import connectToDB from "@/configs/db";
import UserModel from "@/models/User"
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return false
    }

    try {
        connectToDB()


        const { firstname,
            lastname,
            username,
            email,
            password
        } = req.body;

        /// Validation
        if (!firstname.trim() || !lastname.trim() || !username.trim() || !email.trim() || !password.trim()) {
            return res.status(422).json({ message: "data is not valid :((" })
        }

        // isUserExist

        const existingUser = await UserModel.findOne({
            $or: [{ username: username }, { email: email }]
        }).select("_id");


        if (existingUser) {
            return res.status(422).json({
                message: "A user with these details has already registered."
            });
        }



        // hashPassword
        const hashedPassword = await hashPassword(password)


        // generateToken
        const token = generateToken({ email })



        const users = await UserModel.find({})


        console.log(users)

        // Create
        await UserModel.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            role: users.length > 0 ? "USER" : "ADMIN"
        })

        return res.setHeader("Set-Cookie", serialize("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24
        })).status(201).json({ message: "user Cearted soccessfully:))" })

    } catch (err) {
        return res.status(500).json({ message: "Unknown Internal Server Error !!" })

    }
}
export default handler;