/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL")

  var files = ns.ls("home", ".js")
  var hosts = getAllHosts(ns)
  for (var i in hosts) {
    var target = hosts[i]

    if (target == 'home') { continue }

    if (ns.getServerMaxRam(target) < 8) {
      ns.tprint(`${target} doesn't have enough ram, skipping`)
      continue
    }

    try {
      breakHost(ns, target)
      await ns.scp(files, target)

      ns.killall(target)
      ns.tprint(`attacking from ${target}`)
      ns.exec('attack.js', target)
      ns.nuke(target);
      ns.tprint(`nuked ${target}`)
    } catch {
      ns.tprint(`Couldn't nuke ${target}`)
    }
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