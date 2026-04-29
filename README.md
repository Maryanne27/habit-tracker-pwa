# Habit Tracker PWA

## Overview

This is a mobile-first Habit Tracker Progressive Web App built based on a strict Technical Requirements Document (TRD). The goal was to implement the specification exactly, focusing on deterministic behavior, testability, and correctness.

## Features

* User signup and login (local authentication)
* Session persistence using localStorage
* Create, edit, delete habits
* Daily habit completion tracking
* Automatic streak calculation
* Protected dashboard route
* Offline support via service worker
* Installable as a PWA

## Tech Stack

* Next.js (App Router)
* React + TypeScript
* Tailwind CSS
* localStorage (persistence)
* Vitest (unit tests)
* React Testing Library (integration tests)
* Playwright (end-to-end tests)

## Getting Started

### Install dependencies

npm install

### Run development server

npm run dev

### Run tests

npm run test

## Test Structure

* tests/unit → utility function tests
* tests/integration → auth and habit form behavior
* tests/e2e → full application flows

## Local Persistence

The app uses localStorage with the following keys:

* habit-tracker-users
* habit-tracker-session
* habit-tracker-habits

## PWA Support

* manifest.json defines app metadata
* service worker caches app shell
* supports offline loading after first visit

## Trade-offs

* No backend (as required by TRD)
* Authentication is local and not secure for production
* Data persistence limited to browser storage

## Test Coverage

Unit tests achieve at least 80% coverage for core logic in src/lib.

## Deployment

Deployed via vercel.

## Repository

https://github.com/Maryanne27/habit-tracker-pwa

## Live App

https://habit-tracker-pwa-jade.vercel.app
