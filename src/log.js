import chalk from 'chalk';

const log = console.log;

const error   = chalk.red.bold;
const success = chalk.green.bold;
const warn    = chalk.yellow.bold;


export function logError(msg, opts) {
  if (!opts.silent && !opts.successOnly)
    log(error(msg));
}
export function logSuccess(msg, opts) {
  if (!opts.silent) log(success(msg));
}

export function logWarn(msg, opts) {
  if (!opts.silent && !opts.successOnly)
    log(warn(msg));
}
