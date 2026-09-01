# TypeCast — AI-Powered Resume Engineering Studio

[![Framework: Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-000000?style=flat&logo=next.js&logoColor=white)](#)
[![UI: React 19](https://img.shields.io/badge/UI-React%2019-20232A?style=flat&logo=react&logoColor=61DAFB)](#)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6?style=flat&logo=typescript&logoColor=white)](#)
[![Styling: Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](#)
[![AI: Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat&logo=google&logoColor=white)](#)
[![Database: MongoDB / Mongoose](https://img.shields.io/badge/Database-MongoDB%20%2F%20Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)](#)
[![Auth: JWT & bcrypt](https://img.shields.io/badge/Auth-JWT%20%26%20bcrypt-FF6F61?style=flat&logo=jsonwebtokens&logoColor=white)](#)

TypeCast is a developer-focused AI resume engineering platform built on **Next.js 16 (App Router)** and **React 19**. It addresses the compound problem of building technically strong resumes: writing content that reads well to human reviewers while simultaneously satisfying the keyword and structure requirements of Applicant Tracking Systems (ATS). Most resume tools solve one side of that problem; TypeCast addresses both in a unified, authenticated workflow.

The platform combines a live split-screen resume editor, **Google Gemini**-powered content generation across six distinct resume workflows, a standalone ATS compatibility scorer, cloud-backed resume persistence with full CRUD, user authentication, and a print-optimized PDF export layer — all within a single full-stack Next.js application.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Capabilities](#core-capabilities)
   - [AI Resume Studio](#ai-resume-studio)
   - [Gemini AI Content Engine](#gemini-ai-content-engine)
   - [ATS Score Analyzer](#ats-score-analyzer)
   - [Cloud Resume Workspace](#cloud-resume-workspace)
   - [Authentication & Account System](#authentication--account-system)
   - [Print & PDF Export](#print--pdf-export)
3. [Technical Architecture](#technical-architecture)
   - [Presentation Layer](#presentation-layer)
   - [Application Layer](#application-layer)
   - [AI Service Layer](#ai-service-layer)
   - [Data Layer](#data-layer)
   - [Authentication Layer](#authentication-layer)
4. [AI Engineering](#ai-engineering)
5. [ATS Analysis](#ats-analysis)
6. [Tech Stack](#tech-stack)
7. [Data Architecture](#data-architecture)
8. [Security & Authentication](#security--authentication)
9. [Product Design & Print Architecture](#product-design--print-architecture)
10. [Engineering Highlights](#engineering-highlights)
11. [Future Roadmap](#future-roadmap)
12. [Author](#author)

---

## Overview

Creating a modern technical resume is harder than it appears. Formatting tends to break every time content changes, ATS filters reject well-qualified candidates based on keyword gaps, and generic resume builders produce generic output. TypeCast approaches the problem as a software engineering challenge rather than a document problem.

The application supports two modes. In **guest mode**, any user can immediately enter the split-screen resume studio, build a structured resume, preview it against a live A4 canvas, and export it as a browser-generated PDF — no account required. In **authenticated mode**, users gain access to the full Gemini AI content engine, the ATS Score Analyzer, and cloud-backed resume management. The platform is built as a proper full-stack application: Next.js handles both the frontend rendering and all server-side API routes, MongoDB stores structured resume documents with user-scoped ownership, and JWT-based authentication protects every privileged operation.

---

## Core Capabilities

### AI Resume Studio

The central workspace is a split-screen editing environment. The left panel organizes resume content into modular section tabs — Personal Information, Professional Summary, Technical Skills, Work Experience, Projects, and Education. The right panel renders a live A4-formatted resume preview that updates immediately as data changes.

Key behaviors:

- **Live preview rendering** — structural resume layout refreshes in real time as the user edits
- **Modular section management** — independent tabs for each resume section with independent state
- **Dynamic list controls** — work experience entries, project entries, tech stack tags, and education records can be added, edited, or removed without affecting other sections
- **Auth-aware UI** — unauthenticated users can build and preview a full resume; authenticated actions (save, AI generation, ATS analysis) surface contextual prompts without losing editor state

---

### Gemini AI Content Engine

TypeCast integrates Google Gemini directly via the `@google/genai` SDK across six structured AI workflows. This is not a general-purpose chatbot integration; each workflow uses a purpose-built prompt engineered specifically for ATS parsers and technical hiring reviewers.

| AI Workflow | What It Generates |
| :--- | :--- |
| Executive Summary Generator | 50–80 word ATS-oriented summary based on job title, skills, and experience level |
| Skills Matrix Suggester | 8–12 role-specific hard and soft skills categorized by domain |
| Work Experience Formatter | 80–120 word role-impact descriptions tailored to seniority (Fresher / Mid-Level / Senior) |
| Project Description Generator | Concise technical project statements based on role, technologies, and architecture |
| Content Improver & Polisher | Refines existing draft text for clarity, action verbs, and keyword density |
| ATS Score Analyzer | Evaluates full resume text and returns a compatibility score from 0 to 100 |

Each prompt is explicitly structured to preserve factual accuracy — the model is instructed not to fabricate credentials, invent technologies, or introduce unverifiable metrics. The user reviews and accepts or modifies AI-generated content before it is incorporated into the resume.

---

### ATS Score Analyzer

The ATS analyzer is a dedicated, standalone feature (also accessible from within the studio) that evaluates resume content against eleven weighted criteria:

- Keyword optimization and density
- Resume structure and section completeness
- Professional summary quality
- Technical skills presentation
- Work experience descriptions
- Project descriptions
- Education details
- Action-oriented language usage
- Quantifiable achievement presence
- Readability and document clarity
- Overall ATS compatibility formatting

The analyzer returns an overall score from **0 to 100** along with categorized feedback. When evaluating against a specific job posting, it performs keyword gap detection by comparing resume content against the job description text.

The engineering significance: TypeCast does not only generate resume content — it closes the loop by evaluating that content against the same criteria ATS platforms use to filter candidates.

---

### Cloud Resume Workspace

Authenticated users have access to a dashboard-based resume library. This makes TypeCast a persistent workspace, not a one-session tool.

- **Multi-resume storage** — create and maintain multiple resumes simultaneously, scoped to the authenticated account
- **Resume lifecycle operations** — create, read, update, and delete resumes through a RESTful API backend
- **Seamless reload** — any saved resume can be loaded back into the full editor through URL-based query parameter routing
- **Dashboard overview** — quick workspace metrics including total stored resume count and AI engine availability

---

### Authentication & Account System

Authentication is a first-class concern in TypeCast. Registration, login, session validation, and logout are all implemented as Next.js API route handlers, keeping the authentication logic server-side.

- User registration with email and password
- Password hashing via `bcrypt` applied as a Mongoose pre-save middleware hook
- JWT session tokens signed server-side and stored in `httpOnly` cookies
- A dedicated `/api/auth/me` endpoint for session validation on page load
- All resume operations require a verified, authenticated session
- Guest users retain full access to the manual editor and print export

---

### Print & PDF Export

TypeCast maintains a dedicated print presentation model for the resume canvas. When the user triggers the browser print dialog, a separate print stylesheet activates:

- The application shell (navigation, controls, panels) is suppressed entirely
- The resume canvas switches to clean serif typography appropriate for formal documents
- Page dimensions are configured for A4 with controlled margins
- Background colors, shadows, and UI borders are removed for clean document rendering
- The output is a single-page or multi-page document suitable for direct PDF saving

This is an intentional architectural separation: the interactive editor UI and the printable document are rendered differently, ensuring the exported PDF matches professional resume formatting standards.

---

## Technical Architecture

TypeCast is a full-stack application deployed as a single Next.js project. The same codebase serves the React frontend, all API routes, database operations, and AI service calls — without a separate backend process.

### Presentation Layer

The UI is built with **React 19** and styled with **Tailwind CSS 4**. The Next.js **App Router** governs page routing and layout composition. Key application pages include the landing page, the resume builder studio, the ATS checker, the authenticated dashboard, and the auth pages. Shared components (Navbar, Footer) are composed at the root layout level. An `AuthContext` React provider manages global authentication state and exposes login, logout, and session verification methods to all child components.

### Application Layer

Next.js App Router API routes handle all server-side logic. The API surface is organized into three functional domains: authentication routes, resume CRUD routes, and AI generation routes. This means no separate Express or FastAPI server — all server-side operations run as Next.js route handlers within the same application boundary. Client-side API communication is managed through a set of Axios-based wrapper modules organized by domain (auth, resume, AI).

### AI Service Layer

A centralized Google Gen AI client is initialized once in `src/lib/gemini.ts` and shared across all AI route handlers. Each AI route constructs a structured prompt tailored to its specific output format and passes it to the Gemini model. The prompts encode role context, experience level awareness, output length constraints, professional language requirements, and explicit anti-hallucination instructions. The AI routes do not persist generated content — content is returned to the client for the user to review and selectively apply to their resume.

### Data Layer

**MongoDB** provides the document storage layer. **Mongoose** handles schema definition, validation, connection management, and query execution. The Mongoose connection is initialized once and cached globally to avoid redundant connection overhead during the Next.js API request lifecycle. Data is structured around two core Mongoose models — User and Resume — with defined schemas covering all resume sections and authentication fields.

### Authentication Layer

Server-side authentication is built around `jsonwebtoken` for token signing and verification, and `bcrypt` for password security. Tokens are transported exclusively via `httpOnly` cookies. A utility function in `src/lib/getCurrentUser.ts` extracts and verifies the JWT from the request cookie on every protected API call. Session validation is enforced at the API route level, not delegated to the client.

---

## AI Engineering

AI in TypeCast is integrated into the application workflow rather than surfaced as an isolated feature. Six distinct AI operations each serve a specific function within the resume creation process.

**Structured prompting** is the primary engineering mechanism. Each prompt specifies the task, the output format, the target length, the professional tone requirements, and explicit constraints around factual preservation. The model receives structured context — job title, experience level, technologies, existing content — and is instructed to produce output appropriate for ATS parsers and technical hiring reviewers.

**Role and seniority awareness** shapes the output. The Work Experience and Project Description generators receive an experience level parameter (Fresher, Mid-Level, Senior) and adjust language, complexity, and claimed impact accordingly.

**Content improvement** is handled separately from generation. The content polisher takes existing user-written text and improves it for action verb usage, keyword density, and clarity — without introducing fabricated achievements or credentials. This distinction matters: improvement prompts explicitly prohibit the model from inventing new facts.

**ATS evaluation** closes the workflow loop. After a user has edited and AI-assisted their resume, the analyzer can evaluate the full resume text and return a structured 0–100 score across eleven criteria. This creates a measurable feedback signal rather than leaving quality assessment entirely subjective.

The AI layer does not retain state between requests. Each API call is stateless — the relevant context is passed in the request payload and the structured response is returned to the client.

---

## ATS Analysis

The ATS Score Analyzer evaluates resume content across eleven criteria and returns a 0–100 compatibility score. The eleven dimensions cover:

- Keyword optimization
- Resume structure and section completeness
- Professional summary presence and quality
- Technical skills coverage
- Work experience impact framing
- Project description quality
- Education section completeness
- Action-oriented language usage
- Quantifiable achievement presence
- Readability
- ATS formatting compliance

The analyzer operates both as a standalone tool accessible from the dedicated ATS checker page and as an in-studio capability within the resume builder. When provided a job description alongside the resume, it performs keyword gap analysis between the two documents.

---

## Tech Stack

| Layer | Technology | Engineering Role |
| :--- | :--- | :--- |
| Application Framework | Next.js 16 | Full-stack framework; App Router for pages and API routes |
| UI Library | React 19 | Component-driven reactive interface architecture |
| Language | TypeScript 5 | End-to-end type safety across schemas, API contracts, and client state |
| Styling | Tailwind CSS 4 | Utility-first responsive design with PostCSS integration |
| AI SDK | Google Gemini via `@google/genai` | Generative content assistance and ATS evaluation |
| Database | MongoDB | Document store for users and structured resume records |
| ODM | Mongoose | Schema definition, validation, and connection management |
| Authentication | jsonwebtoken (JWT) | Server-side session token signing and verification |
| Password Security | bcrypt | Salted cryptographic password hashing |
| HTTP Client | Axios | Promise-based client-side API communication |
| UI Icons | Lucide React | Lightweight, consistent interface iconography |
| Typography | Google Fonts | Plus Jakarta Sans, Inter, and JetBrains Mono |

---

## Data Architecture

TypeCast's persistent data is organized around two primary entities.

### User

The User model stores account credentials and identity. Fields include full name, email (unique identifier), bcrypt-hashed password, and an optional contact number. Automatic timestamps track account creation and last modification. The model includes a `comparePassword` instance method used during authentication to verify credentials against the stored hash without exposing the raw value.

### Resume

The Resume model represents a complete, structured resume document. A resume record contains:

- **Ownership reference** — a required reference linking the document to its owner User
- **Resume title** — a user-assigned label (e.g., "Full Stack Developer Resume")
- **Personal information** — full name, email, phone, location, GitHub, LinkedIn, and portfolio URL
- **Professional summary** — the executive summary paragraph
- **Education** — an array of institution, degree, and date records
- **Work experience** — an array of role entries with company, position, location, dates, and description
- **Projects** — an array of project records with title, description, repository URL, live URL, and technology stack
- **Skills** — an array of technical and professional skill strings
- **Certifications** — an array of professional certification strings

All resume queries enforce a user ID match against the authenticated user's identity, ensuring that no user can access, modify, or delete another user's resume records.

---

## Security & Authentication

Security is implemented at multiple layers across the application.

**Password storage** — user passwords are never stored in plaintext. A Mongoose pre-save middleware hook automatically hashes passwords with `bcrypt` before persisting them to MongoDB. The raw password is never accessible after the hashing step.

**Session management** — JWT tokens are signed server-side using a secret loaded from environment configuration. Tokens are stored in `httpOnly` cookies, which are inaccessible to client-side JavaScript and mitigate XSS-based token theft. Cookies are configured with `sameSite` and `secure` flags in production environments.

**User-scoped data access** — all resume API routes extract the authenticated user's ID from the verified JWT before executing any database query. Every fetch, update, and delete operation includes a user ID constraint, preventing Insecure Direct Object Reference (IDOR) vulnerabilities. A user who possesses another user's resume ID cannot retrieve or modify it through the API.

**Mutation sanitization** — update payloads explicitly strip immutable fields before applying changes, preventing accidental or intentional schema corruption through the update API.

**AI factuality guardrails** — content improvement and ATS evaluation prompts explicitly instruct the Gemini model not to invent credentials, skills, technologies, or quantified metrics. The user is always the final authority before any AI-generated content is applied to their resume.

**Secret isolation** — all credentials (MongoDB URI, JWT secret, Gemini API key) are loaded from environment configuration and are never embedded in source code.

---

## Product Design & Print Architecture

TypeCast's interface uses an Obsidian/Emerald visual language: deep obsidian backgrounds, brunswick green borders, and glowing emerald accent highlights. The design system includes glassmorphism-style card components with blurred backdrops, subtle borders, and layered depth. Typography pairs *Plus Jakarta Sans* for headings, *Inter* for body text, and *JetBrains Mono* for technical metadata and code-adjacent labels.

### Print & Export Architecture

The resume preview canvas maintains a strict separation between its interactive editing presentation and its print presentation. When the print dialog is triggered, a dedicated print stylesheet activates:

- All non-resume interface elements are hidden via suppression classes
- The resume canvas switches to clean serif typography appropriate for formal printed documents
- Page dimensions are configured for A4 with professional margins
- All UI styling — backgrounds, shadows, borders, color overlays — is stripped to produce a clean black-on-white document
- The output is a properly formatted single-page or multi-page document ready for PDF saving

This is a deliberate engineering decision: the resume editing experience and the final exported document are treated as distinct rendering targets with separate style rules, ensuring that the export output is professionally formatted and ATS-compatible regardless of the editor's visual styling.

---

## Engineering Highlights

TypeCast demonstrates several engineering decisions that distinguish it from a basic CRUD application.

**Full-stack Next.js architecture** — the project uses Next.js as a genuine full-stack framework, not merely a static frontend layer. All API routes, authentication logic, database operations, and AI service calls are handled within the same application boundary through App Router route handlers.

**TypeScript-first development** — TypeScript is applied across the entire codebase including Mongoose schema types, API request and response contracts, AI payload interfaces, and React component props. Dedicated interface files for AI, API, resume, and user types create a shared contract layer across frontend and backend code.

**Structured AI integration** — each Gemini AI workflow is built around a purpose-engineered prompt rather than a generic completion call. The prompts encode output format constraints, length targets, professional tone requirements, and factual preservation rules. This is prompt engineering applied to a real product use case, not a demo.

**Session security architecture** — JWT authentication via `httpOnly` cookies represents a considered choice over localStorage-based token storage. The decision prevents XSS-based session hijacking and keeps authentication state server-authoritative.

**Mongoose pre-save middleware** — bcrypt hashing is applied as a Mongoose middleware hook rather than in route handler logic. This architectural decision means password hashing is enforced at the data layer regardless of which route or code path triggers a user save.

**User-scoped ownership enforcement** — rather than trusting client-supplied user IDs, every database query derives the user context from the server-verified JWT payload. This makes IDOR attacks structurally impossible within the current API design.

**Print-aware document rendering** — the resume is designed with two concurrent rendering targets: the interactive editor view and the print export view. The architectural separation ensures that styling applied to the application interface never contaminates the exported document.

**Cached Mongoose connection** — the database connection is initialized once and cached in the global Node.js scope, preventing connection pool exhaustion across Next.js API route invocations.

**Axios client abstraction** — client-side API calls are organized into domain-specific wrapper modules rather than scattered fetch calls, creating a maintainable API surface layer that decouples component logic from HTTP implementation details.

---

## Future Roadmap

The following are identified enhancements for future development. These are planned capabilities, not current features.

- **Multi-template engine** — switchable resume themes (Modern Tech, Minimalist Executive, Academic CV) with independent layout configurations
- **Direct server-side PDF generation** — headless browser rendering for one-click PDF downloading without the browser print dialog
- **Real-time ATS keyword highlighting** — in-canvas visual annotations showing matched and missing keywords from a target job description as the user edits
- **Resume version history** — point-in-time snapshots of saved resumes with restore capability
- **Markdown / LaTeX export** — downloadable source files for local compilation and further customization

---

## Author

**Sk Ramiz Raza**
GitHub: [@Ramiz123](https://github.com/Ramiz123)

---

*TypeCast is a personal portfolio project built for developer education and career tooling. No license file is currently included in the repository.*
