import Vue from 'vue'

export default function () {
  return global.bus || (global.bus = new Vue())
}
