import Backendless from 'backendless'

import t from '../action-types';

export const loadencargados = () => ({
  types  : [t.LOAD_encargadoS, t.LOAD_encargadoS_SUCCESS, t.LOAD_encargadoS_FAIL],
  apiCall: () => Backendless.Data.of('encargado').find(),
});

export const createencargado = encargado => ({
  types  : [null, t.CREATE_encargado_SUCCESS, null],
  apiCall: () => Backendless.Data.of('encargado').save(encargado),
});

export const updateencargado = encargado => ({
  types  : [null, t.UPDATE_encargado_SUCCESS, null],
  apiCall: () => Backendless.Data.of('encargado').save(encargado),
});

export const removeencargado = encargadoId => ({
  encargadoId,
  types  : [null, t.REMOVE_encargado_SUCCESS, null],
  apiCall: () => Backendless.Data.of('encargado').remove(encargadoId),
});

export const onencargadoCreate = encargado => ({
  encargado,
  type: t.ON_encargado_CREATE,
});

export const onencargadoUpdate = encargado => ({
  encargado,
  type: t.ON_encargado_UPDATE,
});

export const onencargadoRemove = encargado => ({
  encargado,
  type: t.ON_encargado_REMOVE,
});