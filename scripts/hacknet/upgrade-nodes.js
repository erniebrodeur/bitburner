/** @param {NS} ns **/
export async function main(ns) {
  let numberOfNodes = ns.hacknet.numNodes()
  let nodeList = []
  let upgradeCoresAt = [10, 12, 13, 14, 18, 22, 24]
  for (let i = 0; i < numberOfNodes; i++) {
    nodeList.push(ns.hacknet.getNodeStats(i))
    nodeList[i].upgradeCosts = {
      level: ns.hacknet.getLevelUpgradeCost(i, 1),
      ram: ns.hacknet.getRamUpgradeCost(i, 1),
      core: ns.hacknet.getCoreUpgradeCost(i, 1)
    }
  }

  let sortedList = nodeList.sort(function (a, b) { return a.production - b.production })
  let target = sortedList[0]

  // let targetUpgrade = target.upgradeCosts.sort(function(a,b) { return a.})

}

// for each hacknet node

let g = {
  "name": "hacknet-node-0",
  "level": 56,
  "ram": 256,
  "ramUsed": 0,
  "cores": 14,
  "production": 1.1625920645533516,
  "timeOnline": 10529.800000003244,
  "totalProduction": 5736.375573379975,
  "cache": 4,
  "hashCapacity": 512
}