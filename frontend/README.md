# 🎨 EduStream – Frontend (Client)

This is the **frontend** of the Student Management System built using **Next.js (App Router)** and **TypeScript**.  
It provides a modern dashboard UI for managing students, searching, filtering, and pagination.

---

## 🧰 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **Axios**
- **Sonner** (toast notifications)
- **Lucide-react** (icons)

---

## 📁 Folder Structure

```txt
client/
│
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── dashboard/
│   ├── ui/                 # shadcn components
│   ├── StudentForm.tsx
│   ├── StudentGrid.tsx
│   ├── StudentTable.tsx
│   ├── EditStudentModal.tsx
│   ├── Filter.tsx
│   └── Pagination.tsx
│
├── hooks/
├── lib/
│   ├── api.ts              # Axios instance
│   ├── constants.ts        # Gender / Category constants
│   ├── types.ts            # TypeScript types
│   └── utils.ts
│
├── public/
├── package.json
└── README.md
