const Jobs = {
  gangSetAll: {
    async run(args) {
      var names = ns.gang.getMemberNames()

      for (var i in names) {
        ns.gang.setMemberTask(names[i], args);
      }
    }
  }
}

export class Job {
  name = "job name"

  async run(args) {

  }
}