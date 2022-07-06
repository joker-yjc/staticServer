const path = require('path');

module.exports = function (data, rootDir, config) {
  let liArr = data.map((item) => {
    let currentPath = path.resolve(rootDir, item)
    // console.log(currentPath)
    let relativePath = path.relative(config.rootDir, currentPath)
    // console.log(relativePath)
    let hrefPath = path.join("/", relativePath)
    return `<li><a href="${hrefPath}">${item}</a></li>`
  })
  return `<ul>
${liArr.join("\n")}
</ul>`
}