# pb138-insurance

Projekt na PB138

# Zadanie

Umožňuje zadat uživateli informace o voze (výkon motoru, kubatura, typ vozu, ohodnocení), a dále výběr produktů (povinné ručení, havarijní pojištění, připojištění skla). Podle zadaných produktů a parametrů o voze vytvoří fiktivní nabídku pojištění vozu.

# Running

You can run each project individually, or using the following commands from the root folder:

| Command          | Purpose          |
| ---------------- | ---------------- |
| `npm run backend-dev` | Runs backend dev. |
| `npm run frontend-dev`| Runs frontend dev. |
| `npm run dev` | Starts both in dev. |

Similar commands for production version, just swap `dev` with `prod`.

# Code style

This project uses the `.editorconfig` file for code styling.
If you are using VS Code, download the extension `EditorConfig for VS Code`.

You can run the following commands from the root folder:

| Command          | Purpose          |
| ---------------- | ---------------- |
| `npm run format` | Formats all JS/TS/JSX files. |
| `npm run format:show`| Shows which files are not formatted. |
| `npm run lint` | Shows errors. |
| `npm run lint:fix` | Fixes all errors. |

`eslint` provides additional code checks. If you are using VS Code, download `ESLint` extension to see errors in the editor.

# Production

Run `docker-compose up` from the root folder to automatically build and run the app in Docker.
The app is then exposed on the port 9080.
Pipeline will automatically deploy the app to `http://mukovnik.xyz:9080/` on pushes to main branch.