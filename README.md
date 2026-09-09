# Gokul N — Freelancer Portfolio Website

A modern, responsive **freelancer portfolio website** and backend inquiry service built with clean design, thoughtful architecture, and a user-focused experience.

## 🌐 Live Website

🚀 **Visit the live portfolio:**
https://my-freelancer-website.vercel.app/

## 📸 Website Preview

<p align="center">
  <img src="./screenshot.png" alt="Gokul N Freelancer Portfolio Website" width="900">
</p>

---

## 🚀 Features

* **Modern & Minimal Design**

  * Clean and professional UI
  * Responsive layout
  * Subtle micro-animations
  * Tailwind CSS styling
  * Inter and JetBrains Mono typography

* **Multi-Page Experience**

  * **Home** — Hero section, services overview, featured projects, and social links
  * **About** — Developer background, skills, technology stack, and experience
  * **Services** — Services offered, development process, and FAQ accordion
  * **Projects** — Filterable project gallery with live previews and technology tags
  * **Contact** — Project inquiry form and copy-to-clipboard contact information

* **Backend Inquiry System**

  * TypeScript + Express.js backend
  * Project inquiry form processing
  * Automated email notifications
  * Nodemailer SMTP integration

* **Cloud Ready**

  * Vercel deployment configuration
  * Serverless-compatible architecture
  * Clean URL routing

---

## 📁 Project Structure

```text
my-freelancer-website/
│
├── api/
│   └── index.ts
│
├── dist/
│   └── ...                    # Production build output
│
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── services/
│   │
│   └── favicon/
│
├── src/
│   ├── pages/
│   │   ├── index.html         # Home page
│   │   ├── about.html        # About page
│   │   ├── services.html     # Services page
│   │   ├── projects.html     # Projects page
│   │   └── contact.html      # Contact page
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── projects.js
│   │   └── contact.js
│   │
│   └── styles/
│       └── input.css
│
├── server/
│   ├── server.ts              # Express server
│   ├── routes/
│   │   └── inquiry.ts         # Inquiry API routes
│   └── services/
│       └── email.ts           # Nodemailer email service
│
├── .env.example               # Environment variable template
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
├── screenshot.png
└── README.md
```

> **Note:** The structure above represents the recommended organization. If your repository uses different folders or filenames, update this section to match the actual GitHub repository structure.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* Vanilla JavaScript
* Tailwind CSS
* Google Fonts

  * Inter
  * JetBrains Mono

### Backend

* Java Script
* TypeScript

### Deployment

* Vercel

---

## 💻 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Gokul-CyberExpert/my-freelancer-website.git
cd my-freelancer-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-receiving-email@gmail.com
CORS_ORIGIN=http://localhost:5000
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the website:

```text
http://localhost:5000
```

---

## 📦 Build for Production

Compile the TypeScript backend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🚀 Deployment

The project is configured for deployment on **Vercel**.

### Deploy with Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variables.
4. Deploy the project.

After deployment, your website will be available at your configured Vercel domain.

### 🔗 Live Portfolio

**https://my-freelancer-website.vercel.app/**

---

## 📬 Contact & Connect

### GitHub

https://github.com/Gokul-CyberExpert

### Discord

https://discord.com/users/1496848249871401002

### Portfolio

https://my-freelancer-website.vercel.app/

---

## 👨‍💻 About

This portfolio was created to showcase my **web development, UI design, and software development projects** while providing potential clients with an easy way to explore my services and submit project inquiries.

**Built by Gokul N**

> Designing. Developing. Delivering.

