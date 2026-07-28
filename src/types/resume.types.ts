import{ Types } from "mongoose";

export interface IPersonalInfo {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    linkedIn: string;
    portfolio: string;
}

export interface IWorkExperience {
    companyName: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface IEducation {
    institutionName: string;
    degree: string;
    startDate: string;
    endDate: string;
}

export interface IProjects {
    title: string;
    description: string;
    gitHubUrl: string;
    liveUrl: string;
    techStack: string[];
}

export interface IResume {
    _id?: string;
    user_id: Types.ObjectId;
    title: string;
    summary: string;
    personalInfo: IPersonalInfo;
    workExperience?: IWorkExperience[];
    education: IEducation[];
    projects: IProjects[];
    skills?: string[];
    certifications?: string[];
    achievements?: string[];
}