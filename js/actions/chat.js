
export function newChatMessages(lastupdate) {
  return {
    type: 'NEW_CHAT_MESSAGES',
    lastupdate:lastupdate
  };
}
