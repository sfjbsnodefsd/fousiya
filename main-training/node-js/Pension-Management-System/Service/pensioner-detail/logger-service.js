const {  createLogger, format, transports } = require('winston')

class LoggerService {
    
    appFormat = format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.metadata({fillExcept:['timestamp','level']}),
        format.json())

    logger = createLogger({       
        format: this.appFormat,
        transports: [new transports.Console()]
    });

    error = (obj) => {
        let errorObject = obj;
        if(typeof obj === 'object' && obj !== null)
        errorObject = Object.create(obj)
       
        this.logger.warn(errorObject);
    }

    info = (obj) => {
        let infoObject = obj;
        if(typeof obj === 'object' && obj !== null)
            infoObject = Object.create(obj)
       
        this.logger.info(infoObject);
    }

    warn = (obj) => {
        let warnObject = obj;
        if(typeof obj === 'object' && obj !== null)
        warnObject = Object.create(obj)
       
        this.logger.warn(warnObject);
    }
}

module.exports = { LoggerService} 