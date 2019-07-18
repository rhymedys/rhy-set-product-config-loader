/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-12-11 10:56:58
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-07-18 14:55:30
 */
const utils = require('loader-utils')

module.exports = function (source, map, meta) {
  this.cacheable()
  const option = utils.getOptions(this) || {}
  const fileName = option.fileName && option.fileName.toLowerCase() || 'appconfig'
  let lastFileSplitIndex = this.resourcePath.lastIndexOf('\\') || this.resourcePath.lastIndexOf('\/')
  if (this.resourcePath && this.resourcePath.substring(lastFileSplitIndex+ 1, this.resourcePath.lastIndexOf('.')).toLowerCase() === fileName) {
    let appConfig = option.configs
    if (appConfig) {
      let res = {}
      let newSource = source
      let configsType = Object.prototype.toString.call(appConfig)
      if (configsType === `[object Array]`) {
        appConfig.forEach(val => {
          res[val] = false
        })
      } else if (configsType === `[object Object]`) {
        res = appConfig
      }
      for (let [k, v] of Object.entries(res)) {
        let key = `exports.${k}`
        if (newSource.match(key)) {
          const keyPosition = newSource.indexOf(key)
          const replaceStartPosition = newSource.indexOf('\=', keyPosition)
          const replaceEndPosition = newSource.indexOf('\;', replaceStartPosition)
          const toReplacePart = newSource.substring(keyPosition, replaceEndPosition)
          const newReplceValue = toReplacePart.replace(toReplacePart.substring(toReplacePart.indexOf('\=') + 1,toReplacePart.length) , ` ${v}`)
          newSource = newSource.replace(toReplacePart,newReplceValue)
        }
      }

      this.callback(null, newSource, map, meta)
      return
    }
  }

  this.callback(null, source, map, meta)
  return
}
