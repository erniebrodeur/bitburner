/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL")
  ns.print(getAllHosts(ns))
}

function getAllHosts(ns) {
  var hostList = ['home']

  while (true) {
    var startingLength = hostList.length
    hostList.forEach(function (value, index, array) {
      hostList = hostList.concat(ns.scan(value)).filter(onlyUnique)
    })
    if (hostList.length == startingLength) {
      break
    }
  }
  return hostList
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}