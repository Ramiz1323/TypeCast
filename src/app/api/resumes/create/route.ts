import connectDB from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const userId = await getCurrentUser();
        let response = NextResponse.json({
            success:true,
            message:"Api worked Successfully",
            data:userId
        },{
            status:200
        })
        return response;
    } catch (error) {
        console.log(error);
        let response = NextResponse.json({
            success:false,
            message:"Api doesn't worked"
        },{
            status:500
        })
        return response;
    }
}