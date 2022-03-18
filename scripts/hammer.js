/** @param {NS} ns **/
export async function main(ns) {
  var target = ns.args[0];
  var threads = ns.args[1];

  var securityThresh = ns.getServerMinSecurityLevel(target);
  var currentSecurityLevel = ns.getServerSecurityLevel(target)

  while (currentSecurityLevel > securityThresh) {
    var weaken_time = ns.getWeakenTime(target)

    ns.print("thresh = ", securityThresh)
    ns.print("current = ", currentSecurityLevel)
    ns.exec("weaken.js", "home", threads, target)

    await ns.sleep(weaken_time + 1000)

    currentSecurityLevel = ns.getServerSecurityLevel(target)
  }

  ns.toast("Super weaken is done.", "success")
}