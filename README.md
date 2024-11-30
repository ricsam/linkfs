# linkfs

> **NOTE:** This project is an updated fork of [linkfs](https://github.com/streamich/linkfs) with bug fixes and updates. The original version has not been updated in many years and have a some unresolved issues that are addressed in this fork.

Redirects filesystem paths.

[![][npm-img]][npm-url]

```bash
npm install --save @ricsam/linkfs
```

```js
import { link } from "linkfs";
import { fs } from "memfs";

fs.writeFileSync("/foo", "bar");
const lfs = link(fs, ["/foo2", "/foo"]);
console.log(lfs.readFileSync("/foo2", "utf8")); // bar
```

# Reference

### `link(fs, rewrites)`

Returns a new _fs-like_ object with redirected file paths.

`fs` is the source _fs-like_ object.

`rewrites` is a 2-tuple or an array of 2-tuples, where each 2-tuple
has a form of `[from, to]`. `from` is the new, _virtual_ path; and `to`
is an existing path in the `fs` filesystem.

```js
const lfs = link(fs, ["/foo", "/bar"]);
```

or

```js
const lfs = link(fs, [
  ["/foo1", "/bar1"],
  ["/foo2", "/bar2"],
  ["/foo3", "/bar3"],
]);
```

[npm-url]: https://www.npmjs.com/package/@ricsam/linkfs
[npm-img]: https://img.shields.io/npm/v/@ricsam/linkfs.svg
[memfs]: https://github.com/streamich/memfs
[unionfs]: https://github.com/streamich/unionfs
[linkfs]: https://github.com/streamich/linkfs
[fs-monkey]: https://github.com/streamich/fs-monkey

# License

[Unlicense](./LICENSE) - public domain.
