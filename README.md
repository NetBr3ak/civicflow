# CivicFlow

Civic issue reporting platform for local communities

## Overview

A modern web application where citizens can report local issues and administrators can manage them efficiently. Built with Next.js, Prisma, and TypeScript.

## Screenshots

### Report Submission Form

#### Before Submission
![Report Form - Before](./public/screenshots/form-before.png)
*Clean and intuitive form for submitting civic reports*

#### After Submission
![Report Form - Success](./public/screenshots/form-after.png)
*Success confirmation with smooth fade-in animation*

### Admin Dashboard
![Dashboard](./public/screenshots/dashboard.png)
*Professional dashboard with statistics, filtering, sorting, and report management capabilities*

## Tech Stack

- **Next.js 15.2.4** - React framework with App Router
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Prisma 6.5.0** - Type-safe ORM
- **SQLite** - Lightweight database
- **TypeScript 5.8** - Type safety
- **Zod 3.24** - Schema validation

## Quick Start

```bash
# Clone the repository
git clone https://github.com/NetBr3ak/civicflow.git
cd civicflow

# Install dependencies
npm install

# Setup database
npx prisma migrate dev
npx prisma generate

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app

## Features

### Report Submission
- 📝 Submit reports with multiple categories (Infrastructure, Environmental, Public Safety, Healthcare, Education)
- ⚡ Priority levels (High, Normal, Low)
- ✅ Form validation with Zod
- 📊 Real-time character counter
- 🎨 Clean, professional UI

### Admin Dashboard
- 📈 **Statistics Overview**: Total reports, This week count, Unique categories, High priority alerts
- 🔍 **Advanced Filtering**: Filter by category (Infrastructure, Environmental, Public Safety, Healthcare, Education) and priority levels
- 🗂️ **Smart Sorting**: Sort by date (newest first), priority (high→low), or category (alphabetical)
- 📋 **Detailed Report Cards**: User info, timestamps, category badges, priority indicators
- ✏️ **Status Management**: Real-time status updates (Pending → In Progress → Resolved/Rejected)
- 🗑️ **Safe Deletion**: Delete reports with confirmation dialog
- 🌓 **Dark Mode**: Automatic theme switching support
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Technical Features
- ⚡ Built with Next.js 15.2.4 App Router for optimal performance
- 🎨 Tailwind CSS 4.0 with dark mode support
- 💾 Prisma 6.5.0 ORM with SQLite database
- 🔒 Type-safe with TypeScript 5.8 and Zod validation
- 🚀 Optimized production build (dashboard: 3.36 kB)
- ♿ Accessible and semantic HTML
- 🔄 Real-time status updates without page refresh
- 📱 Fully responsive design for all screen sizes

## Project Structure

```
civicflow/
├── app/
│   ├── api/report/          # API endpoints
│   ├── dashboard/           # Admin dashboard
│   ├── privacy/             # Privacy policy page
│   ├── terms/               # Terms of service page
│   └── page.tsx             # Main report form
├── lib/
│   └── prisma.ts            # Prisma client singleton
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/
│   └── screenshots/         # App screenshots
└── scripts/
    └── seed.ts              # Database seeding script
```

## Usage

### Submit a Report
1. Navigate to the home page
2. Fill in your name and email
3. Select a category and priority level
4. Describe the issue
5. Submit the report

### Manage Reports (Admin)
1. Navigate to `/dashboard`
2. View statistics and all submitted reports
3. Use filters to find specific reports by category and priority
4. Sort by date, priority, or category
5. Update report status (Pending → In Progress → Resolved/Rejected)
6. Delete reports with confirmation dialog

## API Routes

### POST `/api/report`
Create a new report
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Infrastructure",
  "message": "Description of the issue",
  "priority": "high"
}
```

### GET `/api/report`
Retrieve all reports

### DELETE `/api/report?id={id}`
Delete a specific report

### PATCH `/api/report?id={id}`
Update report status
```json
{
  "status": "resolved"
}
```

## Database Schema

```prisma
model Report {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  category  String
  message   String
  priority  String   @default("normal")
  status    String   @default("pending")
  createdAt DateTime @default(now())
}
```

### Status Values
- `pending` - New report awaiting review
- `in-progress` - Report is being processed
- `resolved` - Issue has been resolved
- `rejected` - Report was rejected or invalid

## Roadmap

### ✅ Completed Features
- [x] Report submission with validation
- [x] Admin dashboard with statistics
- [x] Filtering and sorting capabilities  
- [x] Report status tracking (Pending, In Progress, Resolved, Rejected)
- [x] Delete reports from dashboard
- [x] Dark mode support
- [x] Responsive design

### 🔄 Planned Features
- [ ] User authentication system
- [ ] Email notifications for new reports
- [ ] File upload support for evidence/photos
- [ ] Email templates for status updates
- [ ] Export reports to CSV/PDF
- [ ] Report analytics and trends dashboard
- [ ] Activity logs and audit trail
- [ ] Bulk actions (delete multiple, status updates)
- [ ] Report assignment to staff members

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

---

**Built by NetBr3ak** | [GitHub](https://github.com/NetBr3ak/civicflow)