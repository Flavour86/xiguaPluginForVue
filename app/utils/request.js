import axios from 'axios'
import json from 'json-bigint'
import { addParam, encode } from './helpers'

const PROTECTION_PREFIX = /^\)\]\}',?\n/
/**
 * Ajax Request, based on axios
 *
 * @class Request
 */
export default class Request {
  constructor (baseUri = [], cache = false) {
    /**
     * @abstract
     * @type {Array}
     */
    this.baseUri = baseUri
    this.cache = cache
  }

  /**
   * 参数 options 说明
   *
   * {number|string|array} uri    资源 ID, 可以是数组
   * {object} replacement         用于替换 url 中的变量, 如 {uri}
   *
   * {object} params              the URL parameters to be sent with the request
   * {object} data                the data to be sent as the request body
   * @see {@link https://github.com/mzabriskie/axios} for more options
   *
   */
  request (options) {
    options.headers = options.headers || {}

    let { uri, params, replacement, ...other } = options
    let url = this.baseUri

    // uri: id | null | undefined
    if (uri || uri === 0) {
      uri = [].concat(uri).map(item => '' + encode(item))
      url = url.concat(uri)
    }

    // remove empty values
    url = url.filter(val => !!val).join('/')

    if (params) {
      url = addParam(url, params)
    }

    // disable cache
    if (!this.cache) {
      // waf DOESN'T support cors Cache-Control header currently
      // would be REMOVED after waf updated
      url = addParam(url, {
        _: new Date().getTime()
      })
    }

    // 替换 URL 中的变量，如 {xxx}
    if (replacement) {
      Object.keys(replacement).forEach(function (key) {
        url = url.replace(new RegExp('{' + key + '}', 'img'), encode(replacement[key]))
      })
    }
    // if (!options.headers['Accept-Language']) {
    //   options.headers['Accept-Language'] = 'zh-CN';
    // }

    return axios({
      url: url,
      responseType: 'text',
      transformResponse: [function (responseText) {
        let data = responseText.replace(PROTECTION_PREFIX, '')
        try {
          data = json.parse(data)
        } catch (e) {
          throw e
        }
        return data
      }],
      ...other
    })
  }
}
