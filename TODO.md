# WeatherSense Server Fix - Approved Plan Steps

## Status: Starting implementation

### Logical Steps from Plan (sequential):

1. ~~Kill existing node processes and free port 5000~~ (user can run commands below if needed).
2. [x] Install additional server deps (dotenv, bcryptjs already present).
3. [x] Create/edit .env in server/ with RAPIDAPI_KEY (template created).
4. [x] Edit server/server.js: Added startup log, error handlers, dotenv support.
5. [x] Edit server/weatherAPI.js: Use env key.
6. Update this TODO.md with progress.
7. Guide: Install MongoDB (download MSI from mongodb.com, install as service).
8. Start MongoDB: `net start MongoDB` (run as admin).
9. Restart server: `cd server && npm run dev`.
10. Start client: New terminal `cd client && npm start`.
11. Test: Open localhost:3000, register/login, check dashboard weather.
12. Handle npm audit (run `npm audit fix --force` if OK with nodemon upgrade).
13. Complete!

**Current Progress:** Created TODO.md. Next: deps + edits (awaiting user new API key if needed).

**Commands to run now (copy-paste):**
```
taskkill /PID 19928 /F
taskkill /IM node.exe /F
cd server && npm i dotenv bcryptjs
```

