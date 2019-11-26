import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const chefsReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_chefS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_chef_SUCCESS]: (state, action) => addchef(state, action.result),
    [t.UPDATE_chef_SUCCESS]: (state, action) => updatechef(state, action.result),
    [t.REMOVE_chef_SUCCESS]: (state, action) => deletechef(state, action.chefId),

    [t.ON_chef_CREATE]: (state, action) => addchef(state, action.chef),
    [t.ON_chef_UPDATE]: (state, action) => updatechef(state, action.chef),
    [t.ON_chef_REMOVE]: (state, action) => deletechef(state, action.chef.objectId)
  })
);

function addchef(state, chef) {
  if (state.list.find(p => p.objectId === chef.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(chef)
  }
}

function updatechef(state, chef) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === chef.objectId ? chef : p)
  }
}

function deletechef(state, chefId) {
  return {
    ...state,
    list: state.list.filter(chef => chef.objectId !== chefId)
  }
}

export default chefsReducer