export const NEW_CHAT_MESSAGES          = 'NEW_CHAT_MESSAGES'

const initialState = {
  lastupdate: 0,
}
function chat(state = initialState, action) {
  switch (action.type) {
    case NEW_CHAT_MESSAGES:
      return Object.assign({}, state, {lastupdate:action.lastupdate})
    default:
      return state
  }
}

export default chat
