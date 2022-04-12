import optionParser from './lib/opt-parser'
import * as Utils from "./lib/utils"

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL")
  let options = optionParser(ns.args)

  let hosts = getAllHosts(ns).filter(function (value) {
    return (value != "home" && (options["with-hack-net"] || !value.startsWith("hacknet")))
  })
  let hackingTarget = getTarget(ns, options)

  for (let i in hosts) {
    let target = hosts[i]
    let server = ns.getServer(target)
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
    await Utils.deployAttackFiles(ns, target)

    ns.killall(target)
    ns.tprintf(`  attacking ${hackingTarget}`)
    ns.exec('attack.js', target, 1, hackingTarget)
  }
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}

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
  let hostList = ['home']

  while (true) {
    let startingLength = hostList.length
    hostList.forEach(function (value) {
      hostList = hostList.concat(ns.scan(value)).filter(Utils.onlyUnique)
    })
    if (hostList.length == startingLength) {
      break
    }
  }
  return hostList
}

function getTarget(ns, options) {
  let target = "n00dles"

  if (options.unparsed) {
    target = options.unparsed.join(" ")
  }
  return target
}