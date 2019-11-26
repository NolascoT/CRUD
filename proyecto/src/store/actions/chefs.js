import Backendless from 'backendless'

import t from '../action-types';

export const loadchefs = () => ({
  types  : [t.LOAD_chefS, t.LOAD_chefS_SUCCESS, t.LOAD_chefS_FAIL],
  apiCall: () => Backendless.Data.of('chef').find(),
});

export const createchef = chef => ({
  types  : [null, t.CREATE_chef_SUCCESS, null],
  apiCall: () => Backendless.Data.of('chef').save(chef),
});

export const updatechef = chef => ({
  types  : [null, t.UPDATE_chef_SUCCESS, null],
  apiCall: () => Backendless.Data.of('chef').save(chef),
});

export const removechef = chefId => ({
  chefId,
  types  : [null, t.REMOVE_chef_SUCCESS, null],
  apiCall: () => Backendless.Data.of('chef').remove(chefId),
});

export const onchefCreate = chef => ({
  chef,
  type: t.ON_chef_CREATE,
});

export const onchefUpdate = chef => ({
  chef,
  type: t.ON_chef_UPDATE,
});

export const onchefRemove = chef => ({
  chef,
  type: t.ON_chef_REMOVE,
});