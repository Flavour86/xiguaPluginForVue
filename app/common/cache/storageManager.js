export default class Manager {
  constructor (driver) {
    this.driver = driver
    this.setItem = (driver.setItem || driver.set).bind(driver)
    this.getItem = (driver.getItem || driver.get).bind(driver)
    this.removeItem = (driver.removeItem || driver.remove).bind(driver)
  }

  set (id, data) {
    if (id) {
      try {
        this.setItem(id, JSON.stringify(data))
      } catch (e) {
        this.setItem(id, data)
      }
    }
  }

  get (id) {
    try {
      return JSON.parse(this.getItem(id))
    } catch (e) {
      return this.getItem(id)
    }
  }

  remove (id) {
    return this.removeItem(id)
  }

  clear () {
    return this.driver.clear()
  }

  keys () {
    return this.driver.keys()
  }
}
