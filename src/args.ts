import type { IFs } from "memfs";

// Static properties that should be copied directly
export const staticProps: string[] = [
  "constants",
  "F_OK",
  "R_OK",
  "W_OK",
  "X_OK",
  "Stats",
  "StatFs",
  "Dirent",
  "Dir",
  "ReadStream",
  "WriteStream",
  "FSWatcher",
  "StatWatcher",
  "FileHandle", // New in modern Node.js
];

// Methods that need path rewriting
export const rewritableMethods: (keyof IFs)[] = [
  // Original sync methods
  "accessSync",
  "appendFileSync",
  "chmodSync",
  "chownSync",
  "copyFileSync", // New
  "cpSync", // New
  "existsSync",
  "lchmodSync",
  "lchownSync",
  "linkSync",
  "lstatSync",
  "mkdirSync",
  "mkdtempSync",
  "openSync",
  "opendirSync", // New
  "readdirSync",
  "readFileSync",
  "readlinkSync",
  "realpathSync",
  "renameSync",
  "rmdirSync",
  "rmSync", // New
  "statSync",
  "statfsSync", // New
  "symlinkSync",
  "truncateSync",
  "unlinkSync",
  "utimesSync",
  "writeFileSync",

  // Original async callback methods
  "access",
  "appendFile",
  "chmod",
  "chown",
  "copyFile", // New
  "cp", // New
  "createReadStream",
  "createWriteStream",
  "exists",
  "lchmod",
  "lchown",
  "lutimes", // New
  "link",
  "lstat",
  "mkdir",
  "mkdtemp",
  "open",
  "opendir", // New
  "openAsBlob", // New
  "readdir",
  "readFile",
  "readlink",
  "realpath",
  "rename",
  "rmdir",
  "rm", // New
  "stat",
  "statfs", // New
  "symlink",
  "truncate",
  "unlink",
  "unwatchFile",
  "utimes",
  "watch",
  "watchFile",
  "writeFile",
];

// Methods that operate on file descriptors and should be proxied
export const proxyableMethods: (keyof IFs)[] = [
  // Sync methods
  "ftruncateSync",
  "fchownSync",
  "fchmodSync",
  "fstatSync",
  "closeSync",
  "futimesSync",
  "fsyncSync",
  "writeSync",
  "readSync",
  "readvSync", // New
  "writevSync", // New
  "fdatasyncSync",

  // Async callback methods
  "ftruncate",
  "fchown",
  "fchmod",
  "fstat",
  "close",
  "futimes",
  "fsync",
  "write",
  "writev", // New
  "read",
  "readv", // New
  "fdatasync",
];

// Methods that require multiple arguments to be rewritten
export const multiArgMethods: Record<string, number[]> = {
  rename: [0, 1],
  renameSync: [0, 1],
  copyFile: [0, 1],
  copyFileSync: [0, 1],
  link: [0, 1],
  linkSync: [0, 1],
  symlink: [0, 1],
  symlinkSync: [0, 1],
  cp: [0, 1],
  cpSync: [0, 1],
};
