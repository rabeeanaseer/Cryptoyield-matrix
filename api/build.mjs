import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const apiServerDir = path.resolve(here, "../artifacts/api-server");

const require = createRequire(path.join(apiServerDir, "package.json"));
const esbuild = require("esbuild");

globalThis.require = createRequire(import.meta.url);

const entry = path.resolve(apiServerDir, "src/vercel-entry.ts");
const outfile = path.resolve(here, "index.mjs");

await esbuild.build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "info",
  conditions: ["workspace"],
  external: ["pg-native"],
  banner: {
    js: `import { createRequire as __cr } from 'node:module';
import __p from 'node:path';
import __u from 'node:url';
globalThis.require = __cr(import.meta.url);
globalThis.__filename = __u.fileURLToPath(import.meta.url);
globalThis.__dirname = __p.dirname(globalThis.__filename);`,
  },
});

console.log("Built", outfile);
