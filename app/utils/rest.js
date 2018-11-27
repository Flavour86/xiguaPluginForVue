import Request from './request'
const extend = Object.assign

class REST extends Request {
  constructor (baseUri = [], cache = false) {
    super(baseUri, cache)

    /**
     * @abstract 由子类覆盖
     * @type {Array}
     */
    this.baseUri = baseUri
  }

  addUri (uri) {
    this.baseUri.push(uri)
    return this
  }

  GET (options) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    if (options.params) {
      Object.keys(options.params).map((key) => {
        if (options.params[key]) {
          options.params[key] = options.params[key].toString().replace(/'/g, '%27')
        }
      })
    }

    return this.request(extend({
      method: 'GET'
    }, options))
  }

  /**
   * POST
   * @param {object} options        参数
   */
  POST (options) {
    if (!options) {
      options = {}
    }

    return this.request(extend({
      method: 'POST'
    }, options))
  }

  /**
   * PUT
   * @param {object} options        参数
   * @param {object} data           参数
   */
  PUT (options, data) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    if (data) {
      options.data = data
    }

    return this.request(extend({
      method: 'PUT'
    }, options))
  }

  /**
   * PATCH
   * @param {object} options        参数
   * @param {object} data           参数
   */
  PATCH (options, data) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    if (data) {
      options.data = data
    }

    return this.request(extend({
      method: 'PATCH'
    }, options))
  }

  /**
   * DELETE
   * @param {object|string|number} options        参数
   */
  DELETE (options) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    return this.request(extend({
      method: 'DELETE'
    }, options))
  }
}

export default REST
