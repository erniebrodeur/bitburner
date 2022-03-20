/** @param {NS} ns **/
export async function main(ns) {
  // parse flags for
  // -m [max_thread_count]
  // -a, --all for all scanable hosts

  // [target]
  // for the main function we need to:
  // - profile server
  // - determine if we weaken, grow, or hack
  // - if getMinSecurity + buffer > threshold --> weaken
  // - elsif getMaxMoney > getCurrentMoney
  // - else hack
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

//getScriptRam(script, host)
//growthAnalyze(host, growthAmount, cores)	Calculate the number of grow thread needed to grow a server by a certain multiplier.
//growthAnalyzeSecurity(threads)	Calculate the security increase for a number of thread.
//hackAnalyze(host)	Get the part of money stolen with a single thread.
//hackAnalyzeChance(host)	Get the chance of successfully hacking a server.
//hackAnalyzeSecurity(threads)	Get the security increase for a number of thread.
//hackAnalyzeThreads(host, hackAmount)	Predict the effect of hack.
//weakenAnalyze(threads, cores)


/** @param {string} [host = getCurrentHost] gather info in one call, return an object **/
/** @return { object } details **/
function profileServer(host) {
  var return_object = { growth }

}