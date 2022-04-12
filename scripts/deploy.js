export async function main(ns) {
  let files = ['attack.js', 'weaken.js', 'grow.js', 'hack.js']

  await ns.scp(files, ns.arg[0])
}