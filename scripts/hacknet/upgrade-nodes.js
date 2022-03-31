/** @param {NS} ns **/
export async function main(ns) {

  let upgradeCoresAt = [10, 12, 13, 14, 18, 22, 24]



  while (true) {
    await ns.sleep(10)
    let nodeList = []
    buildNodeList(ns, nodeList)

    // next lets determine our target
    let sortedList = nodeList.sort(function (a, b) {
      return a.production - b.production
    })
    let target = sortedList[0]

    // this ugly ass kludge is to find the cheapest upgrade cost
    // on the target node.
    let sortedUpgrades = Object.entries(target.upgradeCosts).sort(function (a, b) {
      return a[1] - b[1]
    })

    let targetUpgrade = sortedUpgrades[0][0]

    // and now . . . indexes.
    let targetIndex = target.name[target.name.length - 1]

    // and this lovely shit is because the ns.hacknet api isn't consistent.
    switch (targetUpgrade) {
      case 'level':
        ns.hacknet.upgradeLevel(targetIndex)
        break
      case 'ram':
        ns.hacknet.upgradeRam(targetIndex)
        break
      case 'core':
        ns.hacknet.upgradeCore(targetIndex)
        break
    }
  }
}

function buildNodeList(ns, nodeList) {
  let numberOfNodes = ns.hacknet.numNodes()

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
}