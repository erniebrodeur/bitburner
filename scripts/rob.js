/** @param {NS} ns **/
export async function main(ns) {
  var target = ns.args[0];

  while (true) {
    var hack_time = ns.getHackTime(target)

    ns.exec("hack.js", ns.getHostname(), ns.args[1], target)
    await ns.sleep(hack_time)
  }

  ns.toast("Super hack is done.", "success")
}