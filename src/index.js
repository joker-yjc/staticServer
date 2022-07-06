const { program } = require('commander');
const package = require('../package.json')
const Server = require('../app')

program.option("-p --port [port]", "设置指定的端口号", "9527")
  .option("-d --dest [path]", "设置指定的文件目录为root文件夹", process.cwd())
  .option("-h --host [hostname]", "设置host", "127.0.0.1")
  .version(package.version)
  .action((options, command) => {
    console.log(options)
    let option = {}
    if (options.port) {
      option.port = options.port
    }
    if (options.dest) {
      option.rootDir = options.dest
    }
    if (options.host) {
      option.host = options.host
    }
    let app = new Server(option)
    app.start()
  })

program.parse(process.argv);