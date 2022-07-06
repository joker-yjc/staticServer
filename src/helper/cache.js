// 设置缓存
module.exports = function (stats, req, res, config) {
  let { cache } = config
  let { expires, cacheControl, etag, lastModified } = cache
  if (expires) {
    res.setHeader("Expires", (new Date(Date.now() + expires * 1000)).toUTCString())
  }
  if (cacheControl) {
    res.setHeader("Cache-Control", `public,max-age=${cacheControl.maxAge}`)
  }
  if (lastModified) {
    res.setHeader("Last-Modified", stats.mtime.toUTCString())
  }
  if (etag) {
    res.setHeader("ETag", `${stats.size}-${stats.mtimeMs}`)
  }
  const req_lastModified = req.headers["if-modified-since"]
  const req_etag = req.headers["if-none-match"];
  if (!req_lastModified && !etag) {
    return false
  }
  if (req_lastModified && req_lastModified !== res.getHeader("Last-Modified")) {
    return false
  }
  if (!req_etag && req_etag !== res.getHeader("ETag")) {
    return false
  }
  return true
}