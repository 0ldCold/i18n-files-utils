#!/usr/bin/env node
import { run } from "./runFile";

try {
  run();
} catch (e) {
  console.log(e);
}
