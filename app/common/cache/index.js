import Manager from './storageManager'

export default {
  user: new Manager('user', window.localStorage)
}
