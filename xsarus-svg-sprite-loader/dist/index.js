'use strict'

const SpritePlugin = require('svg-sprite-loader/plugin')
// const SpritePlugin = require('../lib/plugin')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

const _depcheckPackageName = _interopRequireDefault(require('depcheck-package-name'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

const svgRulePredicate = rule => rule.test && rule.test.test('.svg')

function _default (moduleOptions) {
  const options = {
    ...this.options.spriteSvgLoader,
    ...moduleOptions
  }

  this.extendBuild((config) => {
    const imageLoaderRule = config.module.rules.find(svgRulePredicate)
    imageLoaderRule.test = /\.(png|jpe?g|gif|webp)$/

    config.module.rules.push({
      loader: (0, _depcheckPackageName.default)`svg-sprite-loader`,
      options,
      test: /\.svg$/
    })

    config.plugins.push(new SpritePlugin())
  })
}

module.exports = exports.default
