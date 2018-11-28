export default class Manager {
  constructor (prefix, driver) {
    this.prefix = prefix
    this.driver = driver
    this.setItem = (driver.setItem || driver.set).bind(driver)
    this.getItem = (driver.getItem || driver.get).bind(driver)
    this.removeItem = (driver.removeItem || driver.remove).bind(driver)
  }

  set (id, data) {
    const { prefix } = this
    return id && this.setItem(`${prefix}-${id}`, data)
  }

  get (id) {
    const { prefix } = this
    return this.getItem(`${prefix}-${id}`)
  }

  remove (id) {
    const { prefix } = this
    return this.removeItem(`${prefix}-${id}`)
  }

  clear () {
    return this.driver.clear()
  }

  keys () {
    return this.driver.keys()
  }
}
