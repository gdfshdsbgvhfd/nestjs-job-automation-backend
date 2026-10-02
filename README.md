# AI-Powered Job Search Automation Module (Backend)

This repository demonstrates the backend architecture concepts inspired by my commercial experience building the core automation features for **Sofi** ([sofi-assistant.com](https://sofi-assistant.com)), an AI assistant thatautomates job applications across various job boards and channels.

## 🚀 The Challenge & High-Load Performance Bottleneck

The original implementation suffered from massive performance degradation under peak loads. When hundreds of users simultaneously triggered the job-matching engine, the backend had to:
1. Parse multiple job feeds in parallel.
2. Request AI models to generate personalized cover letters for each vacancy.
3. Track application statuses and maintain multiple user sessions.

**The Pain Points:**
* **Database Deadlocks:** Concurrent heavy transactions choked the PostgreSQL connection pool.
* **API Rate Limiting & Blocking:** Synchronous requests to external platforms triggered security bots, risking account blocks.
* **Latency:** The average response time for a single job-matching chunk was over 4.2 seconds.

---

## 🛠️ Engineered Solutions & Architecture

To address these challenges and ensure a scalable, fully asynchronous (async) flow, I refactored the module with the following approaches:

### 1. Database Optimization (PostgreSQL)
* Designed a relational schema separating user metadata, job post caches, and application logs.
* Introduced composite B-Tree indexes on frequently filtered fields (`grade`, `location`, `salary_range`) to speed up matching queries.
* Implemented strict transaction boundaries to eliminate deadlocks during concurrent updates.

### 2. High-Performance Caching & Session Management (Redis)
* Integrated Redis to cache active user sessions and temporary job feed configurations.
* Offloaded the primary PostgreSQL database, dropping vacancy lookup speeds significantly.

### 3. Asynchronous Pipeline & Isolation
* Leveraged NestJS Dependency Injection and module structure to completely isolate the parsing engine from the main HTTP API.
* Wrapped the system in a production-ready Docker environment, facilitating easy scaling and local end-to-end integration testing.

---

## 📊 Business & Technical Impact (Before / After)

* **Throughput:** Scaled the system to reliably handle **3,000+ successful automated interview invitations/applications per day**.
* **Latency:** Reduced the matching processing time **from 4.2 seconds down to 350 milliseconds** (a 12x performance improvement).
* **Reliability:** Decreased production bug frequency by roughly 3x by enforcing strict TypeSafe interfaces in TypeScript and covering critical business logic with **Jest unit tests** (achieving 80%+ coverage).

---

## 💻 Tech Stack Demonstrated

* **Framework:** NestJS (TypeScript)
* **Database & ORM:** PostgreSQL / TypeORM
* **Caching:** Redis
* **Testing:** Jest
* **DevOps:** Docker, Docker Compose
* **Version Control:** Git GitFlow

