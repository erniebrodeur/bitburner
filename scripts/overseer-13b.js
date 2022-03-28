let ns = null
let servers = null
const Threads = null
/*
  for this to work it needs to behave like a server.

  at start we need to
  - build a server map
  - start a thread manager
  - start a server manager
  - start a script manager
  at exit we need to
  - likely nothing

  we need to have a tick time, each tick we do:
  - track capacity

*/

import * as L from "library";

/** @param {NS} main_ns **/
export async function main(main_ns) {
}