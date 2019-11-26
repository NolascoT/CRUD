import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const restaurantesReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_restauranteS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_restaurante_SUCCESS]: (state, action) => addrestaurante(state, action.result),
    [t.UPDATE_restaurante_SUCCESS]: (state, action) => updaterestaurante(state, action.result),
    [t.REMOVE_restaurante_SUCCESS]: (state, action) => deleterestaurante(state, action.restauranteId),

    [t.ON_restaurante_CREATE]: (state, action) => addrestaurante(state, action.restaurante),
    [t.ON_restaurante_UPDATE]: (state, action) => updaterestaurante(state, action.restaurante),
    [t.ON_restaurante_REMOVE]: (state, action) => deleterestaurante(state, action.restaurante.objectId)
  })
);

function addrestaurante(state, restaurante) {
  if (state.list.find(p => p.objectId === restaurante.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(restaurante)
  }
}

function updaterestaurante(state, restaurante) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === restaurante.objectId ? restaurante : p)
  }
}

function deleterestaurante(state, restauranteId) {
  return {
    ...state,
    list: state.list.filter(restaurante => restaurante.objectId !== restauranteId)
  }
}

export default restaurantesReducer