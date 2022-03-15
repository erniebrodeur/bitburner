/** @param {NS} ns **/
export async function main(ns) {
  var target = ns.args[0];
  var threads = ns.args[1];
  var currentHost = ns.getHostname()
  var securityThresh = ns.getServerMinSecurityLevel(target) + 1;
  var currentSecurityLevel = ns.getServerSecurityLevel(target)
  var moneyThresh = ns.getServerMaxMoney(target) * 0.9;

  while (true) {
    currentSecurityLevel = ns.getServerSecurityLevel(target)

    if (currentSecurityLevel > securityThresh) {
      var weaken_time = ns.getWeakenTime(target)
      ns.exec("weaken.js", currentHost, threads, target)

      await ns.sleep(weaken_time + 1000)

    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      var grow_time = ns.getGrowTime(target)
      ns.exec("grow.js", currentHost, threads, target)

      await ns.sleep(grow_time + 1000)
    } else {
      var hack_time = ns.getHackTime(target)

      ns.exec("hack.js", currentHost, threads, target)
      await ns.sleep(hack_time + 1000)
    }
  }
}
