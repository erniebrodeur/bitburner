/** @param {NS} ns **/
export async function main(ns) {
  var names = ns.gang.getMemberNames()

  for (var i in names) {
    ns.gang.setMemberTask(names[i], ns.args.join(" "))
  }
}

export function autocomplete(data, args) {
  return ["Mug People", "Deal Drugs", "Strongarm Civilians", "Run a Con", "Armed Robbery", "Traffick Illegal Arms", "Threaten & Blackmail", "Human Trafficking", "Terrorism", "Vigilante Justice", "Train Combat", "Train Hacking", "Train Charisma", "Territory Warfare"];
}
