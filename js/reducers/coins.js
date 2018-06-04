const defaultState = {
    coins:{},
    lastupdate:0
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATEPRICE':
            date = new Date();
            newlastupdate = state.lastupdate
            lastupdate = date.getTime()
            items = Object.assign({},state.coins);
            if (state.coins[action.data.coin]){
              if (items[action.data.coin].lastupdate+1000<lastupdate){
                items[action.data.coin].price = action.data.msg.price.toPrecision(6);
                items[action.data.coin].lastupdate = lastupdate;
                newlastupdate = lastupdate;
              }
            }
            return Object.assign({}, state, {
                coins:items,
                lastupdate:newlastupdate
            });
        case 'SETACTIVECOINS':
            lastupdate = date.getTime()
            return Object.assign({}, state, {
                coins:action.data,
                lastupdate:lastupdate
            });
        default:
            return state;
    }
}
