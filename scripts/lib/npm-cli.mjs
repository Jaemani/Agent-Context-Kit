import { access } from "node:fs/promises";
import path from "node:path";

export async function resolveNpmInvocation(arguments_) {
  return await resolveCli("npm-cli.js", arguments_);
}

export async function resolveNpxInvocation(arguments_) {
  return await resolveCli("npx-cli.js", arguments_);
}

async function resolveCli(entrypoint, arguments_) {
  const npmExecPath = process.env.npm_execpath;
  const candidates = [
    typeof npmExecPath === "string" ? path.join(path.dirname(npmExecPath), entrypoint) : undefined,
    path.resolve(
      path.dirname(process.execPath),
      "..",
      "lib",
      "node_modules",
      "npm",
      "bin",
      entrypoint,
    ),
    path.resolve(path.dirname(process.execPath), "node_modules", "npm", "bin", entrypoint),
    path.resolve(path.dirname(process.execPath), "..", "node_modules", "npm", "bin", entrypoint),
  ].filter((candidate) => typeof candidate === "string" && candidate.length > 0);

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return { command: process.execPath, arguments: [candidate, ...arguments_] };
    } catch {
      // Try the next installation layout.
    }
  }
  throw new Error(`Unable to locate ${entrypoint} for a shell-free npm subprocess.`);
}
