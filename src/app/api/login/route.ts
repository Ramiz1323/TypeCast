import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import connectDB from "@/lib/db";
import userModel from "@/models/user.model";
import { LoginBody } from "@/types/user.types";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        let body: LoginBody = await req.json();
        let { email, password } = body;

        let isExisted = await userModel.findOne({ email });
        if (!isExisted) {
            return NextResponse.json<ApiResponse<null>>({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        let matchPass = isExisted.comparePassword(password);
        
        if (!matchPass) {
            return NextResponse.json<ApiResponse<null>>({
                success: false,
                message: "Invalid password"
            }, { status: 401 });
        }

        let token = generateToken({ userId: isExisted._id.toString() });
        let cookiesStore = await cookies();
        cookiesStore.set("token", token, {
            httpOnly:true,
            secure:true,
            maxAge: 60 * 60,
            path:"/"
        });

        return NextResponse.json<ApiResponse<string>>({
            success: true,
            message: "User logged in successfully",
        }, { status: 200 });

    } catch (error) {
        console.log("error while logging in", error);
        return NextResponse.json<ApiResponse<null>>({
            success: false,
            message: "Something went wrong"
        }, { status: 500 });
    }
}