import log4js from 'log4js';
import Conf from '../config/server';

const LOG_PATH = Conf.logPath;
const LOG_CAT = Conf.logCat;
const URGENT_LOG = Conf.urgentFlag;

log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: {
      type: 'dateFile',
      filename: LOG_PATH,
      maxLogSize: 20480,
      backups: 10,
    },
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'DEBUG' },
  },
});

export default log4js.getLogger(LOG_CAT);

/**
 * 生成 json 字符串格式的日志
 * @param {string|boolean|number|array|object} msg
 */
export function jsonMsg(msg) {
  return JSON.stringify(typeof msg === 'object' ? msg : { msg });
}

/**
 * 报警消息
 *
 * @param {string} msg 报警消息
 */
export function urgentMsg(msg) {
  return jsonMsg(`${URGENT_LOG} ${msg}`);
}

/**
 * 请求处理异常
 */
export function reqHandleErr(err, req, desc, urgent) {
  const msg = {
    desc,
    path: req.path,
    url: req.originalUrl,
    msg: err.message,
    stack: err.stack,
  };

  if (urgent) {
    msg.urgent = URGENT_LOG;
  }

  return JSON.stringify(msg);
}
