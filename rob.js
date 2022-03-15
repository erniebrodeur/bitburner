/** @param {NS} ns **/
export async function main(ns) {
  var target = ns.args[0];

  while (true) {
    var hack_time = ns.getHackTime(target)

    ns.exec("hack.js", "home", 10, target)
    await ns.sleep(hack_time + 1000)
  }

  ns.toast("Super hack is done.", "success")
}