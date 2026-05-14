# Expense Tracker — Full-Stack ASP.NET Core + Angular

A personal expense tracking application built to practice modern full-stack
development with ASP.NET Core Web API and Angular.

## Tech Stack

**Backend:**
- ASP.NET Core 8 Web API
- Entity Framework Core
- SQL Server / SQLite
- JWT authentication

**Frontend:**
- Angular 17+
- TypeScript
- Reactive Forms
- RxJS / Observables
- HTTP interceptors for auth

## Features

- User registration and login with JWT auth
- Add, edit, delete expense entries
- Categorize expenses
- View expense list with filtering
- Form validation (client + server)
- Protected routes via Angular guards

## Project Structure

\```
expense-tracker/
├── backend/         ASP.NET Core Web API
└── frontend/        Angular application
\```

## Getting Started

### Backend
\```bash
cd backend
dotnet restore
dotnet run
\```
API runs at https://localhost:5001

### Frontend
\```bash
cd frontend
npm install
ng serve
\```
App runs at http://localhost:4200

## Status

Active development. Adding features as a learning project to demonstrate
modern full-stack patterns.

## About

Built by Chen Lu — Senior .NET Engineer in Atlanta.
[LinkedIn](https://linkedin.com/in/your-linkedin-here)
