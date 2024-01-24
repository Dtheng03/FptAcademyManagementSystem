//GlobalState
const initialState = {

}

var Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "":
            return {
                ...state
            }

        default:
            return state
    }
}

export default Reducer;