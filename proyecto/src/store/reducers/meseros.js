import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const meserosReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_meseroS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_mesero_SUCCESS]: (state, action) => addmesero(state, action.result),
    [t.UPDATE_mesero_SUCCESS]: (state, action) => updatemesero(state, action.result),
    [t.REMOVE_mesero_SUCCESS]: (state, action) => deletemesero(state, action.meseroId),

    [t.ON_mesero_CREATE]: (state, action) => addmesero(state, action.mesero),
    [t.ON_mesero_UPDATE]: (state, action) => updatemesero(state, action.mesero),
    [t.ON_mesero_REMOVE]: (state, action) => deletemesero(state, action.mesero.objectId)
  })
);

function addmesero(state, mesero) {
  if (state.list.find(p => p.objectId === mesero.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(mesero)
  }
}

function updatemesero(state, mesero) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === mesero.objectId ? mesero : p)
  }
}

function deletemesero(state, meseroId) {
  return {
    ...state,
    list: state.list.filter(mesero => mesero.objectId !== meseroId)
  }
}

export default meserosReducer