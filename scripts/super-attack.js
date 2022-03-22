/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL")

  // var files = ns.ls("home", ".js")
  var files = ['attack.js', 'weaken.js', 'grow.js', 'hack.js']
  var hosts = getAllHosts(ns).filter(notHome)
  var hackingTarget = getTarget(ns)

  for (var i in hosts) {
    var target = hosts[i]
    var server = ns.getServer(target)
    ns.tprintf(`# ${server.hostname}`)
    if (server.hasAdminRights == false) {
      ns.tprintf(`  does not have root, attempting to break.`)

      await breakHostPorts(ns, server)
      server = ns.getServer(server.hostname)

      if (server.openPortCount >= server.numOpenPortsRequired) {
        ns.nuke(server.hostname)
        ns.tprintf(`  nuked`)
      } else {
        ns.tprintf(`  not enough ports open, skipping`)
        continue
      }
    }

    if (server.maxRam < 8) {
      ns.tprintf(`  doesn't have enough ram to run scripts, skipping`)
      continue
    }

    await ns.scp(files, target)
    ns.killall(target)
    ns.tprintf(`  attacking ${hackingTarget}`)
    ns.exec('attack.js', target, 1, hackingTarget)
  }
}


export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}

// function toDollar() {
//   return self.toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD"
//   });
// }

async function breakHostPorts(ns, server) {
  if (!server.sshPortOpen && ns.fileExists("BruteSSH.exe", "home")) {
    ns.tprintf(`  opening SSH port`)
    ns.brutessh(server.hostname);
  }

  if (!server.ftpPortOpen && ns.fileExists("FTPCrack.exe", "home")) {
    ns.tprintf(`  opening FTP port`)
    ns.ftpcrack(server.hostname);
  }

  if (!server.smtpPortOpen && ns.fileExists("relaySMTP.exe", "home")) {
    ns.tprintf(`  opening SMTP port`)
    ns.relaysmtp(server.hostname);
  }

  if (!server.httpPortOpen && ns.fileExists("HTTPworm.exe", "home")) {
    ns.tprintf(`  opening HTTP port`)
    ns.httpworm(server.hostname);
  }

  if (!server.sqlPortOpen && ns.fileExists("SQLInject.exe", "home")) {
    ns.tprintf(`  opening SQL port`)
    ns.sqlinject(server.hostname);
  }
}

function getAllHosts(ns) {
  var hostList = ['home']

  while (true) {
    var startingLength = hostList.length
    hostList.forEach(function (value) {
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

function notHome(value) {
  return (value != "home")
}

function getTarget(ns) {
  var target = "n00dles"
  if (ns.args[0]) {
    target = ns.args[0]
  }
  return target
}
