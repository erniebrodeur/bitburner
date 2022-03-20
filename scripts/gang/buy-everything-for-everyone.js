/** @param {NS} ns **/
export async function main(ns) {
  var names = ns.gang.getMemberNames()
  var equipment = ns.gang.getEquipmentNames()
  while (true) {
    for (var i in names) {
      for (var i in names) {
        for (var j in equipment) {
          ns.gang.purchaseEquipment(names[i], equipment[j])
        }
      }
    }
    await ns.sleep(1000) // 1 second
  }

}