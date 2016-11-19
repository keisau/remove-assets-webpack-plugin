function RemoveAssetsWebpackPlugin(regex) {
  let array = null
  if (regex instanceof RegExp) {
    array = [ regex ]
  } else if (Array.isArray(regex)) {
    array = regex
  }

  array = array.filter(i => i instanceof RegExp)
  if (array.length === 0) {
    throw new Error('must provide RegExp')
  }

  Object.assign(this, {
    regex: array
  })
}

RemoveAssetsWebpackPlugin.prototype.testString = function(string) {
  const { regex } = this
  for(let i = 0; i < regex.length; ++i) {
    const ex = regex[i]
    if (ex.test(string)) {
      return true
    }
  }

  return false
}

RemoveAssetsWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, cb) => {
    const { assets } = compilation

    try {
      Object.keys(assets).forEach(key => {
        if (assets.hasOwnProperty(key) && assets[key] != null && this.testString(key)) {
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
