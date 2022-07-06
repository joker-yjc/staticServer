module.exports = {
  port: 3031,
  rootDir: process.cwd(),
  host: "localhost",
  cache: {
    expires: 60,
    lastModified: true,
    etag: true,
    cacheControl: {
      maxAge: 60 * 10
    }
  }
}