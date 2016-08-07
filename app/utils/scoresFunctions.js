export function checkMode(state){
    switch(state){
        case(state.get('pretest'.size === 0)):
            return 'pretest'
        case(state.get('training').size < 3):
            return 'training'
        case(state.get('posttest').size < 2):
            return 'posttest'
    }
}

export function setScores({ mode, state }){
    const mode = state.training.get('mode')
    const score = state.training.get('score')
    switch(mode){
        case 'pretest':
            return {
                mode,
                round: state.scores.get('pretest').size + 1,
                score: state.get('score')
            }
        case 'training':
            return {
                mode,
                round: state.scores.get('training').size + 1,
                score
            }
        case 'posttest':
            return {
                mode,
                round: state.scores.get('posttest').size + 1,
                score
            }
    }

}