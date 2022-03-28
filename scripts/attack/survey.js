import * as L from "library";

/** @param {NS} main_ns **/
export async function main(ns) {
  var servers = L.getAllServers(ns)
  ns.disableLog("ALL")

  for (var i in servers) {
    updateServer(ns, servers[i])
  }

  var sorted_servers = servers.sort(function (a, b) { return a.moneyMax - b.moneyMax })
  for (var i in sorted_servers) {
    tprintfServerInfo(ns, sorted_servers[i])
  }

  ns.tprintf(JSON.stringify(servers[30]))
  // ns.tprintf(`${servers.map(function (value) { return value.hostname })}`)
}

function updateServer(ns, server) {
  server.growTime = ns.getGrowTime(server.hostname)
  server.hackTime = ns.getHackTime(server.hostname)
  server.weakenTime = ns.getWeakenTime(server.hostname)
}

function tprintfServerInfo(ns, server) {
  ns.tprintf(`--- ${server.hostname} (${server.requiredHackingSkill}) (${server.minDifficulty}): ${ns.nFormat(server.moneyAvailable, '10.0a')} / ${ns.nFormat(server.moneyMax, '10.0a')}`)
  ns.tprintf(`---   grow time: ${ns.nFormat(server.growTime / 1000.0, '00:00:00')} hack time: ${ns.nFormat(server.hackTime / 1000.0, '00:00:00')} weaken time: ${ns.nFormat(server.weakenTime / 1000.0, '00:00:00')}`)
}

export function autocomplete(data, args) {
  return [...data.servers];
}