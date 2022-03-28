import * as Job from 'job'

let tickLength = 1000
let enabled = false
let ns = null // so I don't have to pass it around all the time

/** @param {NS} ns **/
export async function main(main_ns) {
  atStart(main_ns)

  while (true) {
    if (enabled == true) {
      tick()
    }
    await ns.sleep(tickLength)
  }
}

export function tick() {

}

export function atStart(main_ns) {
  ns = main_ns
  ns.disableLog('ALL')
}

export function atExit() {
}
