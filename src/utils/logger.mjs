import winston from "winston";

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({level, message, service}) => {
      return `${level}: ${message} --- ${service}`;
    })
  ),
  defaultMeta: { service: 'bookmark-app-' + (process.env.POD_NAME ?? "UNKNOWN-POD") },
  transports: [
    new winston.transports.Console()
  ],
});

export default logger;