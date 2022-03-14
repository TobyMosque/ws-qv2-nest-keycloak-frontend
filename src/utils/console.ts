export function log (...args: unknown[]) {
  if (process.env.DEV) {
    console.log.apply(console.log, args)
  }
}

export function info (...args: unknown[]) {
  if (process.env.DEV) {
    console.info.apply(console.info, args)
  }
}

export function warn (...args: unknown[]) {
  if (process.env.DEV) {
    console.warn.apply(console.warn, args)
  }
}

export function error (...args: unknown[]) {
  if (process.env.DEV) {
    console.error.apply(console.error, args)
  }
}

export function discard (...args: unknown[]) {
  return args;
}