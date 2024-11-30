import type { IFs } from "memfs";
import * as nodePath from "node:path";
import {
  multiArgMethods,
  proxyableMethods,
  rewritableMethods,
  staticProps,
} from "./args";

export function link(fs: IFs, rewrites: string[] | string[][]): IFs {
  if (!(rewrites instanceof Array))
    throw TypeError("rewrites must be a list of 2-tuples");

  // If only one tuple is provided.
  if (typeof rewrites[0] === "string")
    rewrites = [rewrites] as any as [string, string][];

  const rews: [string, string][] = [];
  for (const [from, to] of rewrites as [string, string][]) {
    rews.push([nodePath.resolve(from), nodePath.resolve(to)]);
  }

  const realFs = fs as any;
  let lfs: any = {};

  // Attach some props.
  for (const prop of staticProps) lfs[prop] = realFs[prop];

  const rewritePath = (
    realFs: any,
    newFs: any,
    method: string,
    indicesToRewrite: number[] = [0],
  ) => {
    const func = realFs[method];
    if (typeof func !== "function") return;

    newFs[method] = (...args: any[]) => {
      indicesToRewrite.forEach((index) => {
        const path = args[index];

        // If first argument is not a path, just proxy the function.
        if (typeof path !== "string" && !Buffer.isBuffer(path)) {
          if (!require("url").URL || !(path instanceof require("url").URL))
            return func.apply(realFs, args);
        }

        // Rewrite the path argument.
        let filename = nodePath.resolve(String(path));
        for (const [from, to] of rews) {
          if (filename.startsWith(from)) {
            const rootRegex = /(?:^[a-zA-Z]:\\$)|(?:^\/$)/; // C:\ vs /
            const isRoot = from.match(rootRegex);
            const baseRegex = "^(" + from.replace(/\\/g, "\\\\") + ")";

            if (isRoot) {
              const regex = new RegExp(baseRegex);
              filename = filename.replace(regex, () => to + nodePath.sep);
            } else {
              const regex = new RegExp(baseRegex + "(\\\\|\/|$)");
              filename = filename.replace(regex, (match, p1, p2) => to + p2);
            }
          }
        }

        args[index] = filename;
      });
      return func.apply(realFs, args);
    };
  };

  for (const method of rewritableMethods) {
    rewritePath(realFs, lfs, method, multiArgMethods[method] ?? [0]);
  }

  if (realFs.promises) {
    lfs.promises = {};
    for (const method of rewritableMethods) {
      rewritePath(
        realFs.promises,
        lfs.promises,
        method,
        multiArgMethods[method] ?? [0],
      );
    }
  }

  // Just proxy the rest of the methods.
  for (const method of proxyableMethods) {
    const func = realFs[method];
    if (typeof func !== "function") continue;

    lfs[method] = func.bind(realFs);
  }

  return lfs;
}
