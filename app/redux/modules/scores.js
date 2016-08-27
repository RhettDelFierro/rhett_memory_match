import { fromJS, toOrderedMap } from 'immutable'
import { tallyCount } from 'utils/scoresFunctions'

const SET_SCORE = 'SET_SCORE'
const SET_MISSED = 'SET_MISSED'

export function setScoreAction({mode, round, score}){
    return {
        type: SET_SCORE,
        mode,
        round,
        score
    }
}

function setMissed({notesMissed}){
    return {
        type: SET_MISSED,
        notesMissed
    }
}

export function tally(){
    return function (dispatch, getState) {
        const notesMissed = getState().training.get('notesMissed')
        const tallyMap = tallyCount({notesMissed})
        const orderedTally = tallyMap.toOrderedMap()
        dispatch(setMissed({notesMissed: orderedTally}))
    }
}

const initialState = fromJS({
    pretest: {},
    training: {},
    posttest: {},
    memoryMatch:{},
    notesMissed: {}
})

export default function scores(state = initialState, action) {
    switch(action.type){
        case SET_SCORE:
            return state.merge({
                [action.mode]: state.get(action.mode).set(action.round, action.score)
            })
        case SET_MISSED:
            return state.merge({
                notesMissed: action.notesMissed
            })
        default:
            return state
    }
}