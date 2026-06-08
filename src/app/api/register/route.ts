import connectDB from "@/lib/db";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user.model";

export async function POST(req: NextRequest) {
    try {
        //create mongodb connection and create usermodel
        await connectDB();
        const User = userModel;
        const body: RegisterBody = await req.json();
        const { name, email, password, mobile } = body;

        if (!name || !email || !password) {
            return NextResponse.json<ApiResponse<null>>({
                success: false,
                message: "Please provide name, email and password"
            }, { status: 400 });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json<ApiResponse<null>>({
                success: false,
                message: "User already exists"
            }, { status: 400 });
        }

        //Create the user
        const user = await User.create({
            name,
            email,
            password,
            mobile
        });

        return NextResponse.json<ApiResponse<null>>({
            success: true,
            message: "User created successfully",
            data: user
        }, { status: 201 });
        } catch (error) {
        console.log("error while creating user", error);
        return NextResponse.json<ApiResponse<null>>({
            success: false,
            message: "Something went wrong"
        }, { status: 500 });
    }
}