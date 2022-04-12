import * as Utils from "./lib/utils"

/** @param {NS} main_ns **/
export async function main(ns) {
  ns.disableLog("ALL")
  var servers = getAllServers(ns)

  for (var i in servers) {
    updateServer(ns, servers[i])
  }

  var sorted_servers = servers.sort(function (a, b) { return a.moneyMax - b.moneyMax })
  for (var i in sorted_servers) {
    tprintfServerInfo(ns, sorted_servers[i])
  }
}

function updateServer(ns, server) {
  server.growTime = ns.getGrowTime(server.hostname)
  server.hackTime = ns.getHackTime(server.hostname)
  server.weakenTime = ns.getWeakenTime(server.hostname)
}

function tprintfServerInfo(ns, server) {
  ns.tprintf(`--- ${server.hostname} (${server.requiredHackingSkill}) (${server.minDifficulty}): ${ns.nFormat(server.moneyAvailable, '0.0a')} / ${ns.nFormat(server.moneyMax, '0.0a')}`)
  ns.tprintf(`---   grow time: ${ns.nFormat(server.growTime / 1000.0, '00:00')} hack time: ${ns.nFormat(server.hackTime / 1000.0, '00:00')} weaken time: ${ns.nFormat(server.weakenTime / 1000.0, '00:00')}`)
}

export function autocomplete(data, args) {
  return [...data.servers];
}
export function getAllServers(ns) {
  var hostList = getAllHostnames(ns)
  var output = []
  for (var i in hostList) {
    output.push(ns.getServer(hostList[i]))
  }

  return output
}

export function getAllHostnames(ns) {
  var hostList = ['home']

  while (true) {
    var startingLength = hostList.length
    hostList.forEach(function (value) {
      hostList = hostList.concat(ns.scan(value)).filter(Utils.onlyUnique)
    })
    if (hostList.length == startingLength) {
      break
    }
  }
  return hostList
}
