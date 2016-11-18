function RemoveAssetsWebpackPlugin(regex) {
  if (!(regex instanceof RegExp)) {
    throw new Error('must provide a RegExp')
  }

  Object.assign(this, {
    regex
  })
}

RemoveAssetsWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, cb) => {
    const { assets } = compilation

    try {
      Object.keys(assets).forEach(key => {
        if (assets.hasOwnProperty(key) && assets[key] != null && this.regex.test(key)) {
          delete assets[key]
        }
      })

      cb()
    } catch(err) {
      cb(err)
    }
  })
}

module.exports = RemoveAssetsWebpackPlugin
