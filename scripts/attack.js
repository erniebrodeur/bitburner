/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL")

  var target = ns.args[0];
  if (!target) {
    target = "n00dles"
  }
  var currentHost = ns.getHostname()
  var securityThresh = ns.getServerMinSecurityLevel(target) + 1;
  var currentSecurityLevel = ns.getServerSecurityLevel(target)
  var moneyThresh = ns.getServerMaxMoney(target) * 0.9;
  var iteration = 0

  // getScriptExpGain(script, host, args)	Get the exp gain of a script.
  // getScriptIncome(script, host, args)	Get the income of a script.

  while (true) {
    currentSecurityLevel = ns.getServerSecurityLevel(target)
    ns.print("---------------------------------")
    ns.print(`--- current iteration: ${iteration}`)
    ns.print(`--- current security level: ${currentSecurityLevel.toFixed(2)}`)
    ns.print(`--- current money: ${ns.nFormat(ns.getServerMoneyAvailable(target), '$0.00a')} of ${ns.nFormat(ns.getServerMaxMoney(target), '$0.00a')}`)


    if (currentSecurityLevel > securityThresh) {
      await ns.sleep(callScript(ns, "weaken.js", currentHost, target, ns.getWeakenTime(target) + 100))
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.sleep(callScript(ns, "grow.js", currentHost, target, ns.getGrowTime(target) + 100))
    } else {
      await ns.sleep(callScript(ns, "hack.js", currentHost, target, ns.getHackTime(target) + 100))
    }

    iteration = iteration + 1
  }
}

function callScript(ns, script, host, target, time) {
  var ramCost = ns.getScriptRam(script, host)
  var maxRam = ns.getServerMaxRam(host)
  var usedRam = ns.getServerUsedRam(host)
  var freeRam = maxRam - usedRam
  var threadCount = Math.floor(freeRam / ramCost)

  if (threadCount == 0) {
    ns.print(`--- current script: ${script} not enough RAM for even a single thread.`)
    return time
  }
  ns.print(`--- current script: ${script}, runtime: ${ns.nFormat(time / 1000, '0:00:00')}, thread count: ${threadCount}`)
  ns.exec(script, host, threadCount, target)

  return time
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
