const initialState = {
  host: 'http://v28.smartcontrol.today',
  api_key:'303302c05122b945e19b6804a5151825'
}



const config = (state=initialState, action) => {

  switch (action.type) {
    case 'SAVE_CONFIG':
        return	Object.assign({},	state,	{host:action.host, api_key:action.api_key})
    default:
      return state
  }
}

export default	config
