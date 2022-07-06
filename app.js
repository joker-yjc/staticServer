const http = require('http');
const path = require('path');
const config = require('./config');
const fs = require('fs').promises;
const dirTemplate = require('./src/template/dir')
const cacheHelper = require('./src/helper/cache')
const openUrl = require('./src/helper/openBrowser')



class Server {
  constructor(configObj = {}) {
    this.config = Object.assign({}, config, configObj)
  }

  start() {
    let config = this.config
    let server = http.createServer(async (req, res) => {
      const filePath = path.join(config.rootDir, req.url)
      try {
        let statObj = await fs.stat(filePath)
        if (statObj.isFile()) {
          // 缓存处理
          if (cacheHelper(statObj, req, res, config)) {
            res.statusCode = 304
            res.end()
            return
          }
          res.setHeader('Content-Type', 'text/plain;charset=utf-8')
          let result = await fs.readFile(filePath)
          res.end(result)
        } else if (statObj.isDirectory()) {
          res.setHeader('Content-Type', 'text/html;charset=utf-8')
          let result = await fs.readdir(filePath)
          res.end(dirTemplate(result, filePath, config))
        }
      } catch (err) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end("此路径不存在资源")
      }
    })

    server.listen(config.port, () => {
      let url = ` http://${config.host}:${config.port}`
      console.log(`server started at ${url}`)
      openUrl(url)
    })
  }
}

module.exports = Server