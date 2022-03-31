/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    if (ns.hacknet.numHashes() > (ns.hacknet.hashCapacity() - ns.hacknet.hashCapacity() * 0.1)) {
      ns.hacknet.spendHashes('Sell for Money')
    }
    await ns.sleep(50)
  }
}
