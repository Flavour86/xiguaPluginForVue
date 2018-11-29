import Manager from './storageManager'

export default {
  storage: new Manager(window.localStorage),
  sessionStorage: new Manager(window.sessionStorage)
}
