# CivicFlow

Civic issue reporting platform for local communities

## Overview

A modern web application where citizens can report local issues and administrators can manage them efficiently. Built with Next.js, Prisma, and TypeScript.

## Screenshots

### Form & Dashboard
![Report Form - Before](./public/screenshots/form-before.png)
![Report Form - Success](./public/screenshots/form-after.png)
![Dashboard](./public/screenshots/dashboard.png)

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

## Features

- Submit reports with categories and priorities
- Admin dashboard with filtering and sorting
- Update report status (Pending → In Progress → Resolved)
- Delete reports with confirmation
- Dark mode support
- Responsive design

## Project Structure

```
civicflow/
├── app/
│   ├── api/report/          # REST API (GET, POST, PATCH, DELETE)
│   ├── dashboard/           # Admin management panel
│   ├── privacy/             # Privacy policy page
│   ├── terms/               # Terms of service page
│   ├── layout.tsx           # Root layout with global styles
│   └── page.tsx             # Main report submission form
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

### Usage

**Submit Report:** Fill form at `/` → Select category/priority → Submit  
**Manage Reports:** Go to `/dashboard` → Filter, sort, update status, or delete

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



## Roadmap

## Roadmap

- [x] Report CRUD with status tracking
- [x] Admin dashboard with filtering
- [ ] Authentication system
- [ ] Email notifications
- [ ] File uploads
- [ ] Report analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

---

**Built by NetBr3ak** | [GitHub](https://github.com/NetBr3ak/civicflow)