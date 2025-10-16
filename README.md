// ...existing code...
# NECX Messaging Backend

Simple Express + MongoDB backend for a messaging app.

## Project layout
- [server.js](server.js) — app bootstrap, middleware and route mounting
- [db.js](db.js) — MongoDB connection (exports [`connectDB`](db.js))
- [package.json](package.json) — scripts & dependencies
- [.env](.env) — environment variables (MONGO_URI, PORT)

Folders:
- [models/Message.js](models/Message.js) — message model (`[`Message`](models/Message.js)`)
- [models/User.js](models/User.js) — user model (`[`User`](models/User.js)`)
- [routes/messages.js](routes/messages.js) — message CRUD endpoints
- [routes/users.js](routes/users.js) — user CRUD endpoints
- [middleware/validate.js](middleware/validate.js) — request validation helpers ([`ensure`](middleware/validate.js), [`has`](middleware/validate.js), [`optionalBoolean`](middleware/validate.js))
- [middleware/errors.js](middleware/errors.js) — error handlers ([`notFound`](middleware/errors.js), [`errorHandler`](middleware/errors.js))

## Quick start
1. Install deps:
   ```sh
   npm install
   ```
2. Create a `.env` with your `MONGO_URI` and optional `PORT`. The repo includes an example in [.env](.env).
3. Start dev server:
   ```sh
   npm run dev
   ```
   The server bootstraps with [`connectDB`](db.js) and listens on the configured port (see [server.js](server.js)).

## API (overview)
- Health: GET /api/health
- Messages: mounted at /api/messages (see [routes/messages.js](routes/messages.js))
  - GET /api/messages — list with optional query (userId, q, before, limit)
  - POST /api/messages — create { userId, text }
  - PATCH /api/messages/:id — update text/pinned
  - DELETE /api/messages/:id — delete
- Users: mounted at /api/users (see [routes/users.js](routes/users.js))
  - GET /api/users — list users
  - POST /api/users — create { name }
  - PATCH /api/users/:id — update
  - DELETE /api/users/:id — delete

## Notes / implementation details
- Models use Mongoose: see [`Message`](models/Message.js) and [`User`](models/User.js).
- Full-text search on messages via a text index in [models/Message.js](models/Message.js).
- Request validation helpers are in [middleware/validate.js](middleware/validate.js) and are used in the routes.
- Errors and 404 responses are handled centrally by [`notFound`](middleware/errors.js) and [`errorHandler`](middleware/errors.js), mounted in [server.js](server.js).

## Useful files
- [server.js](server.js)
- [db.js](db.js)
- [package.json](package.json)
- [.env](.env)
- [routes/messages.js](routes/messages.js)
- [routes/users.js](routes/users.js)
- [models/Message.js](models/Message.js)
- [models/User.js](models/User.js)
- [middleware/validate.js](middleware/validate.js)