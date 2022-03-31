/** @param {NS} ns **/
export async function main(ns) {
  ns.tprintf(`${ns.hacknet.spendHashes(ns.args.join(" "))}`)
}
export function autocomplete(data, args) {
  return ["Sell for Money", "Sell for Corporation Funds", "Reduce Minimum Security", "Increase Maximum Money", "Improve Studying", "Improve Gym Training", "Exchange for Corporation Research", "Exchange for Bladeburner Rank", "Exchange for Bladeburner SP", "Generate Coding Contract"]
}