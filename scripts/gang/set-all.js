/** @param {NS} ns **/
export async function main(ns) {
  var names = ns.gang.getMemberNames()

  for (var i in names) {
    ns.gang.setMemberTask(names[i], ns.args[0]);
  }
}