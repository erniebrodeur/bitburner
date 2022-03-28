/** @param {NS} ns **/
export async function main(ns) {
  var names = ns.gang.getMemberNames()
  var tasks = ['Train Combat', 'Train Charisma', 'Train Hacking']
  var taskTime = 600000
    // for (var i in names) {
    //   ns.gang.ascendMember(names[i])
    // }

  while (true) {
    for (var task in tasks) {
      for (var i in names) {
        ns.gang.setMemberTask(names[i], tasks[task]);
      }
      await ns.sleep(taskTime)
    }

    for (var i in names) {
      ns.gang.ascendMember(names[i])
    }
  }
}