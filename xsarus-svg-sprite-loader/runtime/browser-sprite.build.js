/* eslint-disable */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (global.BrowserSprite = factory())
}(this, function () {
  'use strict'

  const commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

  function createCommonjsModule (fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports
  }

  const deepmerge = createCommonjsModule(function (module, exports) {
    (function (root, factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        undefined(factory)
      } else {
        module.exports = factory()
      }
    }(commonjsGlobal, function () {
      function isMergeableObject (val) {
        const nonNullObject = val && typeof val === 'object'

        return nonNullObject &&
        Object.prototype.toString.call(val) !== '[object RegExp]' &&
        Object.prototype.toString.call(val) !== '[object Date]'
      }

      function emptyTarget (val) {
        return Array.isArray(val) ? [] : {}
      }

      function cloneIfNecessary (value, optionsArgument) {
        const clone = optionsArgument && optionsArgument.clone === true
        return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
      }

      function defaultArrayMerge (target, source, optionsArgument) {
        const destination = target.slice()
        source.forEach(function (e, i) {
          if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
          } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument)
          } else if (!target.includes(e)) {
            destination.push(cloneIfNecessary(e, optionsArgument))
          }
        })
        return destination
      }

      function mergeObject (target, source, optionsArgument) {
        const destination = {}
        if (isMergeableObject(target)) {
          Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument)
          })
        }
        Object.keys(source).forEach(function (key) {
          if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument)
          } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument)
          }
        })
        return destination
      }

      function deepmerge (target, source, optionsArgument) {
        const array = Array.isArray(source)
        const options = optionsArgument || { arrayMerge: defaultArrayMerge }
        const arrayMerge = options.arrayMerge || defaultArrayMerge

        if (array) {
          return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
        } else {
          return mergeObject(target, source, optionsArgument)
        }
      }

      deepmerge.all = function deepmergeAll (array, optionsArgument) {
        if (!Array.isArray(array) || array.length < 2) {
          throw new Error('first argument should be an array with at least two elements')
        }

        // we are sure there are at least 2 values, so it is safe to have no initial value
        return array.reduce(function (prev, next) {
          return deepmerge(prev, next, optionsArgument)
        })
      }

      return deepmerge
    }))
  })

  //
  // An event handler can take an optional event argument
  // and should not return a value

  // An array of all currently registered event handlers for a type

  // A map of event types and their corresponding event handlers.

  /** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
  function mitt (all) {
    all = all || Object.create(null)

    return {
      /**
     * Register an event handler for the given type.
     *
     * @param  {String} type  Type of event to listen for, or `"*"` for all events
     * @param  {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
      on: function on (type, handler) {
        (all[type] || (all[type] = [])).push(handler)
      },

      /**
     * Remove an event handler for the given type.
     *
     * @param  {String} type  Type of event to unregister `handler` from, or `"*"`
     * @param  {Function} handler Handler function to remove
     * @memberOf mitt
     */
      off: function off (type, handler) {
        if (all[type]) {
          all[type].splice(all[type].indexOf(handler) >>> 0, 1)
        }
      },

      /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * @param {String} type  The event type to invoke
     * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
     * @memberof mitt
     */
      emit: function emit (type, evt) {
        (all[type] || []).map(function (handler) { handler(evt) });
        (all['*'] || []).map(function (handler) { handler(type, evt) })
      }
    }
  }

  const namespaces_1 = createCommonjsModule(function (module, exports) {
    const namespaces = {
      svg: {
        name: 'xmlns',
        uri: 'http://www.w3.org/2000/svg'
      },
      xlink: {
        name: 'xmlns:xlink',
        uri: 'http://www.w3.org/1999/xlink'
      }
    }

    exports.default = namespaces
    module.exports = exports.default
  })

  /**
 * @param {Object} attrs
 * @return {string}
 */
  const objectToAttrsString = function (attrs) {
    return Object.keys(attrs).map(function (attr) {
      const value = attrs[attr].toString().replace(/"/g, '&quot;')
      return (attr + '="' + value + '"')
    }).join(' ')
  }

  const svg = namespaces_1.svg
  const xlink = namespaces_1.xlink

  const defaultAttrs = {}
  defaultAttrs[svg.name] = svg.uri
  defaultAttrs[xlink.name] = xlink.uri

  /**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
  const wrapInSvgString = function (content, attributes) {
    if (content === void 0) { content = '' }

    const attrs = deepmerge(defaultAttrs, attributes || {})
    const attrsRendered = objectToAttrsString(attrs)
    return ('<svg ' + attrsRendered + '>' + content + '</svg>')
  }

  const svg$1 = namespaces_1.svg
  const xlink$1 = namespaces_1.xlink

  const defaultConfig = {
    attrs: (obj = {
      style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
      'aria-hidden': 'true'
    }, obj[svg$1.name] = svg$1.uri, obj[xlink$1.name] = xlink$1.uri, obj)
  }
  let obj

  const Sprite = function Sprite (config) {
    this.config = deepmerge(defaultConfig, config || {})
    this.symbols = []
  }

  /**
 * Add new symbol. If symbol with the same id exists it will be replaced.
 * @param {SpriteSymbol} symbol
 * @return {boolean} `true` - symbol was added, `false` - replaced
 */
  Sprite.prototype.add = function add (symbol) {
    const ref = this
    const symbols = ref.symbols
    const existing = this.find(symbol.id)

    if (existing) {
      symbols[symbols.indexOf(existing)] = symbol
      return false
    }

    symbols.push(symbol)
    return true
  }

  /**
 * Remove symbol & destroy it
 * @param {string} id
 * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
 */
  Sprite.prototype.remove = function remove (id) {
    const ref = this
    const symbols = ref.symbols
    const symbol = this.find(id)

    if (symbol) {
      symbols.splice(symbols.indexOf(symbol), 1)
      symbol.destroy()
      return true
    }

    return false
  }

  /**
 * @param {string} id
 * @return {SpriteSymbol|null}
 */
  Sprite.prototype.find = function find (id) {
    return this.symbols.filter(function (s) { return s.id === id })[0] || null
  }

  /**
 * @param {string} id
 * @return {boolean}
 */
  Sprite.prototype.has = function has (id) {
    return this.find(id) !== null
  }

  /**
 * @return {string}
 */
  Sprite.prototype.stringify = function stringify () {
    const ref = this.config
    const attrs = ref.attrs
    const stringifiedSymbols = this.symbols.map(function (s) { return s.stringify() }).join('')
    return wrapInSvgString(stringifiedSymbols, attrs)
  }

  /**
 * @return {string}
 */
  Sprite.prototype.toString = function toString () {
    return this.stringify()
  }

  Sprite.prototype.destroy = function destroy () {
    this.symbols.forEach(function (s) { return s.destroy() })
  }

  const SpriteSymbol = function SpriteSymbol (ref) {
    const id = ref.id
    const viewBox = ref.viewBox
    const content = ref.content

    this.id = id
    this.viewBox = viewBox
    this.content = content
  }

  /**
 * @return {string}
 */
  SpriteSymbol.prototype.stringify = function stringify () {
    return this.content
  }

  /**
 * @return {string}
 */
  SpriteSymbol.prototype.toString = function toString () {
    return this.stringify()
  }

  SpriteSymbol.prototype.destroy = function destroy () {
    const this$1 = this;

    ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop] })
  }

  /**
 * @param {string} content
 * @return {Element}
 */
  const parse = function (content) {
    const hasImportNode = !!document.importNode
    const doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement

    /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
    if (hasImportNode) {
      return document.importNode(doc, true)
    }

    return doc
  }

  const BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
    function BrowserSpriteSymbol () {
      SpriteSymbol$$1.apply(this, arguments)
    }

    if (SpriteSymbol$$1) { BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1 }
    BrowserSpriteSymbol.prototype = Object.create(SpriteSymbol$$1 && SpriteSymbol$$1.prototype)
    BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol

    const prototypeAccessors = { isMounted: {} }

    prototypeAccessors.isMounted.get = function () {
      return !!this.node
    }

    /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
    BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
      return new BrowserSpriteSymbol({
        id: node.getAttribute('id'),
        viewBox: node.getAttribute('viewBox'),
        content: node.outerHTML
      })
    }

    BrowserSpriteSymbol.prototype.destroy = function destroy () {
      if (this.isMounted) {
        this.unmount()
      }
      SpriteSymbol$$1.prototype.destroy.call(this)
    }

    /**
   * @param {Element|string} target
   * @return {Element}
   */
    BrowserSpriteSymbol.prototype.mount = function mount (target) {
      if (this.isMounted) {
        return this.node
      }

      const mountTarget = typeof target === 'string' ? document.querySelector(target) : target
      const node = this.render()
      this.node = node

      mountTarget.appendChild(node)

      return node
    }

    /**
   * @return {Element}
   */
    BrowserSpriteSymbol.prototype.render = function render () {
      const content = this.stringify()
      return parse(wrapInSvgString(content)).childNodes[0]
    }

    BrowserSpriteSymbol.prototype.unmount = function unmount () {
      this.node.parentNode.removeChild(this.node)
    }

    Object.defineProperties(BrowserSpriteSymbol.prototype, prototypeAccessors)

    return BrowserSpriteSymbol
  }(SpriteSymbol))

  const defaultConfig$1 = {
  /**
   * Should following options be automatically configured:
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @type {boolean}
   */
    autoConfigure: true,

    /**
   * Default mounting selector
   * @type {string}
   */
    mountTo: 'body',

    /**
   * Fix disappearing SVG elements when <base href> exists.
   * Executes when sprite mounted.
   * @see http://stackoverflow.com/a/18265336/796152
   * @see https://github.com/everdimension/angular-svg-base-fix
   * @see https://github.com/angular/angular.js/issues/8934#issuecomment-56568466
   * @type {boolean}
   */
    syncUrlsWithBaseTag: false,

    /**
   * Should sprite listen custom location change event
   * @type {boolean}
   */
    listenLocationChangeEvent: true,

    /**
   * Custom window event name which should be emitted to update sprite urls
   * @type {string}
   */
    locationChangeEvent: 'locationChange',

    /**
   * Emit location change event in Angular automatically
   * @type {boolean}
   */
    locationChangeAngularEmitter: false,

    /**
   * Selector to find symbols usages when updating sprite urls
   * @type {string}
   */
    usagesToUpdate: 'use[*|href]',

    /**
   * Fix Firefox bug when gradients and patterns don't work if they are within a symbol.
   * Executes when sprite is rendered, but not mounted.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=306674
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1235364
   * @type {boolean}
   */
    moveGradientsOutsideSymbol: false
  }

  /**
 * @param {*} arrayLike
 * @return {Array}
 */
  const arrayFrom = function (arrayLike) {
    return Array.prototype.slice.call(arrayLike, 0)
  }

  const browser = {
    isChrome () { return /chrome/i.test(navigator.userAgent) },
    isFirefox () { return /firefox/i.test(navigator.userAgent) },

    // https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
    isIE () { return /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent) },
    isEdge () { return /edge/i.test(navigator.userAgent) }
  }

  /**
 * @param {string} name
 * @param {*} data
 */
  const dispatchEvent = function (name, data) {
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent(name, false, false, data)
    window.dispatchEvent(event)
  }

  /**
 * IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
 * This trick will trigger IE to read and use any existing SVG <style> tags.
 * @see https://github.com/iconic/SVGInjector/issues/23
 * @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
 *
 * @param {Element} node DOM Element to search <style> tags in
 * @return {Array<HTMLStyleElement>}
 */
  const evalStylesIEWorkaround = function (node) {
    const updatedNodes = []

    arrayFrom(node.querySelectorAll('style'))
      .forEach(function (style) {
        style.textContent += ''
        updatedNodes.push(style)
      })

    return updatedNodes
  }

  /**
 * @param {string} [url] If not provided - current URL will be used
 * @return {string}
 */
  const getUrlWithoutFragment = function (url) {
    return (url || window.location.href).split('#')[0]
  }

  /* global angular */
  /**
 * @param {string} eventName
 */
  const locationChangeAngularEmitter = function (eventName) {
    angular.module('ng').run(['$rootScope', function ($rootScope) {
      $rootScope.$on('$locationChangeSuccess', function (e, newUrl, oldUrl) {
        dispatchEvent(eventName, { oldUrl, newUrl })
      })
    }])
  }

  const defaultSelector = 'linearGradient, radialGradient, pattern, mask, clipPath'

  /**
 * @param {Element} svg
 * @param {string} [selector]
 * @return {Element}
 */
  const moveGradientsOutsideSymbol = function (svg, selector) {
    if (selector === void 0) { selector = defaultSelector }

    arrayFrom(svg.querySelectorAll('symbol')).forEach(function (symbol) {
      arrayFrom(symbol.querySelectorAll(selector)).forEach(function (node) {
        symbol.parentNode.insertBefore(node, symbol)
      })
    })
    return svg
  }

  /**
 * @param {NodeList} nodes
 * @param {Function} [matcher]
 * @return {Attr[]}
 */
  function selectAttributes (nodes, matcher) {
    const attrs = arrayFrom(nodes).reduce(function (acc, node) {
      if (!node.attributes) {
        return acc
      }

      const arrayfied = arrayFrom(node.attributes)
      const matched = matcher ? arrayfied.filter(matcher) : arrayfied
      return acc.concat(matched)
    }, [])

    return attrs
  }

  /**
 * @param {NodeList|Node} nodes
 * @param {boolean} [clone=true]
 * @return {string}
 */

  const xLinkNS = namespaces_1.xlink.uri
  const xLinkAttrName = 'xlink:href'

  // eslint-disable-next-line no-useless-escape
  const specialUrlCharsPattern = /[{}|\\\^\[\]`"<>]/g

  function encoder (url) {
    return url.replace(specialUrlCharsPattern, function (match) {
      return ('%' + (match[0].charCodeAt(0).toString(16).toUpperCase()))
    })
  }

  function escapeRegExp (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

  /**
 * @param {NodeList} nodes
 * @param {string} startsWith
 * @param {string} replaceWith
 * @return {NodeList}
 */
  function updateReferences (nodes, startsWith, replaceWith) {
    arrayFrom(nodes).forEach(function (node) {
      const href = node.getAttribute(xLinkAttrName)
      if (href && href.indexOf(startsWith) === 0) {
        const newUrl = href.replace(startsWith, replaceWith)
        node.setAttributeNS(xLinkNS, xLinkAttrName, newUrl)
      }
    })

    return nodes
  }

  /**
 * List of SVG attributes to update url() target in them
 */
  const attList = [
    'clipPath',
    'colorProfile',
    'src',
    'cursor',
    'fill',
    'filter',
    'marker',
    'markerStart',
    'markerMid',
    'markerEnd',
    'mask',
    'stroke',
    'style'
  ]

  const attSelector = attList.map(function (attr) { return ('[' + attr + ']') }).join(',')

  /**
 * Update URLs in svg image (like `fill="url(...)"`) and update referencing elements
 * @param {Element} svg
 * @param {NodeList} references
 * @param {string|RegExp} startsWith
 * @param {string} replaceWith
 * @return {void}
 *
 * @example
 * const sprite = document.querySelector('svg.sprite');
 * const usages = document.querySelectorAll('use');
 * updateUrls(sprite, usages, '#', 'prefix#');
 */
  const updateUrls = function (svg, references, startsWith, replaceWith) {
    const startsWithEncoded = encoder(startsWith)
    const replaceWithEncoded = encoder(replaceWith)

    const nodes = svg.querySelectorAll(attSelector)
    const attrs = selectAttributes(nodes, function (ref) {
      const localName = ref.localName
      const value = ref.value

      return attList.includes(localName) && value.includes('url(' + startsWithEncoded)
    })

    attrs.forEach(function (attr) { return attr.value = attr.value.replace(new RegExp(escapeRegExp(startsWithEncoded), 'g'), replaceWithEncoded) })
    updateReferences(references, startsWithEncoded, replaceWithEncoded)
  }

  /**
 * Internal emitter events
 * @enum
 * @private
 */
  const Events = {
    MOUNT: 'mount',
    SYMBOL_MOUNT: 'symbol_mount'
  }

  const BrowserSprite = (function (Sprite$$1) {
    function BrowserSprite (cfg) {
      const this$1 = this
      if (cfg === void 0) { cfg = {} }

      Sprite$$1.call(this, deepmerge(defaultConfig$1, cfg))

      const emitter = mitt()
      this._emitter = emitter
      this.node = null

      const ref = this
      const config = ref.config

      if (config.autoConfigure) {
        this._autoConfigure(cfg)
      }

      if (config.syncUrlsWithBaseTag) {
        const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
        emitter.on(Events.MOUNT, function () { return this$1.updateUrls('#', baseUrl) })
      }

      const handleLocationChange = this._handleLocationChange.bind(this)
      this._handleLocationChange = handleLocationChange

      // Provide way to update sprite urls externally via dispatching custom window event
      if (config.listenLocationChangeEvent) {
        window.addEventListener(config.locationChangeEvent, handleLocationChange)
      }

      // Emit location change event in Angular automatically
      if (config.locationChangeAngularEmitter) {
        locationChangeAngularEmitter(config.locationChangeEvent)
      }

      // After sprite mounted
      emitter.on(Events.MOUNT, function (spriteNode) {
        if (config.moveGradientsOutsideSymbol) {
          moveGradientsOutsideSymbol(spriteNode)
        }
      })

      // After symbol mounted into sprite
      emitter.on(Events.SYMBOL_MOUNT, function (symbolNode) {
        if (config.moveGradientsOutsideSymbol) {
          moveGradientsOutsideSymbol(symbolNode.parentNode)
        }

        if (browser.isIE() || browser.isEdge()) {
          evalStylesIEWorkaround(symbolNode)
        }
      })
    }

    if (Sprite$$1) { BrowserSprite.__proto__ = Sprite$$1 }
    BrowserSprite.prototype = Object.create(Sprite$$1 && Sprite$$1.prototype)
    BrowserSprite.prototype.constructor = BrowserSprite

    const prototypeAccessors = { isMounted: {} }

    /**
   * @return {boolean}
   */
    prototypeAccessors.isMounted.get = function () {
      return !!this.node
    }

    /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
    BrowserSprite.prototype._autoConfigure = function _autoConfigure (cfg) {
      const ref = this
      const config = ref.config

      if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
        config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined'
      }

      if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
        config.locationChangeAngularEmitter = typeof window.angular !== 'undefined'
      }

      if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
        config.moveGradientsOutsideSymbol = browser.isFirefox()
      }
    }

    /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
    BrowserSprite.prototype._handleLocationChange = function _handleLocationChange (event) {
      const ref = event.detail
      const oldUrl = ref.oldUrl
      const newUrl = ref.newUrl
      this.updateUrls(oldUrl, newUrl)
    }

    /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
    BrowserSprite.prototype.add = function add (symbol) {
      const sprite = this
      const isNewSymbol = Sprite$$1.prototype.add.call(this, symbol)

      if (this.isMounted && isNewSymbol) {
        symbol.mount(sprite.node)
        this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node)
      }

      return isNewSymbol
    }

    /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
    BrowserSprite.prototype.attach = function attach (target) {
      const this$1 = this

      const sprite = this

      if (sprite.isMounted) {
        return sprite.node
      }

      /** @type Element */
      const node = typeof target === 'string' ? document.querySelector(target) : target
      sprite.node = node

      // Already added symbols needs to be mounted
      this.symbols.forEach(function (symbol) {
        symbol.mount(sprite.node)
        this$1._emitter.emit(Events.SYMBOL_MOUNT, symbol.node)
      })

      // Create symbols from existing DOM nodes, add and mount them
      arrayFrom(node.querySelectorAll('symbol'))
        .forEach(function (symbolNode) {
          const symbol = BrowserSpriteSymbol.createFromExistingNode(symbolNode)
          symbol.node = symbolNode // hack to prevent symbol mounting to sprite when adding
          sprite.add(symbol)
        })

      this._emitter.emit(Events.MOUNT, node)

      return node
    }

    BrowserSprite.prototype.destroy = function destroy () {
      const ref = this
      const config = ref.config
      const symbols = ref.symbols
      const _emitter = ref._emitter

      symbols.forEach(function (s) { return s.destroy() })

      _emitter.off('*')
      window.removeEventListener(config.locationChangeEvent, this._handleLocationChange)

      if (this.isMounted) {
        this.unmount()
      }
    }

    /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
    BrowserSprite.prototype.mount = function mount (target, prepend) {
      if (target === void 0) { target = this.config.mountTo }
      if (prepend === void 0) { prepend = false }

      const sprite = this

      if (sprite.isMounted) {
        return sprite.node
      }

      const mountNode = typeof target === 'string' ? document.querySelector(target) : target
      const node = sprite.render()
      this.node = node

      if (prepend && mountNode.childNodes[0]) {
        mountNode.insertBefore(node, mountNode.childNodes[0])
      } else {
        mountNode.appendChild(node)
      }

      this._emitter.emit(Events.MOUNT, node)

      return node
    }

    /**
   * @return {Element}
   */
    BrowserSprite.prototype.render = function render () {
      return parse(this.stringify())
    }

    /**
   * Detach sprite from the DOM
   */
    BrowserSprite.prototype.unmount = function unmount () {
      this.node.parentNode.removeChild(this.node)
    }

    /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
    BrowserSprite.prototype.updateUrls = function updateUrls$1 (oldUrl, newUrl) {
      if (!this.isMounted) {
        return false
      }

      const usages = document.querySelectorAll(this.config.usagesToUpdate)

      updateUrls(
        this.node,
        usages,
        ((getUrlWithoutFragment(oldUrl)) + '#'),
        ((getUrlWithoutFragment(newUrl)) + '#')
      )

      return true
    }

    Object.defineProperties(BrowserSprite.prototype, prototypeAccessors)

    return BrowserSprite
  }(Sprite))

  const ready$1 = createCommonjsModule(function (module) {
    /*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
    !(function (name, definition) {
      { module.exports = definition() }
    }('domready', function () {
      const fns = []; let listener
      const doc = document
      const hack = doc.documentElement.doScroll
      const domContentLoaded = 'DOMContentLoaded'
      let loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)

      if (!loaded) {
        doc.addEventListener(domContentLoaded, listener = function () {
          doc.removeEventListener(domContentLoaded, listener)
          loaded = 1
          while (listener = fns.shift()) { listener() }
        })
      }

      return function (fn) {
        loaded ? setTimeout(fn, 0) : fns.push(fn)
      }
    }))
  })

  const spriteNodeId = '__SVG_SPRITE_NODE__'
  const spriteGlobalVarName = '__SVG_SPRITE__'
  const isSpriteExists = !!window[spriteGlobalVarName]

  // eslint-disable-next-line import/no-mutable-exports
  let sprite

  if (isSpriteExists) {
    sprite = window[spriteGlobalVarName]
  } else {
    sprite = new BrowserSprite({
      attrs: {
        id: spriteNodeId,
        'aria-hidden': 'true'
      }
    })
    window[spriteGlobalVarName] = sprite
  }

  const loadSprite = function () {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
    const existing = document.getElementById(spriteNodeId)

    if (existing) {
      sprite.attach(existing)
    } else {
      sprite.mount(document.body, true)
    }
  }

  if (document.body) {
    loadSprite()
  } else {
    ready$1(loadSprite)
  }

  const sprite$1 = sprite

  return sprite$1
}))
