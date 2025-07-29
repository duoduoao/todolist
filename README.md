# TODO List Application

A simple fullstack TODO list web application that allows users to view, add, and delete their TODO items.  
Built with the latest Angular frontend and .NET 8 Web API backend, this project demonstrates clean architecture, in-memory data management, containerization, testing, and CI/CD automation.

---

## Table of Contents

- [Features](#features)  
- [Requirements Addressed](#requirements-addressed)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Run Locally](#run-locally)  
  - [Running Tests](#running-tests)  


---

## Features

- **View TODO List:** Users immediately see their current TODO list on app load  
- **Add TODO Items:** Users can add new items via an intuitive UI  
- **Delete Items:** Users can delete existing TODO items  
- **In-Memory Data:** Backend manages data in memory — no need for a database setup  
- **Latest Frameworks:**  
  - Angular 20 frontend  
  - .NET 8 Web API backend  
- **Testing:** Unit tests with xUnit (backend) and Karma/Jasmine (frontend)  
- **Containerized:** Multi-stage Dockerfiles for development, UAT, and production  
- **CI/CD Pipeline:** GitHub Actions workflow automates build, test, container build/push, and deployment  

---

## Requirements Addressed

- **Code Organization:** Clean separation of concerns, following SOLID principles  
- **Testing:** Automated tests provide confidence in correctness  
- **Containerization:** Docker containers for consistent deployment environments  
- **CI/CD:** Automated pipelines for building, testing, and deploying  

---

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)  
- [Node.js 20+](https://nodejs.org/)  
- Angular CLI (installed automatically via npm scripts or globally via `npm install -g @angular/cli`)  
- [Docker](https://www.docker.com/get-started)  
- Git  

---

### Run Locally

#### 1. Install Frontend Dependencies in Root

From the **Root** directory, run:

`npm run install-frontend`


#### 2. Install `concurrently` in Root

`concurrently` lets you run frontend and backend servers simultaneously. Install it as a dev dependency in **Root**:

`npm install concurrently --save-dev`

#### 3. Start Both Backend and Frontend

Run from the **Root** folder:

`npm start`


---

### Running Tests

**Backend Tests**

Run inside the backend folder:

`cd backend`

`dotnet test backend.Tests/backend.Tests.csproj`

 

**Frontend Tests**

Run inside the frontend folder:

`cd frontend`

`npm run test`

---
*Thank you for reviewing my work!*





