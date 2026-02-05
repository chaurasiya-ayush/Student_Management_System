# 🎓 Student Management System (EduStream)

A **full-stack Student Management System** built with **Next.js (TypeScript)** on the frontend and **Spring Boot (Java)** on the backend. The project focuses on **clean architecture**, **DTO-based APIs**, **search & filtering**, **pagination**, and a **modern dashboard UI**.

> This README is shown on GitHub. For detailed setup instructions:
>
> * 📘 **Frontend:** [client/README.md](./client/README.md)
> * 📗 **Backend:** [server/README.md](./server/README.md)

---


## ✨ Features

### 👨‍🎓 Student Management

* Create, update, delete students
* DTO-based request/response (no entity leakage)
* Gender & Category enums
* Profile image via **image URL**

### 🔍 Search, Filter & Pagination

* Keyword search (name, email, institute)
* Department / category filtering
* Server-side pagination
* Optimized count + data queries

### 📊 Dashboard

* Student count
* Monthly trend stats
* Clean UI with cards & tables

### 🧱 Architecture Highlights

* **Frontend:** App Router, reusable components, typed API layer
* **Backend:** Controller → Service → Repository
* Centralized exception handling
* CORS & security config separated

---

## 🗂️ Project Structure

```txt
STUDENT-MANAGEMENT-SYSTEM/
│
├── client/                 # Next.js + TypeScript frontend
│   └── README.md
│
├── server/                 # Spring Boot backend
│   └── README.md
│
└── README.md               # (this file – GitHub main README)
```

---

## 🧰 Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Axios
* Sonner (toasts)
* Lucide Icons

### Backend

* Java 17+
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Validation (Jakarta Validation)
* MySQL / PostgreSQL (configurable)

---

## 🔌 API Overview (High Level)

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | /api/students        | Create student      |
| GET    | /api/students        | Get all (paginated) |
| GET    | /api/students/search | Search students     |
| PUT    | /api/students/{id}   | Update student      |
| PATCH  | /api/students/{id}   | Partial update      |
| DELETE | /api/students/{id}   | Delete student      |
| GET    | /api/dashboard       | Dashboard stats     |

> Full API details are available in **server/README.md**

---

## 🧠 Search & Filtering (Concept)

* Search uses **`LIKE %keyword%`** (case-insensitive)
* Implemented at **repository level** (DB-side filtering)
* Pagination uses **Pageable** with a separate count query

```text
Controller → Service → Repository → DB
```

---

## 🚀 How to Run (Quick)

```bash
# frontend
cd client
npm install
npm run dev

# backend
cd server
./mvnw spring-boot:run
```

Detailed setup is in the respective READMEs 👇

* 👉 client/README.md
* 👉 server/README.md

---

## 📌 Notes

* Images are stored as **URLs**, not base64
* DTO mapping is done manually (MapStruct-ready)
* Designed for scalability & clean GitHub presentation

---

## 👨‍💻 Author

**Ayush Chaurasiya**
Eat 💻 Sleep 😴 Code ⚡ Repeat 💪

---

⭐ If you like this project, don’t forget to star the repo!
