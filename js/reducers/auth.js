const defaultState = {
    isLoggedIn: false,
    user:{},
    token:''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                user:action.user,
                token:action.token,
            });
        case 'SETBALANCE':
            return Object.assign({}, state, {
              });
        case 'LOGOUT':
            return {
              isLoggedIn: false,
              user:{},
              token:''
            };
        default:
            return state;
    }
}
