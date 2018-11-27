export default class Manager {
  constructor(prefix, driver) {
    this.prefix = prefix
    this.driver = driver
    this.setItem = (driver.setItem || driver.set).bind(driver)
    this.getItem = (driver.getItem || driver.get).bind(driver)
    this.removeItem = (driver.removeItem || driver.remove).bind(driver)
  }

  set(id, data) {
    const { prefix } = this
    id = `${prefix}-${id}`
    return id && this.setItem(id, data)
  }

  get(id) {
    const { prefix } = this

    if (!id) {
      id = `${prefix}-${auth.getTokens('user_id')}`
    } else {
      id = `${prefix}-${id}`
    }

    return this.getItem(id)
  }

  remove(id) {
    const { prefix } = this

    if (!id) {
      id = `${prefix}-${auth.getTokens('user_id')}`
    } else {
      id = `${prefix}-${id}`
    }

    return this.removeItem(id)
  }

  clear() {
    return this.driver.clear()
  }

  keys() {
    return this.driver.keys()
  }
}
