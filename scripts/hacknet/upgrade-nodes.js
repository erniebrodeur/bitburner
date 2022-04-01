import optionParser from './lib/opt-parser'

/** @param {NS} main_ns **/
export async function main(ns) {
  let upgradeCoresAt = [10, 12, 13, 14, 18, 22, 24]

  while (true) {
    purchaseUpgrade(ns, findTarget(ns))
    await ns.sleep(10)
  }
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