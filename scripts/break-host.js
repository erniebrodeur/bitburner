export async function main(ns) {
  var target = ns.args[0];

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
  }

  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
  }

  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
  }

  if (ns.fileExists("HTTPworm.exe", "home")) {
    ns.httpworm(target);
  }

  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
  }
  try {
    ns.nuke(target);
  } catch {
    ns.print(`Couldn't nuke ${target}`)
  }
  ns.exec('deploy.js', 'home', 1, target)
}