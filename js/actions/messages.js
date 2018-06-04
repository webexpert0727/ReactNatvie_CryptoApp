export function newMessages(lastupdate) {
  return {
    type: 'NEW_MESSAGES',
    lastupdate:lastupdate
  };
}
