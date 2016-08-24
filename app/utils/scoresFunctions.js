export function checkMode(state) {

    if (state.get('pretest').size === 0) {
        return 'pretest'
    }
    else if (state.get('training').size < 3) {
        return 'training'
    }
    else if (state.get('posttest').size < 2) {
        return 'posttest'
    }
    else if (state.get('posttest').size === 2) {
        //set-up to displace SET_COMPLETE_DATE
        return 'finished'
    }

}

export function setScores({ mode, state }) {
    const gameMode = state.training.get('mode')
    const score = state.training.get('score')
    switch (mode) {
        case 'pretest':
            return {
                gameMode,
                round: state.scores.get('pretest').size + 1,
                score
            }
        case 'training':
            return {
                gameMode,
                round: state.scores.get('training').size + 1,
                score
            }
        case 'posttest':
            return {
                gameMode,
                round: state.scores.get('posttest').size + 1,
                score
            }
    }
}

