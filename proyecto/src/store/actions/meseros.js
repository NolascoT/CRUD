import Backendless from 'backendless'

import t from '../action-types';

export const loadmeseros = () => ({
  types  : [t.LOAD_meseroS, t.LOAD_meseroS_SUCCESS, t.LOAD_meseroS_FAIL],
  apiCall: () => Backendless.Data.of('mesero').find(),
});

export const createmesero = mesero => ({
  types  : [null, t.CREATE_mesero_SUCCESS, null],
  apiCall: () => Backendless.Data.of('mesero').save(mesero),
});

export const updatemesero = mesero => ({
  types  : [null, t.UPDATE_mesero_SUCCESS, null],
  apiCall: () => Backendless.Data.of('mesero').save(mesero),
});

export const removemesero = meseroId => ({
  meseroId,
  types  : [null, t.REMOVE_mesero_SUCCESS, null],
  apiCall: () => Backendless.Data.of('mesero').remove(meseroId),
});

export const onmeseroCreate = mesero => ({
  mesero,
  type: t.ON_mesero_CREATE,
});

export const onmeseroUpdate = mesero => ({
  mesero,
  type: t.ON_mesero_UPDATE,
});

export const onmeseroRemove = mesero => ({
  mesero,
  type: t.ON_mesero_REMOVE,
});