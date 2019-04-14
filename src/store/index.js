import Vue from 'vue'
import Vuex from 'vuex'
import mapconfig from '@/config/mapconfig.js'
import { Map, View } from 'ol';
Vue.use(Vuex)

const state = {
  baseLayer: mapconfig.streetmap(0),
  center: [mapconfig.view.x, mapconfig.view.y]
};

const getters = {//实时监听state值的变化(最新状态)
  layers(state) {
    return state.baseLayer
  },
  center(state) {
    return state.center;
  }
};

const mutations = {
  changeBaseLayer (state,index) {
    state.baseLayer = mapconfig.streetmap(index)
  },
  changeCenter(state,value) {    
    state.center = value
  }
}

const actions = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});


export default store