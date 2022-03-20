/** @param {NS} ns **/
export async function main(ns) {
  var names = ns.gang.getMemberNames()

  while (true) {
    for (var i in names) {
      ns.gang.ascendMember(names[i])
    }
    await ns.sleep(60000 * 10) // 10 minutes
  }
}