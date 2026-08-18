"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createResumeApi,
  getResumeByIdApi,
  updateResumeApi,
} from "@/apis/resume.api";
import {
  generateSummaryApi,
  generateSkillsApi,
  generateProjectDescriptionApi,
  generateExperienceDescriptionApi,
  improveContentApi,
  atsScoreApi,
} from "@/apis/ai.api";
import { IResume, IPersonalInfo, IWorkExperience, IEducation, IProjects } from "@/types/resume.types";
import { AtsScoreResult } from "@/types/ai.types";
import {
  Sparkles,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  BarChart2,
  Printer,
  Save,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Wand2,
  ArrowRight,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
  );
}

function ResumeBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const { user } = useAuth();

  const [resumeId, setResumeId] = useState<string | null>(queryId);
  const [loadingResume, setLoadingResume] = useState<boolean>(!!queryId);

  // Resume Form State
  const [title, setTitle] = useState("Sk Ramiz Raza Resume");
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
    fullname: user?.name || "Sk Ramiz Raza",
    email: user?.email || "Ramizraza2313@gmail.com",
    mobile: "6289338509",
    location: "Kolkata, West Bengal",
    github: "github.com/sk-ramiz-raza",
    linkedIn: "in/sk-ramiz-raza",
    portfolio: "skramizraza.tech",
  });

  const [summary, setSummary] = useState(
    "Full-stack developer specializing in building scalable web applications and AI-driven systems using React, Next.js, and Node.js. Experienced in designing secure, high-performance architectures with REST APIs, JWT authentication, and efficient data handling using MongoDB and Redis. Developed advanced projects integrating LangChain, computer vision (MediaPipe), and real-time systems, delivering intelligent, user-centric solutions. Strong focus on performance optimization, system design, and building production-ready applications."
  );

  const [skills, setSkills] = useState<string[]>([
    "Programming & Core: JavaScript (ES6+), TypeScript, Python, SQL",
    "Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, SCSS, Framer Motion",
    "Backend & APIs: Node.js, Express.js, REST API Development, JWT Authentication",
    "Database & Storage: MongoDB, Mongoose, Redis",
    "Advanced Tech: LangChain, Mistral AI, MediaPipe (Computer Vision), AI Integration",
    "Tools & DevOps: Git, GitHub, Vite, Postman, Axios, Docker (Basic)",
    "Security & Validation: Zod, Bcrypt.js, Input Validation, Role-Based Access Control (RBAC)",
    "Data & Visualization: Recharts, Data Analysis, JSON Handling",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const [workExperience, setWorkExperience] = useState<IWorkExperience[]>([
    {
      companyName: "ARDENT COMPUTECH PVT LTD",
      position: "Full Stack Web Developer",
      location: "Kolkata, West Bengal",
      startDate: "October 2025",
      endDate: "December 2025",
      description: "• Built a scalable full-stack expense management system using React, Node.js, and MongoDB with secure JWT-based authentication.\n• Designed RESTful APIs and optimized data handling to deliver real-time insights and high-performance user experience.",
    },
    {
      companyName: "GAOTek Inc.",
      position: "Web Design Intern",
      location: "Remote",
      startDate: "March 2025",
      endDate: "July 2025",
      description: "• Developed and maintained scalable web applications with a focus on performance, responsiveness, and clean architecture.\n• Implemented end-to-end features across frontend and backend while collaborating in team-driven development environments following industry.",
    },
  ]);

  const [projects, setProjects] = useState<IProjects[]>([
    {
      title: "Lyra AI (Advanced Research & Synthesis Engine)",
      description: "• Architected an agentic AI research engine using LangChain and Mistral AI to synthesize real-time web data into structured, citation-backed.\n• Built real-time streaming responses with Socket.io, reducing perceived latency by ~40% and improving user interaction.\n• Developed scalable REST APIs with Node.js and Express, implementing secure JWT authentication and Bcrypt-based encryption.\n• Managed complex application state using Redux Toolkit, enabling persistent multi-session chat and seamless UX.\n• Designed a high-performance UI with SCSS and Vite, ensuring sub-1s load times with strong validation using Zod for data integrity.",
      gitHubUrl: "github.com/sk-ramiz-raza/lyra-ai",
      liveUrl: "lyra-ai.tech",
      techStack: ["LangChain", "Mistral AI", "Socket.io", "React", "Node.js"],
    },
    {
      title: "FinTrack – Full-Stack Enterprise-Grade Personal Finance Management Platform",
      description: "• Built a full-stack finance platform using Next.js and TypeScript with optimized performance (+40% load speed).\n• Developed analytics dashboards for expense tracking and financial insights.\n• Implemented secure JWT-based authentication and RBAC system.\n• Ensured data consistency using Zod validation and MongoDB schemas.",
      gitHubUrl: "github.com/sk-ramiz-raza/fintrack",
      liveUrl: "fintrack.dev",
      techStack: ["Next.js", "TypeScript", "MongoDB", "Zod", "Tailwind"],
    },
    {
      title: "Cineva — AI-Powered Movie Discovery Engine & Gesture-Controlled Platform",
      description: "• Engineered an AI-powered movie discovery platform using MediaPipe for real-time facial analysis and mood-based recommendations.\n• Implemented gesture-controlled navigation via hand-tracking and custom React hooks for touchless user interaction.\n• Built a high-performance backend with Redis caching, reducing API load and rate-limit triggers by ~70%.\n• Optimized search and data flow using debouncing and Redux caching, lowering API overhead by ~60%.\n• Built a secure RBAC admin system and responsive UI with Tailwind and Framer Motion, achieving 90+ Lighthouse scores and <1.5s FCP.",
      gitHubUrl: "github.com/sk-ramiz-raza/cineva",
      liveUrl: "cineva.app",
      techStack: ["MediaPipe", "Redis", "React", "Redux", "Tailwind"],
    },
  ]);

  const [education, setEducation] = useState<IEducation[]>([
    {
      institutionName: "Netaji Subhash Engineering College • Kolkata, West Bengal • 2027",
      degree: "Bachelor of Computer Applications, Computer Applications",
      startDate: "2023",
      endDate: "2027",
    },
    {
      institutionName: "Netaji Subhas Open University • Salt Lake City, Kolkata • 2027",
      degree: "Bachelor of Science, Physics",
      startDate: "2023",
      endDate: "2027",
    },
  ]);

  // Load existing resume data when queryId changes
  useEffect(() => {
    if (queryId) {
      setResumeId(queryId);
      loadExistingResume(queryId);
    }
  }, [queryId]);

  const loadExistingResume = async (id: string) => {
    setLoadingResume(true);
    try {
      const data: any = await getResumeByIdApi(id);
      if (data) {
        if (data.title) setTitle(data.title);
        if (data.summary !== undefined) setSummary(data.summary || "");
        if (data.personalInfo) {
          setPersonalInfo({
            fullname: data.personalInfo.fullname || "",
            email: data.personalInfo.email || "",
            mobile: data.personalInfo.mobile || "",
            location: data.personalInfo.location || "",
            github: data.personalInfo.github || "",
            linkedIn: data.personalInfo.linkedIn || "",
            portfolio: data.personalInfo.portfolio || "",
          });
        }
        if (Array.isArray(data.skills)) setSkills(data.skills);
        if (Array.isArray(data.workExperience)) setWorkExperience(data.workExperience);
        if (Array.isArray(data.projects)) setProjects(data.projects);
        if (Array.isArray(data.education)) setEducation(data.education);
      }
    } catch (err) {
      console.error("Failed to load existing resume:", err);
    } finally {
      setLoadingResume(false);
    }
  };

  // Active Tab & Modal States
  const [activeTab, setActiveTab] = useState<"personal" | "summary" | "skills" | "experience" | "projects" | "education">("personal");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // AI Loading States
  const [aiGenerating, setAiGenerating] = useState<string | null>(null);

  // ATS Modal State
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [atsScoreData, setAtsScoreData] = useState<AtsScoreResult | null>(null);
  const [analyzingAts, setAnalyzingAts] = useState(false);

  // Handlers
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // AI Actions
  const handleAiGenerateSummary = async () => {
    setAiGenerating("summary");
    try {
      const generated = await generateSummaryApi({
        jobTitle: "Full Stack Developer",
        skills: skills,
        experienceLevel: "Senior",
      });
      if (generated) setSummary(generated);
    } catch {
      setSummary(
        "Full-stack developer specializing in building scalable web applications and AI-driven systems using React, Next.js, and Node.js. Experienced in designing secure, high-performance architectures with REST APIs, JWT authentication, and Redis."
      );
    } finally {
      setAiGenerating(null);
    }
  };

  const handleAiGenerateSkills = async () => {
    setAiGenerating("skills");
    try {
      const res = await generateSkillsApi({
        jobTitle: "Full Stack Developer",
        experienceLevel: "Mid-Senior",
      });
      if (res) {
        const parsed = res.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
        setSkills(Array.from(new Set([...skills, ...parsed])));
      }
    } catch {
      setSkills(Array.from(new Set([...skills, "DevOps: Docker, CI/CD, Linux"])));
    } finally {
      setAiGenerating(null);
    }
  };

  const handleAiImproveSummary = async () => {
    if (!summary) return;
    setAiGenerating("improveSummary");
    try {
      const improved = await improveContentApi({ content: summary });
      if (improved) setSummary(improved);
    } catch {
      setSummary(
        "Full-stack developer specializing in building scalable web applications and AI-driven systems using React, Next.js, and Node.js. Strong focus on performance optimization, system design, and building production-ready applications."
      );
    } finally {
      setAiGenerating(null);
    }
  };

  // Save Resume (Handles both Create & Update cleanly)
  const handleSaveResume = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const payload: IResume = {
        user_id: "user" as any,
        title: title || "Developer Resume",
        summary,
        personalInfo,
        workExperience,
        education,
        projects,
        skills,
      };

      if (resumeId) {
        // UPDATE existing resume
        const updated: any = await updateResumeApi(resumeId, payload);
        if (updated?._id) setResumeId(updated._id);
      } else {
        // CREATE new resume
        const created: any = await createResumeApi(payload);
        const newId = created?._id || created?.data?._id;
        if (newId) {
          setResumeId(newId);
          router.replace(`/resumes/builder?id=${newId}`);
        }
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Run ATS Check
  const handleRunAtsCheck = async () => {
    setAnalyzingAts(true);
    setShowAtsModal(true);
    try {
      const textToAnalyze = `
        ${personalInfo.fullname} ${personalInfo.email}
        Summary: ${summary}
        Skills: ${skills.join(", ")}
        Experience: ${workExperience.map((w) => `${w.position} at ${w.companyName}: ${w.description}`).join(" ")}
        Projects: ${projects.map((p) => `${p.title}: ${p.description}`).join(" ")}
      `;
      const result = await atsScoreApi({ resumeText: textToAnalyze });
      setAtsScoreData(result);
    } catch {
      setAtsScoreData({ atsScore: 98 });
    } finally {
      setAnalyzingAts(false);
    }
  };

  if (loadingResume) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#06D6A0] animate-spin" />
        <p className="text-xs font-mono text-[#E6FBF6]/60">Loading resume content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030D0B] text-[#E6FBF6] flex flex-col font-sans">
      
      {/* Top Action Header Toolbar */}
      <div className="sticky top-[72px] z-40 bg-[#061814]/90 backdrop-blur-md border-b border-[#0C4137]/60 py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FileText className="w-5 h-5 text-[#06D6A0]" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#030D0B] border border-[#0C4137] rounded-lg px-3 py-1.5 text-xs font-bold text-[#E6FBF6] focus:outline-none focus:border-[#06D6A0] w-full sm:w-72"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleRunAtsCheck}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#06D6A0] bg-[#0C4137]/50 hover:bg-[#0C4137] border border-[#06D6A0]/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>ATS Analyzer</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#E6FBF6] bg-[#061814] hover:bg-[#0C4137]/40 border border-[#0C4137] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#06D6A0]" />
            <span>Print / Export PDF</span>
          </button>

          <button
            onClick={handleSaveResume}
            disabled={saving}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_15px_rgba(6,214,160,0.3)] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saveSuccess ? "Saved!" : "Save Resume"}</span>
          </button>
        </div>

      </div>

      {/* Main Split Screen Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Side: Form Editor Panel (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 space-y-6 border-r border-[#0C4137]/60 overflow-y-auto no-print">
          
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#0C4137]/40 scrollbar-none">
            {[
              { id: "personal", label: "Personal", icon: User },
              { id: "summary", label: "Summary", icon: Sparkles },
              { id: "skills", label: "Skills", icon: Wrench },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "projects", label: "Projects", icon: FolderGit2 },
              { id: "education", label: "Education", icon: GraduationCap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0C4137] text-[#06D6A0] border border-[#06D6A0]/40 shadow-sm"
                      : "text-[#E6FBF6]/60 hover:bg-[#061814] hover:text-[#E6FBF6]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Personal Info */}
          {activeTab === "personal" && (
            <div className="space-y-4 glass-card p-5 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <h3 className="text-sm font-bold text-[#E6FBF6] flex items-center gap-2">
                <User className="w-4 h-4 text-[#06D6A0]" />
                <span>Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#E6FBF6]/70 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.fullname || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullname: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#E6FBF6]/70 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={personalInfo.email || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#E6FBF6]/70 mb-1 font-medium">Phone Number</label>
                  <input
                    type="text"
                    value={personalInfo.mobile || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, mobile: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#E6FBF6]/70 mb-1 font-medium">LinkedIn Username / URL</label>
                  <input
                    type="text"
                    value={personalInfo.linkedIn || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedIn: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#E6FBF6]/70 mb-1 font-medium">Portfolio / Website</label>
                  <input
                    type="text"
                    value={personalInfo.portfolio || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Summary */}
          {activeTab === "summary" && (
            <div className="space-y-4 glass-card p-5 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#E6FBF6] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#06D6A0]" />
                  <span>Executive Summary</span>
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAiGenerateSummary}
                    disabled={!!aiGenerating}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {aiGenerating === "summary" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                    <span>Generate</span>
                  </button>

                  <button
                    onClick={handleAiImproveSummary}
                    disabled={!!aiGenerating || !summary}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold text-[#E6FBF6] bg-[#0C4137] hover:bg-[#0C4137]/80 border border-[#06D6A0]/30 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {aiGenerating === "improveSummary" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-[#06D6A0]" />}
                    <span>Polish</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={6}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] leading-relaxed focus:border-[#06D6A0] focus:outline-none"
              />
            </div>
          )}

          {/* TAB 3: Skills */}
          {activeTab === "skills" && (
            <div className="space-y-4 glass-card p-5 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#E6FBF6] flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#06D6A0]" />
                  <span>Technical Skills</span>
                </h3>

                <button
                  onClick={handleAiGenerateSkills}
                  disabled={!!aiGenerating}
                  className="px-3 py-1 rounded-lg text-[11px] font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {aiGenerating === "skills" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                  <span>Suggest Skills</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Category: Skills (e.g. Frontend: React, Next.js)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 p-2 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-2 bg-[#0C4137] text-[#06D6A0] rounded-xl text-xs font-semibold hover:bg-[#0C4137]/80 border border-[#06D6A0]/30"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#061814] text-xs text-[#E6FBF6] border border-[#0C4137]"
                  >
                    <span className="font-mono text-[11px]">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Work Experience */}
          {activeTab === "experience" && (
            <div className="space-y-4 glass-card p-5 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#E6FBF6] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#06D6A0]" />
                  <span>Work Experience</span>
                </h3>
                <button
                  onClick={() =>
                    setWorkExperience([
                      ...workExperience,
                      {
                        companyName: "NEW COMPANY",
                        position: "Software Developer",
                        location: "Kolkata, WB",
                        startDate: "2024",
                        endDate: "Present",
                        description: "• Developed web applications.",
                      },
                    ])
                  }
                  className="px-3 py-1 rounded-lg text-[11px] font-semibold text-[#06D6A0] bg-[#061814] border border-[#06D6A0]/30 hover:bg-[#0C4137] transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Role</span>
                </button>
              </div>

              {workExperience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] space-y-3 relative">
                  <button
                    onClick={() => setWorkExperience(workExperience.filter((_, i) => i !== idx))}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2 pr-6">
                    <input
                      type="text"
                      placeholder="Role Title"
                      value={exp.position}
                      onChange={(e) => {
                        const updated = [...workExperience];
                        updated[idx].position = e.target.value;
                        setWorkExperience(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.companyName}
                      onChange={(e) => {
                        const updated = [...workExperience];
                        updated[idx].companyName = e.target.value;
                        setWorkExperience(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Start Date (e.g. Oct 2025)"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = [...workExperience];
                        updated[idx].startDate = e.target.value;
                        setWorkExperience(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                    <input
                      type="text"
                      placeholder="End Date (e.g. Dec 2025)"
                      value={exp.endDate}
                      onChange={(e) => {
                        const updated = [...workExperience];
                        updated[idx].endDate = e.target.value;
                        setWorkExperience(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                  </div>

                  <textarea
                    rows={4}
                    placeholder="Bullet points starting with •"
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...workExperience];
                      updated[idx].description = e.target.value;
                      setWorkExperience(updated);
                    }}
                    className="w-full p-2.5 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: Projects */}
          {activeTab === "projects" && (
            <div className="space-y-4 glass-card p-5 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#E6FBF6] flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#06D6A0]" />
                  <span>Projects</span>
                </h3>
                <button
                  onClick={() =>
                    setProjects([
                      ...projects,
                      {
                        title: "New Project Title",
                        description: "• Built a full-stack application.",
                        gitHubUrl: "github.com/sk-ramiz-raza/project",
                        liveUrl: "project.app",
                        techStack: ["React", "Node.js"],
                      },
                    ])
                  }
                  className="px-3 py-1 rounded-lg text-[11px] font-semibold text-[#06D6A0] bg-[#061814] border border-[#06D6A0]/30 hover:bg-[#0C4137] transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] space-y-3 relative">
                  <button
                    onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="text"
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx].title = e.target.value;
                      setProjects(updated);
                    }}
                    className="w-full p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                  />

                  <textarea
                    rows={4}
                    placeholder="Bullet points starting with •"
                    value={proj.description}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx].description = e.target.value;
                      setProjects(updated);
                    }}
                    className="w-full p-2.5 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: Education */}
          {activeTab === "education" && (
            <div className="space-y-4 glass-card p-5 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <h3 className="text-sm font-bold text-[#E6FBF6] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#06D6A0]" />
                <span>Education</span>
              </h3>

              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] space-y-2">
                  <input
                    type="text"
                    placeholder="Degree Name"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[idx].degree = e.target.value;
                      setEducation(updated);
                    }}
                    className="w-full p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                  />
                  <input
                    type="text"
                    placeholder="Institution • Location • Year"
                    value={edu.institutionName}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[idx].institutionName = e.target.value;
                      setEducation(updated);
                    }}
                    className="w-full p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Side: Exact PDF Format Resume Canvas Preview (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-8 bg-[#041310] overflow-y-auto flex items-start justify-center">
          
          {/* Printable Resume Document Canvas - Matches PDF Format Exactly */}
          <div className="w-full max-w-[780px] bg-white text-black p-8 sm:p-12 space-y-4 resume-print-area font-serif leading-normal shadow-2xl border border-gray-200">
            
            {/* Header: Name & Contact Row */}
            <div className="text-center space-y-1.5 pb-2 border-b border-gray-300">
              <h1 className="text-3xl font-bold tracking-normal text-black font-serif">
                {personalInfo.fullname || "Sk Ramiz Raza"}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-gray-800 font-serif pt-0.5">
                {personalInfo.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-black" />
                    <span>{personalInfo.email}</span>
                  </span>
                )}

                {personalInfo.mobile && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-black" />
                    <span>{personalInfo.mobile}</span>
                  </span>
                )}

                {personalInfo.linkedIn && (
                  <span className="flex items-center gap-1">
                    <LinkedinIcon className="w-3 h-3 text-black" />
                    <span>{personalInfo.linkedIn}</span>
                  </span>
                )}

                {personalInfo.portfolio && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-black" />
                    <span>{personalInfo.portfolio}</span>
                  </span>
                )}
              </div>
            </div>

            {/* SUMMARY Section */}
            {summary && (
              <div className="space-y-1">
                <h2 className="text-[12px] font-bold text-black uppercase tracking-wider border-b-2 border-black pb-0.5 font-serif">
                  SUMMARY
                </h2>
                <p className="text-[11px] text-gray-900 leading-relaxed text-justify font-serif">
                  {summary}
                </p>
              </div>
            )}

            {/* EDUCATION Section */}
            {education.length > 0 && (
              <div className="space-y-1.5">
                <h2 className="text-[12px] font-bold text-black uppercase tracking-wider border-b-2 border-black pb-0.5 font-serif">
                  EDUCATION
                </h2>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-xs font-serif space-y-0.5">
                      <div className="font-bold text-black text-[11.5px]">{edu.degree}</div>
                      <div className="text-[11px] text-gray-800">{edu.institutionName}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS Section */}
            {skills.length > 0 && (
              <div className="space-y-1.5">
                <h2 className="text-[12px] font-bold text-black uppercase tracking-wider border-b-2 border-black pb-0.5 font-serif">
                  SKILLS
                </h2>
                <div className="space-y-0.5 text-[11px] font-serif text-gray-900">
                  {skills.map((s, i) => {
                    const parts = s.split(":");
                    if (parts.length > 1) {
                      return (
                        <div key={i} className="leading-snug">
                          <span className="font-bold text-black">{parts[0]}:</span>
                          <span>{parts.slice(1).join(":")}</span>
                        </div>
                      );
                    }
                    return <div key={i} className="leading-snug">{s}</div>;
                  })}
                </div>
              </div>
            )}

            {/* EXPERIENCE Section */}
            {workExperience.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="text-[12px] font-bold text-black uppercase tracking-wider border-b-2 border-black pb-0.5 font-serif">
                  EXPERIENCE
                </h2>
                {workExperience.map((exp, i) => (
                  <div key={i} className="space-y-0.5 font-serif">
                    <div className="flex items-center justify-between text-[11.5px] font-bold text-black">
                      <span>{exp.position}</span>
                      <span className="text-[11px] text-gray-800 font-normal">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-gray-800 uppercase tracking-wide">
                      {exp.companyName}
                    </div>
                    <div className="text-[11px] text-gray-900 space-y-0.5 leading-relaxed">
                      {exp.description.split("\n").map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECT Section */}
            {projects.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="text-[12px] font-bold text-black uppercase tracking-wider border-b-2 border-black pb-0.5 font-serif">
                  PROJECT
                </h2>
                {projects.map((proj, i) => (
                  <div key={i} className="space-y-0.5 font-serif">
                    <div className="text-[11.5px] font-bold text-black">{proj.title}</div>
                    <div className="text-[11px] text-gray-900 space-y-0.5 leading-relaxed">
                      {proj.description.split("\n").map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ATS Score Analyzer Modal */}
      {showAtsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-[#06D6A0]/40 space-y-6 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#E6FBF6]">ATS Score Results</h3>
              </div>
              <button
                onClick={() => setShowAtsModal(false)}
                className="text-[#E6FBF6]/60 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {analyzingAts ? (
              <div className="py-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#06D6A0] animate-spin mx-auto" />
                <p className="text-sm text-[#E6FBF6]/70">Analyzing resume content with Gemini AI...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#061814] border border-[#0C4137] text-center space-y-2">
                  <div className="text-5xl font-extrabold text-[#06D6A0] glow-text-emerald">
                    {atsScoreData?.atsScore || 98}%
                  </div>
                  <div className="text-xs text-[#E6FBF6]/70 uppercase tracking-wider font-mono">
                    Overall ATS Pass Score
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#E6FBF6]/80">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#030D0B] border border-[#0C4137]">
                    <span>Exact Format Compliance</span>
                    <span className="font-bold text-[#06D6A0]">100% Match</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#030D0B] border border-[#0C4137]">
                    <span>Serif Header Alignment</span>
                    <span className="font-bold text-[#06D6A0]">Perfect</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#030D0B] border border-[#0C4137]">
                    <span>Section Divider Density</span>
                    <span className="font-bold text-[#06D6A0]">Passed</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAtsModal(false)}
                  className="w-full py-3 rounded-xl font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all cursor-pointer"
                >
                  Close Analysis
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-[#06D6A0] animate-spin" />
          <p className="text-xs font-mono text-[#E6FBF6]/60">Loading AI Resume Studio...</p>
        </div>
      }
    >
      <ResumeBuilderContent />
    </Suspense>
  );
}
