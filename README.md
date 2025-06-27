# Scalian Frontend

A modern Angular frontend for candidate data upload and validation.

## Features

- Upload candidate data via Excel file and form fields
- Show candidates uploaded in a table
- Pagination and sorting of candidates
- REST API integration with `/api` global prefix (see [scalian-backend](https://github.com/mjmmattoni98/scalian-backend.git))
- Modern Angular architecture

## Getting Started

### Install dependencies

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run start
```

The app will be available at [http://localhost:4200](http://localhost:4200).

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Usage

- Fill in the candidate form and upload an Excel file with columns: seniority, years, availability (one row).
- The frontend will validate and send the data to the backend API.

## Testing

Run all tests:

```bash
npm test
```

## Available Scripts

- `npm run start` - Run the app in development mode.
- `npm run build` - Build the app for production.
- `npm run test` - Run unit tests.
