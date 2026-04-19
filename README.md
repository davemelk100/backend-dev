# Backend Dev Training

A comprehensive, server-rendered training platform covering all things backend development. Built with a backend-driven architecture using Node.js, Express, and EJS.

## Topics Covered

- **HTTP Fundamentals** — Methods, status codes, headers, request-response lifecycle
- **REST API Design** — Resource modeling, naming conventions, versioning
- **Databases & Data Modeling** — SQL vs NoSQL, schema design, indexing, migrations
- **Authentication & Authorization** — JWT, sessions, OAuth, RBAC
- **Middleware & Request Pipeline** — Composable middleware patterns
- **Error Handling & Logging** — Structured errors, logging strategies, observability
- **Testing Backend Code** — Unit, integration, API tests, TDD
- **Security Best Practices** — OWASP Top 10, injection prevention, rate limiting
- **Performance & Caching** — Redis, query optimization, async processing
- **Deployment & DevOps** — Docker, CI/CD, health checks, environment config

## Architecture

This app uses a **backend-driven architecture** — all pages are server-rendered with EJS templates. No client-side JavaScript framework. The server handles routing, data loading, and HTML generation.

```
backend-dev/
├── server.js              # Express app entry point
├── routes/                # Route handlers
│   └── topics.js
├── data/                  # Training content (JSON)
│   └── topics.json
├── views/                 # EJS templates
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── topic.ejs
│   ├── about.ejs
│   └── 404.ejs
└── public/                # Static assets
    ├── css/style.css
    └── js/main.js
```

## Getting Started

```bash
npm install
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Node.js** — Runtime
- **Express** — Web framework
- **EJS** — Server-side template engine
- **Roboto Condensed** — Typography
