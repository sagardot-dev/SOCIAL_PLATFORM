# Social Platform — Next.js 16

A modern social media application built with Next.js 16, React Query, Prisma, Neon PostgreSQL, AWS S3, and Better Auth. Includes posts, comments, likes, profiles, authentication, and media uploads.

## Demo User

Email: demo@example.com  
Password: demo123123

## Tech Stack

Frontend: Next.js 16, React 19, React Query, TailwindCSS, ShadCN UI  
Backend/Infra: Prisma ORM, Neon (PostgreSQL), AWS S3, Better Auth, pnpm

## How to Start

git clone <repo-url>  
cd your-project  
pnpm install

## Environment Variables (.env)

DATABASE_URL=  
BETTER_AUTH_SECRET=  
BETTER_AUTH_URL=  
RESEND_API_KEY=  
AWS_ACCESS_KEY_ID=  
AWS_SECRET_ACCESS_KEY=  
AWS_REGION=  
AWS_S3_BUCKET=

## Database Setup

pnpm prisma generate

# optional

pnpm prisma db push

## Run Project

pnpm dev

# Runs on: http://localhost:3000

## Features

- Better Auth authentication
- User profiles
- Create posts
- Likes & reactions
- Comments
- AWS S3 media uploads
- React Query caching
- Next.js API routes

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
