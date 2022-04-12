import * as Config from './lib/config'

export default { onlyUnique, deployAttackFiles }

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export async function deployAttackFiles(ns, target) {
  await ns.scp(Config.AttackFiles, target)
}
