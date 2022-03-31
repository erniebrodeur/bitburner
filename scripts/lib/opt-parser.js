/** ripped up copy of boring.js, modified slightly to be a module and not
    touch argv directly **/
export default function optionParser(args) {
  let options = {};
  const result = {
    unparsed: []
  };
  let optionsEnded = false;
  for (let i = 0;
    (i < args.length); i++) {
    if (options.end && (args[i] === '--')) {
      optionsEnded = true;
      continue;
    }
    if (!optionsEnded) {
      let matches = args[i].match(/^--([^\s\=]+)=(.*)$/);
      if (matches) {
        result[matches[1]] = matches[2];
        continue;
      }
      matches = args[i].match(/^--(\S+)$/);
      if (matches) {
        result[matches[1]] = true;
        continue;
      }
    }
    result.unparsed.push(args[i]);
  }
  return result;
}