export const logger = {
  isProduction: false,
  setProductionMode(isProduction: boolean) {
    this.isProduction = isProduction;
  },
  info(...messages: any[]) {
    console.info('[DevHelper][INFO]', ...messages);
  },
  error(...messages: any[]) {
    console.error('[DevHelper][ERROR]', ...messages);
  },
  warn(...messages: any[]) {
    console.warn('[DevHelper][WARN]', ...messages);
  },
  log(...messages: any[]) {
    if (this.isProduction) {
      return;
    }
    console.log('[DevHelper][LOG]', ...messages);
  },
  debug(...messages: any[]) {
    if (this.isProduction) {
      return;
    }
    console.debug('[DevHelper][DEBUG]', ...messages);
  },
  verbose(...messages: any[]) {
    if (this.isProduction) {
      return;
    }
    console.log('[DevHelper][VERBOSE]', ...messages);
  },
};
