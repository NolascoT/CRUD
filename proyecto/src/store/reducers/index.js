  
import { combineReducers } from 'redux'

import platillos from './platillos'
import restaurantes from './restaurantes'
import chefs from './chefs'
import meseros from './meseros'
import encargados from './encargados'

const rootReducer = combineReducers({
  platillos,
  restaurantes,
  chefs,meseros,
  encargados
});

export default rootReducer;

export const getplatillos = state => state.platillos;
export const getrestaurantes = state => state.restaurantes;
export const getchefs = state => state.chefs;
export const getmeseros = state => state.meseros;
export const getencargados = state => state.encargados;