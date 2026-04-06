### Project Overview
This application allows users to manage their financial health through a secure, role-based dashboard. It implements Role-Based Access Control (RBAC) to ensure data integrity and security across different user levels.

## Key Features

Role-Based Access:

Admin: Full oversight. Can view all records and assign transactions to specific users.

Analyst: Can add and manage their own financial data.

Viewer: Read-only access to their own data.

Financial Management: CRUD operations for Income and Expense tracking with category-based filtering.

Dashboard Summary: API for Total Income, Total Expenses, and Net Balance.

Security: Token-based Authentication via DRF.

Enhanced UX: Pagination (5 records per page) and Category Search functionality.

## Tech Stack
Backend: Python, Django, Django REST Framework, SQLite3.

Frontend: React, Axios, Tailwind CSS.

Auth: Token Authentication.


## Getting Started

1. Backend Setup
cd backend
python -m venv venv

Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

2. Frontend Setup
cd frontend
npm install
npm start

## Project Structure
FINANCE_DASHBOARD_PROJECT/
├── backend/            # Django REST API
│   ├── finance/        # Financial records & logic
│   ├── users/          # Custom User model & Auth
│   └── db.sqlite3      # Local Database
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Dashboard, Auth, Forms
│   │   └── api.js      # Axios configurations
└── README.md

## Final Checklist Fulfillment
Custom User Model with Roles (Admin, Analyst, Viewer).

Financial Record CRUD with Role-based permissions.

Admin ability to assign records to other users.

Summary API (Total Income/Expense/Balance).

Search & Pagination implemented.

Unified GitHub Repository Structure.