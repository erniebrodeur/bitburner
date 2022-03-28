export function toDollar(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}


export function getAllServers(ns) {
  var hostList = getAllHostnames(ns)
  var output = []
  for (var i in hostList) {
    output.push(ns.getServer(hostList[i]))
  }

  return output
}

export function getAllHostnames(ns) {
  var hostList = ['home']

  while (true) {
    var startingLength = hostList.length
    hostList.forEach(function (value) {
      hostList = hostList.concat(ns.scan(value)).filter(onlyUnique)
    })
    if (hostList.length == startingLength) {
      break
    }
  }
  return hostList
}
// async function breakHostPorts(ns, server) {
//   if (!server.sshPortOpen && ns.fileExists("BruteSSH.exe", "home")) {
//     ns.tprintf(`  opening SSH port`)
//     ns.brutessh(server.hostname);
//   }

//   if (!server.ftpPortOpen && ns.fileExists("FTPCrack.exe", "home")) {
//     ns.tprintf(`  opening FTP port`)
//     ns.ftpcrack(server.hostname);
//   }

//   if (!server.smtpPortOpen && ns.fileExists("relaySMTP.exe", "home")) {
//     ns.tprintf(`  opening SMTP port`)
//     ns.relaysmtp(server.hostname);
//   }

//   if (!server.httpPortOpen && ns.fileExists("HTTPworm.exe", "home")) {
//     ns.tprintf(`  opening HTTP port`)
//     ns.httpworm(server.hostname);
//   }

//   if (!server.sqlPortOpen && ns.fileExists("SQLInject.exe", "home")) {
//     ns.tprintf(`  opening SQL port`)
//     ns.sqlinject(server.hostname);
//   }
// }

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function notHome(value) {
  return (value != "home")
}
