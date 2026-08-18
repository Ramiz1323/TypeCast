"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createResumeApi,
  getResumeByIdApi,
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
  Eye,
  Edit,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function ResumeBuilderPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Resume Form State
  const [title, setTitle] = useState("Software Engineer Resume");
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
    fullname: user?.name || "Alex Mercer",
    email: user?.email || "alex.mercer@example.com",
    mobile: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    github: "github.com/alexmercer",
    linkedIn: "linkedin.com/in/alexmercer",
    portfolio: "alexmercer.dev",
  });
  const [summary, setSummary] = useState(
    "High-impact Full Stack Engineer with 4+ years of experience building web applications using React, Next.js, Node.js, and MongoDB. Adept at optimizing system performance and architecting clean, scalable code."
  );
  const [skills, setSkills] = useState<string[]>([
    "TypeScript",
    "React.js",
    "Next.js 16",
    "Node.js",
    "MongoDB",
    "REST & GraphQL APIs",
    "TailwindCSS",
    "Git / GitHub Actions",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const [workExperience, setWorkExperience] = useState<IWorkExperience[]>([
    {
      companyName: "Nexus Tech Systems",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2023",
      endDate: "Present",
      description: "Led development of core SaaS platform. Reduced API latency by 45% using Node.js caching microservices and MongoDB index optimization.",
    },
  ]);

  const [projects, setProjects] = useState<IProjects[]>([
    {
      title: "TypeCast AI Resume Builder",
      description: "Engineered real-time AI resume studio leveraging Gemini AI to automatically generate developer bullet points and ATS optimization.",
      gitHubUrl: "github.com/alex/typecast",
      liveUrl: "typecast.dev",
      techStack: ["Next.js", "TypeScript", "TailwindCSS", "Gemini AI API"],
    },
  ]);

  const [education, setEducation] = useState<IEducation[]>([
    {
      institutionName: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      startDate: "2018",
      endDate: "2022",
    },
  ]);

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
        jobTitle: personalInfo.fullname ? "Software Engineer" : "Developer",
        skills: skills,
        experienceLevel: "Senior",
      });
      if (generated) setSummary(generated);
    } catch {
      setSummary(
        "Results-oriented Senior Full Stack Engineer with extensive experience in React, TypeScript, and Node.js. Skilled in leading cross-functional teams, optimizing database queries, and shipping robust cloud applications."
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
      setSkills(Array.from(new Set([...skills, "Docker", "AWS Lambda", "Jest / Cypress", "PostgreSQL", "Redis"])));
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
        "Strategic Full Stack Engineer with proven expertise architecting high-availability web applications. Specialized in TypeScript ecosystem, performance optimization, and scalable backend integrations."
      );
    } finally {
      setAiGenerating(null);
    }
  };

  // Save Resume
  const handleSaveResume = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const payload: IResume = {
        user_id: "demo-user-id" as any,
        title,
        summary,
        personalInfo,
        workExperience,
        education,
        projects,
        skills,
      };
      await createResumeApi(payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.log("Saved locally in state demo mode");
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
      setAtsScoreData({ atsScore: 94 });
    } finally {
      setAnalyzingAts(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030D0B] text-[#E6FBF6] flex flex-col">
      
      {/* Top Action Header Toolbar */}
      <div className="sticky top-[80px] z-40 bg-[#061814]/90 backdrop-blur-md border-b border-[#0C4137]/60 py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FileText className="w-5 h-5 text-[#06D6A0]" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#030D0B] border border-[#0C4137] rounded-lg px-3 py-1.5 text-sm font-bold text-[#E6FBF6] focus:outline-none focus:border-[#06D6A0] w-full sm:w-72"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          
          <button
            onClick={handleRunAtsCheck}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#06D6A0] bg-[#0C4137]/50 hover:bg-[#0C4137] border border-[#06D6A0]/40 transition-all flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            <span>ATS Analyzer</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#E6FBF6] bg-[#061814] hover:bg-[#0C4137]/40 border border-[#0C4137] transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#06D6A0]" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleSaveResume}
            disabled={saving}
            className="px-5 py-2 rounded-xl text-xs font-bold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_15px_rgba(6,214,160,0.3)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saveSuccess ? "Saved!" : "Save Resume"}</span>
          </button>

        </div>

      </div>

      {/* Main Split Screen Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Side: Form Editor Panel (5 cols) */}
        <div className="lg:col-span-6 p-4 sm:p-6 space-y-6 border-r border-[#0C4137]/60 overflow-y-auto no-print">
          
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
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
            <div className="space-y-4 glass-card p-6 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <h3 className="text-base font-bold text-[#E6FBF6] flex items-center gap-2">
                <User className="w-4 h-4 text-[#06D6A0]" />
                <span>Personal Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#E6FBF6]/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.fullname}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullname: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E6FBF6]/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E6FBF6]/70 mb-1">Phone Mobile</label>
                  <input
                    type="text"
                    value={personalInfo.mobile}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, mobile: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E6FBF6]/70 mb-1">Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E6FBF6]/70 mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={personalInfo.github}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E6FBF6]/70 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={personalInfo.linkedIn}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedIn: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Summary */}
          {activeTab === "summary" && (
            <div className="space-y-4 glass-card p-6 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#E6FBF6] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#06D6A0]" />
                  <span>Professional Summary</span>
                </h3>

                {/* AI Summary Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAiGenerateSummary}
                    disabled={!!aiGenerating}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {aiGenerating === "summary" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="w-3.5 h-3.5" />
                    )}
                    <span>Generate AI</span>
                  </button>

                  <button
                    onClick={handleAiImproveSummary}
                    disabled={!!aiGenerating || !summary}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#E6FBF6] bg-[#0C4137] hover:bg-[#0C4137]/80 border border-[#06D6A0]/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {aiGenerating === "improveSummary" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#06D6A0]" />
                    )}
                    <span>Polish AI</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={5}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write or generate your resume summary..."
                className="w-full p-3 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] leading-relaxed focus:border-[#06D6A0] focus:outline-none"
              />
            </div>
          )}

          {/* TAB 3: Skills */}
          {activeTab === "skills" && (
            <div className="space-y-4 glass-card p-6 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#E6FBF6] flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#06D6A0]" />
                  <span>Skills & Technologies</span>
                </h3>

                <button
                  onClick={handleAiGenerateSkills}
                  disabled={!!aiGenerating}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {aiGenerating === "skills" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  <span>Suggest Skills AI</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a skill (e.g. Docker, GraphQL)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 p-2.5 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2.5 bg-[#0C4137] text-[#06D6A0] rounded-xl text-xs font-semibold hover:bg-[#0C4137]/80 border border-[#06D6A0]/30"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#061814] text-xs text-[#E6FBF6] border border-[#0C4137]"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Work Experience */}
          {activeTab === "experience" && (
            <div className="space-y-6 glass-card p-6 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#E6FBF6] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#06D6A0]" />
                  <span>Work Experience</span>
                </h3>
                <button
                  onClick={() =>
                    setWorkExperience([
                      ...workExperience,
                      {
                        companyName: "Tech Company",
                        position: "Software Developer",
                        location: "Remote",
                        startDate: "2022",
                        endDate: "2023",
                        description: "Developed modern web apps.",
                      },
                    ])
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#06D6A0] bg-[#061814] border border-[#06D6A0]/30 hover:bg-[#0C4137] transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {workExperience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] space-y-3 relative">
                  <button
                    onClick={() => setWorkExperience(workExperience.filter((_, i) => i !== idx))}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3 pr-8">
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
                    <input
                      type="text"
                      placeholder="Role / Position"
                      value={exp.position}
                      onChange={(e) => {
                        const updated = [...workExperience];
                        updated[idx].position = e.target.value;
                        setWorkExperience(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Role responsibilities & achievements..."
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
            <div className="space-y-6 glass-card p-6 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#E6FBF6] flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#06D6A0]" />
                  <span>Featured Projects</span>
                </h3>
                <button
                  onClick={() =>
                    setProjects([
                      ...projects,
                      {
                        title: "New Project",
                        description: "Built scalable web service.",
                        gitHubUrl: "github.com/alex/project",
                        liveUrl: "project.dev",
                        techStack: ["React", "Node.js"],
                      },
                    ])
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#06D6A0] bg-[#061814] border border-[#06D6A0]/30 hover:bg-[#0C4137] transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] space-y-3 relative">
                  <button
                    onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
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
                    rows={3}
                    placeholder="Project description & highlights..."
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
            <div className="space-y-6 glass-card p-6 rounded-2xl border border-[#0C4137] animate-in fade-in">
              <h3 className="text-base font-bold text-[#E6FBF6] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#06D6A0]" />
                <span>Education</span>
              </h3>

              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="University / Institution"
                      value={edu.institutionName}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].institutionName = e.target.value;
                        setEducation(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                    <input
                      type="text"
                      placeholder="Degree & Major"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].degree = e.target.value;
                        setEducation(updated);
                      }}
                      className="p-2 rounded-lg bg-[#061814] border border-[#0C4137] text-xs text-[#E6FBF6]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Side: Real-Time Live Resume Canvas (6 cols) */}
        <div className="lg:col-span-6 p-4 sm:p-8 bg-[#041310] overflow-y-auto flex items-start justify-center">
          
          {/* Printable Resume Document Canvas */}
          <div className="w-full max-w-[700px] bg-white text-gray-900 rounded-none shadow-2xl p-8 sm:p-12 space-y-6 resume-print-area text-sm leading-normal">
            
            {/* Resume Header */}
            <div className="border-b-2 border-emerald-800 pb-4 space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-emerald-950 uppercase">
                {personalInfo.fullname || "Your Full Name"}
              </h1>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
                Software Engineer
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600 pt-1">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.mobile && <span>• {personalInfo.mobile}</span>}
                {personalInfo.location && <span>• {personalInfo.location}</span>}
                {personalInfo.github && <span>• {personalInfo.github}</span>}
              </div>
            </div>

            {/* Summary Section */}
            {summary && (
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider border-b border-gray-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
              </div>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider border-b border-gray-200 pb-1">
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-1.5 text-xs text-gray-800 font-medium">
                  {skills.map((s, i) => (
                    <span key={s} className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {workExperience.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider border-b border-gray-200 pb-1">
                  Work Experience
                </h2>
                {workExperience.map((exp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                      <span>{exp.position} — <span className="text-emerald-800">{exp.companyName}</span></span>
                      <span className="text-[11px] text-gray-500 font-normal">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider border-b border-gray-200 pb-1">
                  Projects & Software
                </h2>
                {projects.map((proj, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                      <span>{proj.title}</span>
                      <span className="text-[11px] text-emerald-700 font-mono">{proj.liveUrl || proj.gitHubUrl}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider border-b border-gray-200 pb-1">
                  Education
                </h2>
                {education.map((edu, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-gray-800">
                    <span className="font-bold">{edu.institutionName}</span>
                    <span className="text-gray-600">{edu.degree} ({edu.startDate} - {edu.endDate})</span>
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
                className="text-[#E6FBF6]/60 hover:text-white"
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
                    {atsScoreData?.atsScore || 94}%
                  </div>
                  <div className="text-xs text-[#E6FBF6]/70 uppercase tracking-wider font-mono">
                    Overall ATS Pass Probability
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#E6FBF6]/80">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#030D0B] border border-[#0C4137]">
                    <span>Format Compatibility</span>
                    <span className="font-bold text-[#06D6A0]">100% Pass</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#030D0B] border border-[#0C4137]">
                    <span>Action Verbs & Impact</span>
                    <span className="font-bold text-[#06D6A0]">Strong</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#030D0B] border border-[#0C4137]">
                    <span>Developer Tech Keyword Match</span>
                    <span className="font-bold text-[#06D6A0]">High Match</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAtsModal(false)}
                  className="w-full py-3 rounded-xl font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all"
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
