import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const platillosReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_platilloS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_platillo_SUCCESS]: (state, action) => addplatillo(state, action.result),
    [t.UPDATE_platillo_SUCCESS]: (state, action) => updateplatillo(state, action.result),
    [t.REMOVE_platillo_SUCCESS]: (state, action) => deleteplatillo(state, action.platilloId),

    [t.ON_platillo_CREATE]: (state, action) => addplatillo(state, action.platillo),
    [t.ON_platillo_UPDATE]: (state, action) => updateplatillo(state, action.platillo),
    [t.ON_platillo_REMOVE]: (state, action) => deleteplatillo(state, action.platillo.objectId)
  })
);

function addplatillo(state, platillo) {
  if (state.list.find(p => p.objectId === platillo.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(platillo)
  }
}

function updateplatillo(state, platillo) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === platillo.objectId ? platillo : p)
  }
}

function deleteplatillo(state, platilloId) {
  return {
    ...state,
    list: state.list.filter(platillo => platillo.objectId !== platilloId)
  }
}

export default platillosReducer