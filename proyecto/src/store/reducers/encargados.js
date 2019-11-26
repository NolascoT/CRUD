import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const encargadosReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_encargadoS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_encargado_SUCCESS]: (state, action) => addencargado(state, action.result),
    [t.UPDATE_encargado_SUCCESS]: (state, action) => updateencargado(state, action.result),
    [t.REMOVE_encargado_SUCCESS]: (state, action) => deleteencargado(state, action.encargadoId),

    [t.ON_encargado_CREATE]: (state, action) => addencargado(state, action.encargado),
    [t.ON_encargado_UPDATE]: (state, action) => updateencargado(state, action.encargado),
    [t.ON_encargado_REMOVE]: (state, action) => deleteencargado(state, action.encargado.objectId)
  })
);

function addencargado(state, encargado) {
  if (state.list.find(p => p.objectId === encargado.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(encargado)
  }
}

function updateencargado(state, encargado) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === encargado.objectId ? encargado : p)
  }
}

function deleteencargado(state, encargadoId) {
  return {
    ...state,
    list: state.list.filter(encargado => encargado.objectId !== encargadoId)
  }
}

export default encargadosReducer