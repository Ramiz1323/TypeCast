import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
    let cookieStore = await cookies()
    let token = cookieStore.get('token')?.value;
    if(!token) throw new Error("Token Not Found");

    const decode = verifyToken(token);
    console.log("Decode Value", decode);

    if(!decode) throw new Error ("Unauthorized");

    return decode.userId;
}