import { STORE_SOURCE, STORE_DESTINATION, STORE_LATLNG } from './../actions/account';

export function source(state = '', action) {
  switch(action.type) {
    case STORE_SOURCE:
      return action.source;
    default:
      return state;
  }
}

export function destination(state = '', action) {
  switch(action.type) {
    case STORE_DESTINATION:
      return action.destination;
    default:
      return state;
  }
}

export function latlngs(state = [], action) {
  switch(action.type) {
    case STORE_LATLNG:
      return action.latlngs;
    default:
      return state;
  }
}
