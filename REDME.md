A modern, Facebook-like social media application built with Next.js 16, React Query, Prisma, Neon Database, and AWS S3.
Features include posts, comments, likes, profiles, media uploads, authentication, and more.
---------------------------------------------------------------



DEMO TEST USER 
------------------------
Email: demo@example.com
Password: demo123123



Tech Stack ***********
Frontend
---------------
Next.js 16 (App Router)
React 19
React Query
TailwindCSS
ShadCN UI

Backend / Infra
-----------------
Prisma ORM
Neon (PostgreSQL serverless database)
AWS S3 (media uploads)
Better Auth (Next.js Authentication)
pnpm (package manager)



HOW TO SATAR THE PROJEFCT

git clone <repo-url>
cd your-project
-----
pnpm install


------------------------------------------------------
//neon db
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

//optional for email
RESEND_API_KEY=


//for s3 bucket
KEY_AWS_ACCESS_KEY=
AWS_REGION=


DATABASE SETUP
---------------------
***
pnpm prisma generate



▶️ Running the Project loaclly
pnpm dev
