export const updateprice = (data) => {
    return {
        type: 'UPDATEPRICE',
        data:data,
    };
};

export const setactivecoins = (data) => {
    return {
        type: 'SETACTIVECOINS',
        data:data,
    };
};
