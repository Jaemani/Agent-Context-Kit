import { lstat, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { issueError } from "./errors.js";
import { hasUnsafeLineControl, isWellFormedUnicode } from "./text.js";

const WINDOWS_ABSOLUTE_PATH = /^[A-Za-z]:[\\/]/;
const WINDOWS_RESERVED_NAME = /^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)/i;
const WINDOWS_INVALID_CHARACTERS = /[<>:"|?*]/;
export const MAX_PORTABLE_PATH_CHARACTERS = 1024;

export function resolveProjectPath(root: string, portablePath: string): string {
  assertPortableRelativePath(portablePath);
  const segments = portablePath.split("/");
  const candidate = path.resolve(root, ...segments);
  const relative = path.relative(root, candidate);

  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw issueError(
      "E_PATH_ESCAPE",
      `Path escapes the project root: ${portablePath}`,
      "Use a project-relative path that stays inside the repository.",
    );
  }

  return candidate;
}

export function assertPortableRelativePath(portablePath: string): void {
  if (portablePath.length === 0) {
    throw issueError("E_PATH_EMPTY", "Paths must not be empty.");
  }
  if (portablePath.includes("\0")) {
    throw issueError("E_PATH_NUL", "Paths must not contain NUL bytes.");
  }
  if (!isWellFormedUnicode(portablePath)) {
    throw issueError("E_UNICODE", "Paths must contain well-formed Unicode scalar values.");
  }
  if ([...portablePath].length > MAX_PORTABLE_PATH_CHARACTERS) {
    throw issueError(
      "E_PATH_LENGTH",
      `Paths must not exceed ${MAX_PORTABLE_PATH_CHARACTERS} Unicode characters.`,
    );
  }
  if (portablePath.includes("\\")) {
    throw issueError(
      "E_PATH_PORTABILITY",
      `Path must use forward slashes on every platform: ${portablePath}`,
    );
  }
  if (portablePath.startsWith("/") || WINDOWS_ABSOLUTE_PATH.test(portablePath)) {
    throw issueError("E_PATH_ABSOLUTE", `Path must be relative: ${portablePath}`);
  }

  const segments = portablePath.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw issueError(
      "E_PATH_NORMALIZATION",
      `Path must be normalized and must not contain '.', '..', or empty segments: ${portablePath}`,
    );
  }
  const nonPortableSegment = segments.find(
    (segment) =>
      WINDOWS_INVALID_CHARACTERS.test(segment) ||
      hasUnsafeLineControl(segment) ||
      WINDOWS_RESERVED_NAME.test(segment) ||
      segment.endsWith(".") ||
      segment.endsWith(" "),
  );
  if (nonPortableSegment !== undefined) {
    throw issueError(
      "E_PATH_PORTABILITY",
      `Path segment is not portable across supported operating systems: ${nonPortableSegment}`,
    );
  }
}

export function portablePathKey(portablePath: string): string {
  return conservativePortableCaseFold(portablePath);
}

function conservativePortableCaseFold(value: string): string {
  return value.normalize("NFKC").toLowerCase().toUpperCase().toLowerCase().normalize("NFKC");
}

export async function canonicalProjectRoot(rootInput: string): Promise<string> {
  const resolved = path.resolve(rootInput);
  try {
    const metadata = await stat(resolved);
    if (!metadata.isDirectory()) {
      throw issueError("E_ROOT_NOT_DIRECTORY", `Project root is not a directory: ${resolved}`);
    }
    return await realpath(resolved);
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      throw issueError("E_ROOT_MISSING", `Project root does not exist: ${resolved}`);
    }
    throw error;
  }
}

export async function assertNoSymlink(root: string, target: string): Promise<void> {
  const relative = path.relative(root, target);
  const segments = relative === "" ? [] : relative.split(path.sep);
  let current = root;

  for (const segment of segments) {
    current = path.join(current, segment);
    try {
      const metadata = await lstat(current);
      if (metadata.isSymbolicLink()) {
        throw issueError(
          "E_SYMLINK_PATH",
          `Refusing to access a symbolic link inside the project: ${path.relative(root, current)}`,
          "Replace the symlink with a regular file or directory, or move the target into the repository.",
        );
      }
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        return;
      }
      throw error;
    }
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
