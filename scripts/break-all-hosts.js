/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL")

  var files = ns.ls("home", ".js")
  var hosts = getAllHosts(ns)
  for (var i in hosts) {
    breakHost(ns, hosts[i])
    await ns.scp(files, hosts[i])
  }
}

async function breakHost(ns, target) {
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
    ns.tprint(`nuked ${target}`)
  } catch {
    ns.tprint(`Couldn't nuke ${target}`)
  }
}

function getAllHosts(ns) {
  var hostList = ['home']

  while (true) {
    var startingLength = hostList.length
    hostList.forEach(function (value, index, array) {
      hostList = hostList.concat(ns.scan(value)).filter(onlyUnique)
    })
    if (hostList.length == startingLength) {
      break
    }
  }
  return hostList
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}