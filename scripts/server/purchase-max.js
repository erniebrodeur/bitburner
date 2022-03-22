export async function main(ns) {
  ns.tprintf(ns.getPurchasedServerCost(ns.args[0]).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }))
  ns.purchaseServer("a_server", ns.args[0])
}

export function autocomplete(data, args) {
  return ["32", "64", "128", "256", "512", "1024", "2048", "4096"]; // Autocomplete 3 specific strings.
}
