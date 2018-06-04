export const NEW_MESSAGES          = 'NEW_MESSAGES'

const initialState = {
  lastupdate: 0,
}
function messages(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGES:
      return Object.assign({}, state, {lastupdate:action.lastupdate})
    default:
      return state
  }
}

export default messages
