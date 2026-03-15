# Feedback App (Next.js)

A modern, secure feedback messaging app built with Next.js (App Router), NextAuth, MongoDB, TypeScript, and serverless APIs.

## 🚀 Project Overview

This app allows users to sign up, verify their email, and send private feedback messages to other users. It includes:

- Email verification-based authentication
- Username-based public profile pages
- Send, view, and delete feedback messages
- Message suggestions powered from server APIs
- Clean component-based UI with reusable form controls and toasts

## ⚙️ Features

- **Passwordless sign-up with verification code**
- **Login with username + passcode**
- **User dashboard** for received messages
- **Public user pages** at `/u/[username]`
- **Real-time validation and toasts** for UX feedback
- **API routes** organized by feature (`send-message`, `get-messages`, etc.)

## 🧭 Tech Stack

- Next.js App Router
- TypeScript
- NextAuth
- MongoDB (via Mongoose)
- Zod schema validation
- Custom UI components + CSS modules

## 📁 Key Files

- `src/app/page.tsx` - Main landing page
- `src/app/(auth)/sign-up/page.tsx` - Sign-up form flow
- `src/app/(auth)/verify/[username]/page.tsx` - Email code verification
- `src/app/api/*/route.ts` - API handlers
- `src/lib/dbConnect.ts` - Database connection
- `src/context/AuthProvider.tsx` - Auth context

## 🧪 Run Locally

1. Clone this repo
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` with:

```env
MONGODB_URI=your_mongo_connection_string
NEXTAUTH_SECRET=supersecret
NEXTAUTH_URL=http://localhost:3000
EMAIL_SERVER_USER=...
EMAIL_SERVER_PASSWORD=...
EMAIL_SERVER_HOST=...
EMAIL_SERVER_PORT=...
```

4. Start the dev server:

```bash
npm run dev
```

5. Open http://localhost:3000

## 🧭 Usage Flow

1. Sign up with username, email, and password.
2. Check your inbox for verification code.
3. Verify your account and sign in.
4. Send feedback to another user by username.
5. View messages on your dashboard and in your public profile.

## 🧬 API Endpoints

- `POST /api/sign-up` — create user and send verification email
- `POST /api/verify-code` — verify code and activate account
- `POST /api/send-message` — send message to user
- `GET /api/get-messages` — get logged-in user messages
- `DELETE /api/delete-message/[messageid]` — delete own message
- `GET /api/suggest-messages` — message suggestions

## ✅ Deployment

Deploy on Vercel:

```bash
npm run build
npm run start
```

Or connect repo directly in Vercel and configure environment variables.

## 🧩 Customize

- Update UI in `src/components/ui/*`
- Add new API routes under `src/app/api`
- Extend user schema in `src/model/User.ts`

## 💡 Project Goals

This app is built as a portfolio-ready example of a full-stack Next.js app with authentication, secure server APIs, and polished user UX.

## 📬 Contributing

1. Fork this repo
2. Create a feature branch
3. Open a PR with your changes
