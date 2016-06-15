import { STORE_SOURCE, STORE_DESTINATION, STORE_LATLNG, STORE_SOURCE_LABEL, STORE_DESTINATION_LABEL } from './../actions/mapActions';

export function source(state = '', action) {
  switch(action.type) {
    case STORE_SOURCE:
      return action.source;
    default:
      return state;
  }
}

export function sourceLabel(state = '', action) {
  switch(action.type) {
    case STORE_SOURCE_LABEL:
      return action.sourceLabel;
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

export function destinationLabel(state = '', action) {
  switch(action.type) {
    case STORE_DESTINATION_LABEL:
      return action.destinationLabel;
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
