export interface GenerateSummaryBody {
    experienceLevel: string;
    skills: string[];
    jobTitle: string;
}

export interface GenerateSkillsBody {
    experienceLevel: string;
    jobTitle: string;
}

export interface GenerateProjectDescriptionBody {
    experienceLevel: string;
    projectName: string;
    projectTitle: string;
    projectType: string;
    role: string;
    technologies: string[];
}

export interface GenerateExperienceDescriptionBody {
    experienceLevel: string;
    techStack: string[];
    yearsOfExperience: number;
    jobRole: string;
}

export interface ImproveContentBody {
    content: string;
}
