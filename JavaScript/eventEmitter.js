class EventEmitter {
  _events = {}
  constructor() {

  }
  $on(event, listener) {
    if (this._events[event]) {
      this._events[event].push(listener)
    } else {
      this._events[event] = [listener]
    }
    return this
  }
  $once(event, listener) {
    const on = (...args) => {
      listener(...args)
      this.$off(event, on)
    }
    this.$on(event, on)
    return this
  }
  $off(event, listener) {
    if (!event || !listener) {
      this._events = {}
    } else if (event && !listener) {
      delete this._events[event]
    } else if (event && listener) {
      this._events[event] = this._events[event].filter(item => item !== listener)
    }
    return this
  }
  $emit (event, ...args) {
    const listeners = this._events[event] || []
    for (let listener of listeners) {
      listener(...args)
    }
    return this
  }
}