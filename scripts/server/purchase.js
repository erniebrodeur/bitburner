/** @param {NS} ns **/
export async function main(ns) {
  if (!ns.args[0]) {

    var ramValues = getRamValues()
    for (var i in ramValues) {
      var ram = ramValues[i]
      ns.tprintf(`${ram} -> ${ns.getPurchasedServerCost(ram).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })}`)

    }
  } else {
    ns.purchaseServer("a_server", ns.args[0])
  }
}

export function getRamValues() {
  var output = []
  for (var i = 1; i <= 20; i++) {
    output.push(Math.pow(2, i))
  }
  return output
}