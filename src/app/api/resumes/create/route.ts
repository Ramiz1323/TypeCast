import connectDB from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ResumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const userId = await getCurrentUser();
        const newResume = await ResumeModel.create({
            user_id: userId,
            title: "Untitled Resume",
            summary:"",
            personalInfo:{
                fullname:"",
                email:"",
                mobile:"",
                location:"",
                github:"",
                portfolio:"",
                linkedIn:""
            },
            education:[
                {
                    institutionName:"",
                    degree:"",
                    startDate:"",
                    endDate:""
                }
            ],
            workExperience:[
                {
                    companyName:"",
                    position:"",
                    location:"",
                    startDate:"",
                    endDate:"",
                    description:""
                }
            ],
            projects:[
                {
                    title:"",
                    description:"",
                    gitHubUrl:"",
                    liveUrl:"",
                    techStack:[]
                }
            ],
            skills:[],
            certifications:[],
            achievements:[]
        });

        return NextResponse.json<ApiResponse<null>>({
            success: true,
            message: "Resume created successfully",
            data: newResume
        }, { status: 201 });

    } catch (error) {
        console.log("error while creating resume",error);
        return NextResponse.json<ApiResponse<null>>({
            success: false,
            message: "Something went wrong"
        }, { status: 500 });
    }
}