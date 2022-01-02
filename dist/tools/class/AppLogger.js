"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const fs = require('fs');
const pino = require('pino');
//const pretty = require('pino-pretty')
// log.debug('this will be written to file of level debug')
// log.info('this will be written to file with levels debug,info')
// log.fatal('this will be written to with levels debug,info,warn,error,fatal')
class AppLogger {
    id = "ffffffff";
    type;
    lowestLevel = 'trace'; // This MUST be set at the lowest level of the destinations
    multistream = true;
    logger;
    logFolder = process.cwd() + '/logs';
    constructor(type, id, lowestLevel, multistream) {
        id ? this.id = id : this.id;
        type ? this.type = type : this.type;
        lowestLevel ? this.lowestLevel = lowestLevel : this.lowestLevel;
        multistream ? this.multistream = multistream : this.multistream;
        this.logFolder = `${this.logFolder}/${this.type}/${this.id}`;
        this.logger = this.innit();
    }
    ;
    appendDestinations(destinations, sync = false, waitMin = 4096, pretty) {
        let dest = {};
        const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
        //pretty ? destinations.append({stream: pretty() }) : null
        const n = logLevels.indexOf(this.lowestLevel);
        for (let i = n; i < logLevels.length; i++) {
            dest = {
                level: logLevels[i],
                stream: fs.createWriteStream(`${this.logFolder}/${(i + 1) * 10}-${logLevels[i]}.out`, { flags: 'a+' }),
                sync: sync,
                minLength: waitMin
            };
            destinations.push(dest);
        }
    }
    innit() {
        var logger;
        if (this.multistream) {
            fs.mkdirSync(this.logFolder, { recursive: true, });
            let dests = [];
            this.appendDestinations(dests);
            logger = pino({
                level: this.lowestLevel
            }, pino.multistream(dests));
        }
        else {
            fs.mkdirSync(this.logFolder, { recursive: true });
            const transport = pino.transport({
                target: 'pino/file',
                options: { destination: `${this.logFolder}/${this.lowestLevel}-filteredUp.out` },
            });
            logger = pino(transport);
        }
        const _logger = logger;
        return _logger;
    }
}
exports.AppLogger = AppLogger;
