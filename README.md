# CivicFlow

issue reporting app for local stuff

## whats this

basic web app where people can report problems and admin can see them. built with next.js and prisma

## tech stack

- Next.js
- Tailwind 
- Prisma
- SQLite
- TypeScript

## setup

```bash
git clone https://github.com/NetBr3ak/civicflow.git
npm install
npx prisma migrate dev
npm run dev
```

## features

- submit reports with categories
- priority levels (high, normal, low)
- admin dashboard with stats
- sorting (date, priority, category)
- filtering by category and priority
- form validation with zod
- dark mode support
- clean professional design

## todo

- email notifications
- file uploads
- auth system
- report status updates

built by NetBr3ak