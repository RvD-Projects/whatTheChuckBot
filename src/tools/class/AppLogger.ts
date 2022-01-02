const fs = require('fs')
const pino = require('pino')
//const pretty = require('pino-pretty')

// log.debug('this will be written to file of level debug')
// log.info('this will be written to file with levels debug,info')
// log.fatal('this will be written to with levels debug,info,warn,error,fatal')
export class AppLogger {

  id:string = "ffffffff"
  type: 'app' | 'client' | 'dev'
  lowestLevel:string = 'trace' // This MUST be set at the lowest level of the destinations
  multistream:boolean = true
  logger:typeof pino
  private logFolder:string = process.cwd() + '/logs'

  constructor(type: 'app'|'client'|'dev', id?:string,lowestLevel?:string, multistream?:boolean) {
    id? this.id = id: this.id
    type? this.type = type: this.type
    lowestLevel? this.lowestLevel = lowestLevel: this.lowestLevel
    multistream? this.multistream = multistream: this.multistream
    this.logFolder = `${this.logFolder}/${this.type}/${this.id}`;
    this.logger = this.innit();
  };

  private appendDestinations(destinations:Array<Object>, sync:boolean = false, waitMin:Number = 4096, pretty?:boolean){

    let dest:Object = {};
    const logLevels:Array<string> = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

    //pretty ? destinations.append({stream: pretty() }) : null
    const n = logLevels.indexOf(this.lowestLevel);
    for(let i = n; i < logLevels.length; i++) {
      dest = {
        level: logLevels[i],
        stream: fs.createWriteStream(`${this.logFolder}/${(i+1)*10}-${logLevels[i]}.out`, {flags: 'a+'}), 
        sync: sync, 
        minLength: waitMin
      };
      destinations.push(dest)
    }
  }

  private innit():typeof pino {

    var logger:typeof pino

    if(this.multistream){
      fs.mkdirSync(this.logFolder, { recursive: true,   })
      let dests:Array<Object> = []
      this.appendDestinations(dests)

      logger = pino({
        level: this.lowestLevel
      }, pino.multistream(dests))
    }
    else {
      fs.mkdirSync(this.logFolder, { recursive: true })
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