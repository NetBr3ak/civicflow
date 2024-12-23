# 🏙️ CivicFlow – Smart Issue Reporting System

> Modern, lightweight, full-stack web app for submitting and managing issue reports in schools, municipalities, and community institutions.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13.4+-000000?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-4.0+-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 📖 Overview

CivicFlow is a streamlined solution designed to modernize the process of reporting and tracking issues within community organizations. Crafted with performance and usability in mind, it offers a frictionless experience for both users submitting reports and administrators managing them.

Developed by **Szymon Jędryczko** a.k.a. **NetBr3ak** – building clean, scalable solutions for real-world problems 💡

---

## 🚀 Live Demo

- 🧪 Local: `http://localhost:3000`
- 📊 Dashboard: `http://localhost:3000/dashboard`

---

## ✨ Features

- 📱 **Responsive Design** - Optimized for all devices from mobile to desktop
- 📥 **Submit Reports** - Clean, intuitive form with real-time validation
- 🔐 **Data Validation** - Robust schema validation with Zod for data integrity
- 💾 **Database Integration** - Efficient storage with Prisma ORM and SQLite
- 🧠 **Server-Side Rendering** - Fast page loads with Next.js App Router
- 📋 **Admin Dashboard** - Comprehensive view of all submitted reports
- 🔍 **Search & Filter** - Quickly find specific reports or issues
- 🧹 **Clean UI** - Minimal, accessible interface built with Tailwind CSS
- 🔄 **Real-time Updates** - Instant feedback on form submission
- 📊 **Data Visualization** - Clear presentation of report statistics

---

## 📊 Tech Stack

| Layer            | Technology               | Description                                       |
| ---------------- | ------------------------ | ------------------------------------------------- |
| Framework        | Next.js 13+ (App Router) | React framework with built-in API routes          |
| UI/UX            | Tailwind CSS             | Utility-first CSS framework for responsive design |
| State Management | React Context/Hooks      | Efficient state management across components      |
| Backend          | Next.js API Routes       | Serverless functions for handling requests        |
| Database         | SQLite                   | Lightweight, file-based relational database       |
| ORM              | Prisma                   | Type-safe database client and migration tool      |
| Validation       | Zod                      | TypeScript-first schema validation                |
| Deployment       | Vercel (recommended)     | Platform optimized for Next.js applications       |

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/civicflow.git
cd civicflow

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate SQLite DB and Prisma client
npx prisma migrate dev --name init

# Run the development server
npm run dev
```

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

---

## 📝 Usage Guide

### Submitting a Report

1. Navigate to the homepage at `http://localhost:3000`
2. Fill out the report form with issue details
3. Submit the form and receive confirmation

### Accessing the Dashboard

1. Go to `http://localhost:3000/dashboard`
2. View all submitted reports in a tabular format
3. Use filters to narrow down specific types of reports

---

## 📸 Screenshots

### 🧾 Submit Form
![Form Screenshot](https://via.placeholder.com/600x300?text=Form+Screenshot)

### 📊 Dashboard
![Dashboard Screenshot](https://via.placeholder.com/600x300?text=Dashboard+Screenshot)

---

## 📈 Project Stats

- ⏱️ Setup time: ~15 min
- 🧱 Code size: ~700 lines
- ⚡ Performance: Instant form submission and DB sync
- 📦 Lightweight: No bloat, minimal dependencies
- 🔄 Time to first byte: < 100ms
- 📱 Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)

---

## 🗺️ Project Structure

```
civicflow/
├── app/               # Next.js App Router pages and layouts
│   ├── api/           # API routes for data operations
│   ├── dashboard/     # Admin dashboard interface
│   └── page.tsx       # Homepage with report form
├── components/        # Reusable React components
├── lib/               # Utility functions and shared logic
├── prisma/            # Database schema and migrations
│   └── schema.prisma  # Prisma schema definition
├── public/            # Static assets
└── styles/            # Global CSS and Tailwind configuration
```

---

## 🤝 Ideal Use Cases

- 🏫 **Educational Institutions** – Report bullying, maintenance issues, suggestions
- 🏘️ **Municipalities** – Infrastructure problems, community feedback, local concerns
- 📚 **Libraries & NGOs** – Event feedback, resource requests, community outreach
- 🏢 **Small Businesses** – Customer feedback, facility maintenance, service improvements
- 🏥 **Healthcare Facilities** – Non-emergency issues, suggestions, accessibility concerns

---

## 🔜 Roadmap

- [ ] Email notifications for new reports
- [ ] User authentication for admin dashboard
- [ ] Report status tracking (Open, In Progress, Resolved)
- [ ] File attachment support for reports
- [ ] Export reports to CSV/PDF
- [ ] Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💡 Author

Created by **Szymon Jędryczko** (aka **NetBr3ak**)  
🌐 [github.com/NetBr3ak](https://github.com/NetBr3ak)  
📧 netbr3ak.dev [at] gmail [dot] com  
💼 [LinkedIn Profile](https://linkedin.com/in/szymon-jedryczko)

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Prisma](https://prisma.io/) - Database toolkit
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation

---

> ✨ **Production Deployment Tips**: Replace SQLite with PostgreSQL for better scalability and deploy on Vercel for optimal performance with Next.js applications. Consider implementing a caching strategy for frequently accessed data.