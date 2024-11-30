import { link } from "../src";
import { createFsFromVolume, Volume } from "memfs";

const vol = Volume.fromJSON({ "/foo": "bar" });
const linkfs = link(createFsFromVolume(vol), [["/foo2", "/foo"]]);
console.log(linkfs.readFileSync("/foo2", "utf8"));
