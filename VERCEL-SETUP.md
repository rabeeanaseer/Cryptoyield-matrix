# Deploy CryptoYields to Vercel

## GitHub

Extract this archive and put its contents at the root of your GitHub repository.
The root must contain package.json, pnpm-lock.yaml, pnpm-workspace.yaml,
vercel.json, api/, artifacts/, lib/, and scripts/.
Do not upload just the ZIP file or put the whole project inside another folder.
For an existing repository, replace the corresponding project files and remove
the old api/build.mjs file: its replacement is scripts/build-vercel-api.mjs.

## Vercel project settings

- Import or reconnect the GitHub repository.
- Root Directory: the repository root (leave blank or use .).
- Framework Preset: Other. vercel.json explicitly disables framework auto-detection.
- Node.js Version: 22.x.
- Allow vercel.json to supply the install command, build command and output directory.
  Remove dashboard overrides if they point at different commands or directories.
- Select the Git branch intended for production as the Production Branch.

Required environment variable:

- DATABASE_URL: your existing PostgreSQL connection string. Set it in Vercel's
  environment variables for Production, and Preview if you want preview deployments.

Optional environment variable:

- CRON_SECRET: a secret used to protect the scheduled data-refresh route.
  Configure it in Vercel's environment variables; do not commit it to GitHub.

Use your existing database credentials. This archive contains neither credentials
nor a database dump. The app initializes its tables and seeds initial content
against the configured database.

## Deployment checks

Push the files to your production branch and trigger a production deployment.
The build command generates API clients, checks the API with NodeNext,
bundles the serverless API, and builds the frontend.
Only api/index.mjs is the serverless entry; the build helper belongs under scripts/.

After Vercel reports the deployment Ready, check:

- / loads the homepage.
- /author/rabeea-naseer loads directly and after refresh.
- /api/healthz returns {"status":"ok"}.
- /api/stats/summary returns pool totals.

The tooltip/select sourcemap and large-chunk warnings do not themselves fail
the frontend build. A successful local build does not guarantee production
success: Vercel settings, database connectivity, and runtime logs must also be checked.
