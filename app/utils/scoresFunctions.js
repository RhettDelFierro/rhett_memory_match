export function checkMode(state){
    switch(state){
        case(state.get('pretest' === 0)):
            return 'pretest'
        case(state.get('training').size < 3):
            return 'training'
        case(state.get('posttest').size < 2):
            return 'posttest'
    }
}