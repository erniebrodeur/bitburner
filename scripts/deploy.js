export async function main(ns) {
  await ns.scp(ns.ls("home", ".js"), ns.args[0])
}