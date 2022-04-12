/** @param {NS} ns **/
export async function main(ns) {
  if (!ns.args[0]) {

    let ramValues = getRamValues()
    for (let i in ramValues) {
      let ram = ramValues[i]
      ns.tprintf(`${ram} -> ${ns.getPurchasedServerCost(ram).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })}`)

    }
  } else {
    ns.purchaseServer("a-server", ns.args[0])
  }
}

export function getRamValues() {
  let output = []
  for (let i = 1; i <= 20; i++) {
    output.push(Math.pow(2, i))
  }
  return output
}


export function autocomplete(data, args) {
  let output = []
  for (let i = 1; i <= 20; i++) {
    output.push(Math.pow(2, i).toString())
  }

  return output
}
