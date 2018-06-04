
export function saveConfig(host,api_key) {
  return {
    type: 'SAVE_CONFIG',
    host:host,
    api_key:api_key
  };
}
