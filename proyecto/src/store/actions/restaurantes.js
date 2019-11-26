import Backendless from 'backendless'

import t from '../action-types';

export const loadrestaurantes = () => ({
  types  : [t.LOAD_restauranteS, t.LOAD_restauranteS_SUCCESS, t.LOAD_restauranteS_FAIL],
  apiCall: () => Backendless.Data.of('restaurante').find(),
});

export const createrestaurante = restaurante => ({
  types  : [null, t.CREATE_restaurante_SUCCESS, null],
  apiCall: () => Backendless.Data.of('restaurante').save(restaurante),
});

export const updaterestaurante = restaurante => ({
  types  : [null, t.UPDATE_restaurante_SUCCESS, null],
  apiCall: () => Backendless.Data.of('restaurante').save(restaurante),
});

export const removerestaurante = restauranteId => ({
  restauranteId,
  types  : [null, t.REMOVE_restaurante_SUCCESS, null],
  apiCall: () => Backendless.Data.of('restaurante').remove(restauranteId),
});

export const onrestauranteCreate = restaurante => ({
  restaurante,
  type: t.ON_restaurante_CREATE,
});

export const onrestauranteUpdate = restaurante => ({
  restaurante,
  type: t.ON_restaurante_UPDATE,
});

export const onrestauranteRemove = restaurante => ({
  restaurante,
  type: t.ON_restaurante_REMOVE,
});