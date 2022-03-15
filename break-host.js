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

  ns.nuke(target);
}