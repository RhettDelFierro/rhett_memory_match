import { fromJS } from 'immutable'

const SET_PRETEST = 'SET_PRETEST'
const SET_TRAINING = 'SET_TRAINING'
const SET_POSTTEST = 'SET_POSTTEST'

export function setPreset(score){
    return {
        type: SET_PRETEST,
        score
    }
}

export function setTraining(score){
    return {
        type: SET_TRAINING,
        score
    }
}

export function setPosttest(score){
    return {
        type: SET_POSTTEST,
        score
    }
}

const initialState = fromJS({
    pretest: 0,
    training: {},
    posttest: {},
    memoryMatch:{}
})

export default function scores(state = initialState, action) {
    switch(action.type){
        case SET_PRETEST:
            return state.merge({
                pretest: action.score
            })
        case SET_TRAINING:
            return state.merge({
                training: state.setIn(['training', action.score.round], action.score.value)
            })
        case SET_POSTTEST:
            return state.merge({
                posttest: state.setIn(['posttest', action.score.mode], action.score.value)
            })
        default:
            return state
    }
}