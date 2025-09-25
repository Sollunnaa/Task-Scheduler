# Task Scheduler

An app that helps users schedule tasks as a group.

## Project Structure

```
Task Scheduler/
├── Backend/
│   ├── src/
│   │   ├── Config/
│   │   │   └── schema.ts
│   │   └── index.ts
├── Frontend/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Backend

- **Tech Stack:** Node.js, Express, TypeScript, Drizzle ORM, Neon/PostgreSQL
- **Environment:** Configure `.env` with your database connection and port.

### Database Schema

- **users:** Stores user info, links to `persons` (one-to-one).
- **persons:** Personal details for each user.
- **activities:** Group activities.
- **user_activities:** Links users to activities, tracks status.
- **tasks:** Tasks under each user activity.

### Relationships

- **One-to-One:**  
  - `users.personId` uniquely references `persons.id`.
- **One-to-Many:**  
  - `user_activities` links users and activities.
  - `tasks` belong to `user_activities`.

### Example `.env`

```
PORT=3001
DATABASE_URL=postgresql://username:password@host:port/dbname?sslmode=require
```

### Scripts

- **Install dependencies:**  
  ```
  npm install
  ```
- **Run in development:**  
  ```
  npm run dev
  ```
- **Build TypeScript:**  
  ```
  npm run build
  ```
- **Start production server:**  
  ```
  npm start
  ```

## Frontend

- Place your client-side code in the `Frontend` folder.

## API Testing

- Use Postman or Swagger (OpenAPI) for API testing.
- Import your Swagger spec into Postman for automatic route detection.

## Notes

- Update the schema in `Backend/src/Config/schema.ts` for database changes.
- Keep `.env` secure and do not commit sensitive info.
- For one-to-one relationships, both tables have their own primary key; one table references the other with a unique foreign key.

---