const AlertReducer = (state, action) => {

    switch (action.type) {
        case 'SET_ALERT':
            // set state to action.payload 
            return action.payload

        case 'REMOVE_ALERT':
            return null


        default:
            return state
    }


}

export default AlertReducer