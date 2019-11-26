export default mirrorKeys({
  LOAD_restauranteS        : null,
  LOAD_restauranteS_SUCCESS: null,
  LOAD_restauranteS_FAIL   : null,

  CREATE_restaurante_SUCCESS: null,
  UPDATE_restaurante_SUCCESS: null,
  REMOVE_restaurante_SUCCESS: null,

  ON_restaurante_CREATE: null,
  ON_restaurante_UPDATE: null,
  ON_restaurante_REMOVE: null,

  LOAD_platilloS        : null,
  LOAD_platilloS_SUCCESS: null,
  LOAD_platilloS_FAIL   : null,

  CREATE_platillo_SUCCESS: null,
  UPDATE_platillo_SUCCESS: null,
  REMOVE_platillo_SUCCESS: null,

  ON_platillo_CREATE: null,
  ON_platillo_UPDATE: null,
  ON_platillo_REMOVE: null,

  LOAD_chefS        : null,
  LOAD_chefS_SUCCESS: null,
  LOAD_chefS_FAIL   : null,

  CREATE_chef_SUCCESS: null,
  UPDATE_chef_SUCCESS: null,
  REMOVE_chef_SUCCESS: null,

  ON_chef_CREATE: null,
  ON_chef_UPDATE: null,
  ON_chef_REMOVE: null,

  LOAD_meseroS        : null,
  LOAD_meseroS_SUCCESS: null,
  LOAD_meseroS_FAIL   : null,

  CREATE_mesero_SUCCESS: null,
  UPDATE_mesero_SUCCESS: null,
  REMOVE_mesero_SUCCESS: null,

  ON_mesero_CREATE: null,
  ON_mesero_UPDATE: null,
  ON_mesero_REMOVE: null,

  LOAD_encargadoS        : null,
  LOAD_encargadoS_SUCCESS: null,
  LOAD_encargadoS_FAIL   : null,

  CREATE_encargado_SUCCESS: null,
  UPDATE_encargado_SUCCESS: null,
  REMOVE_encargado_SUCCESS: null,

  ON_encargado_CREATE: null,
  ON_encargado_UPDATE: null,
  ON_encargado_REMOVE: null,
});

function mirrorKeys(obj) {
  const mirroredObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mirroredObject[key] = key
    }
  }

  return mirroredObject
}