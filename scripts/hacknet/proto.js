import optionParser from './lib/opt-parser'

/** @param {NS} ns **/
export async function main(ns) {
  let options = optionParser(ns.args)
  let reservePercentage = 0.1

  if (options["no-reserves"] == true) {
    reservePercentage = 1.0
  }

  while (true) {
    if (ns.hacknet.numHashes() > (ns.hacknet.hashCapacity() - ns.hacknet.hashCapacity() * reservePercentage)) {
      ns.hacknet.spendHashes('Sell for Money')
    }
    await ns.sleep(50)
  }
}
