import { fromJS } from 'immutable'

const SET_SCORE = 'SET_SCORE'

export function setScoreReducer({mode, round, score}){
    return {
        type: SET_SCORE,
    }
}

const initialState = fromJS({
    pretest: {},
    training: {},
    //MAYBE FOR POSTTEST HAVE THE NOTES MOST MISSED SO YOU CAN RUN THE SPOTIFY FEATURE WITH THOSE.
    posttest: {},
    memoryMatch:{}
})

export default function scores(state = initialState, action) {
    switch(action.type){
        case SET_SCORE:
            return state.merge({
                [action.mode]: state.set(action.round, action.score)
            })
        default:
            return state
    }
}