import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    summary: {
        type: String,
        default: ""
    },
    personalInfo: {
        type: {
            fullname: String,
            email: String,
            mobile: String,
            location: String,
            github: String,
            linkedIn: String,
            portfolio: String
        }, default: {}
    },
    education: {
        type: [{
            institutionName: String,
            degree: String,
            startDate: String,
            endDate: String
        }], default: []
    },
    workExperience: {
        type: [{
            companyName: String,
            position: String,
            location: String,
            startDate: String,
            endDate: String,
            description: String,
        }], default: []
    },
    projects: {
        type: [{
            title: String,
            description: String,
            gitHubUrl: String,
            liveUrl: String,
            techStack: [String],
        }], default: []
    },
    skills: {
        type: [String],
        default: []
    },
    certifications: {
        type: [String],
        default: []
    }
}, { timestamps: true })

const ResumeModel = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default ResumeModel;