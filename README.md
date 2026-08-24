# TypeCast: The AI Resume Engineering Studio 🚀

[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black)](#)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](#)
[![AI: Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)](#)
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](#)
[![Status: Active Development](https://img.shields.io/badge/Status-Active%20Development-success)](#)

**TypeCast** is an AI-powered resume engineering platform built to help developers and professionals create, refine, analyze, and manage ATS-oriented resumes. It combines a live resume editor, Google Gemini-powered content generation, authentication, persistent resume storage, and an AI-driven ATS scoring system in a single workflow.

Designed around a developer-first interface, TypeCast allows users to manually build resumes for free while authenticated users can unlock AI assistance, ATS analysis, and cloud-based resume management.

---

## 🌟 Vision

TypeCast was built around a simple idea: creating a strong resume should not require fighting with document formatting every time something changes.

The platform turns resume creation into an interactive engineering workflow. Users can edit structured career information, see a live document preview, improve content with AI, generate professional summaries and skills, analyze ATS compatibility, and save resumes to their account for later editing.

---

## ✨ Core Modules

### 📝 AI Resume Studio

The central workspace provides a split-screen resume editing experience.

* **Live Resume Preview**: Changes made in the editor are reflected immediately in a structured resume document.
* **Personal Information Management**: Add name, email, phone number, location, GitHub, LinkedIn, and portfolio details.
* **Professional Summary**: Create and refine a concise professional introduction.
* **Skills Management**: Add, remove, and organize technical and professional skills.
* **Work Experience**: Build detailed experience entries with roles, companies, dates, locations, and descriptions.
* **Projects Portfolio**: Showcase technical projects, descriptions, repositories, live links, and technology stacks.
* **Education Section**: Add academic qualifications and institutions.
* **Resume Persistence**: Authenticated users can create, save, update, reopen, and delete resumes.

### ✨ Gemini AI Content Engine

TypeCast integrates Google Gemini to assist with resume content generation and improvement.

* **AI Summary Generation**: Generate ATS-oriented professional summaries based on job role, skills, and experience level.
* **AI Skills Suggestions**: Generate relevant skills tailored to a target role and experience level.
* **AI Content Improvement**: Improve existing resume content while preserving the original meaning and factual information.
* **AI Project Descriptions**: Generate professional project descriptions from project details, roles, technologies, and experience level.
* **AI Experience Descriptions**: Generate role-oriented work experience descriptions using technical and professional context.

The AI routes are designed with structured prompts that emphasize professional tone, ATS relevance, readability, factual preservation, and action-oriented language.

### 📊 ATS Score Analyzer

Authenticated users can analyze resume content using the Gemini AI engine.

The analyzer evaluates factors such as:

* ATS keyword optimization
* Resume structure
* Professional summary
* Work experience
* Technical skills
* Projects
* Education
* Action-oriented language
* Quantifiable achievements
* Readability and ATS compatibility

The system returns an overall ATS score from **0 to 100**.

### 🔐 Authentication & Account System

TypeCast includes a complete authentication workflow.

* User registration
* Secure password hashing with `bcrypt`
* JWT-based authentication
* HTTP-only authentication cookies
* Session validation through the current-user endpoint
* Login and logout support
* Protected resume operations
* User-specific resume ownership

Users can manually edit and print resumes without authentication, while account-based features such as AI tools, ATS analysis, and resume persistence require authentication.

### 💾 Resume Management

Authenticated users can manage their resumes through the dashboard.

* Create a new resume
* View saved resumes
* Reopen an existing resume
* Update resume content
* Delete unwanted resumes
* Keep resumes associated with the authenticated account

### 🖨️ Print & PDF Export

TypeCast uses a print-optimized resume canvas.

Users can prepare the resume inside the editor and use the browser's print functionality to print or save the document as a PDF.

---

## 🛠️ Tech Stack

| Layer             | Technology                        |
| ----------------- | --------------------------------- |
| Framework         | Next.js 16                        |
| UI                | React 19                          |
| Language          | TypeScript                        |
| Styling           | Tailwind CSS 4                    |
| AI Engine         | Google Gemini via `@google/genai` |
| Database          | MongoDB                           |
| ODM               | Mongoose                          |
| Authentication    | JWT                               |
| Password Security | bcrypt                            |
| HTTP Client       | Axios                             |
| Icons             | Lucide React                      |

---

## 📂 Project Architecture

```text
TypeCast-main/
│
├── public/
│
├── src/
│   ├── apis/
│   │   ├── ai.api.ts
│   │   ├── auth.api.ts
│   │   └── resume.api.ts
│   │
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── resumes/
│   │   │
│   │   ├── ats-checker/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── resumes/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── lib/
│   │   ├── db.ts
│   │   ├── gemini.ts
│   │   ├── getCurrentUser.ts
│   │   └── jwt.ts
│   │
│   ├── models/
│   │   ├── resume.model.ts
│   │   └── user.model.ts
│   │
│   └── types/
│       ├── ai.types.ts
│       ├── api.types.ts
│       ├── resume.types.ts
│       └── user.types.ts
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js 18 or newer
* npm
* A MongoDB database
* A Google Gemini API key

### Installation

Clone the repository:

```bash
git clone https://github.com/Ramiz123/TypeCast.git
```

Move into the project directory:

```bash
cd TypeCast
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key
```

> [!IMPORTANT]
> Never commit `.env.local`, database credentials, JWT secrets, or API keys to GitHub.

### Start Development Server

```bash
npm run dev
```

Then open the local application in your browser.

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Runs the production build.

### Linting

```bash
npm run lint
```

Runs the project's ESLint checks.

---

## 🔐 Security & Data Handling

TypeCast currently includes several core security mechanisms:

* Passwords are hashed using `bcrypt`.
* Authentication uses JWT tokens.
* Authentication tokens are stored in HTTP-only cookies.
* Resume retrieval, updates, and deletion are scoped to the authenticated user.
* Sensitive credentials are loaded from environment variables.
* AI content improvement prompts instruct the model not to invent skills, achievements, qualifications, technologies, or factual information.

---

## 🧠 AI Capabilities

The Gemini integration currently supports the following operations:

| Feature                | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| Resume Summary         | Generate a professional summary            |
| Skills Generator       | Suggest role-relevant skills               |
| Content Improver       | Refine existing resume content             |
| Project Description    | Generate professional project descriptions |
| Experience Description | Generate work experience descriptions      |
| ATS Score              | Evaluate overall ATS compatibility         |

---

## 📋 Current Development Notes

TypeCast is actively evolving.

The current implementation focuses on the core resume workflow:

1. Create or edit resume content.
2. Preview the document in real time.
3. Use AI tools to improve content.
4. Analyze ATS compatibility.
5. Save resumes to an authenticated account.
6. Return later to continue editing.
7. Print or export through the browser's PDF workflow.

Future releases can expand the platform with additional resume templates, richer ATS feedback, more AI controls, direct PDF generation, stronger API validation, and deeper personalization.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Areas that could benefit from further development include:

* Additional resume templates
* Direct PDF generation
* Richer ATS analysis and feedback
* AI personalization controls
* Resume version history
* Stronger request validation
* Improved mobile editing experience
* Automated testing
* Accessibility improvements

If you plan to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Commit the changes.
5. Open a pull request with a clear description.

---

## 👨‍💻 Author

**Sk Ramiz Raza**

* GitHub: `@Ramiz123`

---

## 📄 License

A license file is not currently included in this repository.

Before publishing, distributing, or accepting external contributions, consider adding an explicit open-source license.
