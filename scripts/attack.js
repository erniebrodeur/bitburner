/** @param {NS} ns **/
export async function main(ns) {
  // parse flags for
  // -m [max_thread_count]
  // -a, --all for all scanable hosts

  // [target]
  // for the main function we need to:
  // - determine if we weaken, grow, or hack
  // - profile hack for all stats
  // - calculate max threads
  // - calculate one cycle of grow
  // - calculate one cycle of hack
  // - if the function is hack
  //   - don't use more than what you can get in one cycle of grow
  // - if the function is grow
  //   - don't use more than what you get for getMaxMoney()
  // - if the function is weaken
  //   - don't use more than what you get for getMinSecurity()
}
