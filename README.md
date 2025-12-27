# Job Application Tracker

## Project Overview

A full-stack web application designed to help developers and professionals streamline their career search by centralizing the application pipeline. Built using the MERN Stack, this platform allows users to log job details, track application statuses, and manage their interview journey in a single, organized dashboard. The entire application is containerized to ensure environment consistency and simplified deployment.

## Tech Stack

* Frontend: React.js with Vite
* Backend: Node.js & Express.js
* Database: MongoDB
* Authentication: JWT (JSON Web Tokens)
* DevOps: Docker & Docker Compose

## Setup Instructions

1. Prerequisites
Ensure you have the following installed on your system:

* Docker Desktop (running)
* Git

2. Clone the Repository
git clone (https://github.com/sibtainahmed77/Job-Application-Tracker)
cd "Job Application Tracker"
3. Environment Configuration
Ensure your .env file in the server directory is configured with your MONGODB_URI and JWT_SECRET to allow the containers to connect to your database and handle authentication.

## Docker Run Commands

The project uses Docker Compose to orchestrate the frontend and backend services simultaneously.

To build and start the application:
docker-compose up --build

To stop the application:
docker-compose down

* Frontend Access: http://localhost:5173
* Backend API Access: http://localhost:5000

## API Details

The backend follows RESTful principles and uses JWT for protected routes.

1. Authentication

* POST /api/auth/register : Create a new user account
* POST /api/auth/login : Authenticate user and get token

2. Job Management

* GET /api/jobs : Retrieve all job applications for the logged-in user
* POST /api/jobs : Add a new job application to the tracker
* PUT/PATCH /api/jobs/:id : Update status (e.g., Applied, Interviewing, Offered)
* DELETE /api/jobs/:id : Remove an application from the record

---

This project was developed as a functional MVP to demonstrate full-stack integration and containerization practices.
