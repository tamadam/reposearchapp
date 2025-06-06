# GitHub Repository Search App

A React application for searching GitHub repositories with advanced filtering, sorting, and search history features.

## Features

- 🔍 Search GitHub repositories with query text
- 🎚️ Advanced filters:
  - By stars, size and creation date (exact, range, greater/less than)
  - By username, organization, topics, languages
    
- 🔄 Sorting by:
  - Best match (default)
  - Stars
  - Forks
  - Created date
- ⬆️⬇️ Ascending/descending order
- 📖 Pagination support
- ⏳ Search history with:
  - Timestamp of searches
  - Query details breakdown
  - Result counts
- ♻️ Error handling with retry capability
- ⚡ Caching and background updates with React Query

## Technologies

| Category        | Technologies Used |
|----------------|------------------|
| Core           | React, TypeScript |
| State Management | Zustand |
| Data Fetching  | React Query (TanStack Query) |
| Forms          | React Hook Form + Zod validation |
| UI Components  | Material-UI (MUI) |
| API            | GitHub REST API |

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tamadam/reposearchapp.git
   
   cd reposearchapp
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure GitHub Token**<br/><br/>
   Create a .env file in the project root:<br/><br/>
   ```bash
   VITE_GITHUB_ACCESS_TOKEN = your_personal_access_token_here
   ```
5. **Run the app**
   ```bash
   npm run dev
   ```

