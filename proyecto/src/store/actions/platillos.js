import Backendless from 'backendless'

import t from '../action-types';

export const loadplatillos = () => ({
  types  : [t.LOAD_platilloS, t.LOAD_platilloS_SUCCESS, t.LOAD_platilloS_FAIL],
  apiCall: () => Backendless.Data.of('platillo').find(),
});

export const createplatillo = platillo => ({
  types  : [null, t.CREATE_platillo_SUCCESS, null],
  apiCall: () => Backendless.Data.of('platillo').save(platillo),
});

export const updateplatillo = platillo => ({
  types  : [null, t.UPDATE_platillo_SUCCESS, null],
  apiCall: () => Backendless.Data.of('platillo').save(platillo),
});

export const removeplatillo = platilloId => ({
  platilloId,
  types  : [null, t.REMOVE_platillo_SUCCESS, null],
  apiCall: () => Backendless.Data.of('platillo').remove(platilloId),
});

export const onplatilloCreate = platillo => ({
  platillo,
  type: t.ON_platillo_CREATE,
});

export const onplatilloUpdate = platillo => ({
  platillo,
  type: t.ON_platillo_UPDATE,
});

export const onplatilloRemove = platillo => ({
  platillo,
  type: t.ON_platillo_REMOVE,
});