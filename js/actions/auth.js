export const login = (user,token) => {
    return {
        type: 'LOGIN',
        user:user,
        token:token,
    };
};

export const setbalance = (balance) => {
    return {
        type: 'SETBALANCE',
        balance:balance,
    };
};

export function logout(){
    return {
        type: 'LOGOUT'
    };
};
