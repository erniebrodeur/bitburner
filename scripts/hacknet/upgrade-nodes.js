import optionParser from './lib/opt-parser'
import * as Config from './lib/config'

/** @param {NS} main_ns **/
export async function main(ns) {
  while (true) {
    // ns.tprintf(`${JSON.stringify(findTargetByArray(ns))}`)
    purchaseUpgrade(ns, findTarget(ns))
    await ns.sleep(10)
  }
}

function leastProducingNode(ns, nodeList) {
  // next lets determine our target
  let sortedList = nodeList.sort(function (a, b) {
    return a.production - b.production
  })

  return sortedList[0]
}

// slightly less shitty way to find target.
function findTargetByArray(ns) {
  let nodeList = buildNodeList(ns)
  let target = leastProducingNode(ns, nodeList)

  target.upgrade = 'level'
  target.index = target.name.match(/^.*-(\d+)$/)[1]

  // for (let levels of Config.UpgradeLevels) {
  //   if (target.level == levels[0]) {
  //     if (target.ram <= levels[1]) {
  //       target.upgrade = 'ram'
  //     }

  //     if (target.core <= levels[2]) {
  //       target.upgrade = 'core'
  //     }
  //   }
  // }
  // ns.tprintf(JSON.stringify(target))
  return target
}

// simple (shitty) method to find the lowest producing -> cheapest upgrade.
function findTarget(ns) {
  let nodeList = buildNodeList(ns)

  // next lets determine our target
  let sortedList = nodeList.sort(function (a, b) {
    return a.production - b.production
  })
  let target = sortedList[0]

  // what we want to upgrade
  let sortedUpgrades = Object.entries(target.upgradeCosts).sort(function (a, b) {
    return a[1] - b[1]
  })

  target.upgrade = sortedUpgrades[0][0]
  target.index = target.name.match(/^.*-(\d+)$/)[1]

  return target
}

function buildNodeList(ns) {
  let numberOfNodes = ns.hacknet.numNodes()
  let nodeList = []

  // we need to know the upgrade costs of everything, lets get all the nodes
  // and add it as we go
  for (let i = 0; i < numberOfNodes; i++) {
    nodeList.push(ns.hacknet.getNodeStats(i))
    nodeList[i].upgradeCosts = {
      level: ns.hacknet.getLevelUpgradeCost(i, 1),
      ram: ns.hacknet.getRamUpgradeCost(i, 1),
      core: ns.hacknet.getCoreUpgradeCost(i, 1)
    }
  }
  return nodeList
}

function purchaseUpgrade(ns, target) {
  let player = ns.getPlayer()
  let reserveAmount = 0.0
  let productionPerSecond = 0.0

  reserveAmount = productionPerSecond * 75
  for (let node of buildNodeList(ns)) {
    productionPerSecond += node.production
  }

  switch (target.upgrade) {
    case 'level':
      ns.hacknet.upgradeLevel(target.index)
      break
    case 'ram':
      ns.hacknet.upgradeRam(target.index)
      break
    case 'core':
      ns.hacknet.upgradeCore(target.index)
      break
  }
}