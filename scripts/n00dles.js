/** @param {NS} ns **/
export async function main(ns) {
  var target = "n00dles"
  var threads = ns.args[1];
  var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  var currentSecurityLevel = ns.getServerSecurityLevel(target)
  var moneyThresh = ns.getServerMaxMoney(target) * 0.5;

  while (true) {
    if (currentSecurityLevel > securityThresh) {
      var weaken_time = ns.getWeakenTime(target)
      ns.exec("weaken.js", "home", threads, target)

      await ns.sleep(weaken_time + 1000)

      currentSecurityLevel = ns.getServerSecurityLevel(target)
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      var grow_time = ns.getGrowTime(target)
      ns.exec("grow.js", "home", threads, target)

      await ns.sleep(grow_time + 1000)
    } else {
      var hack_time = ns.getHackTime(target)

      ns.exec("hack.js", "home", threads, target)
      await ns.sleep(hack_time + 1000)
    }
  }
}
