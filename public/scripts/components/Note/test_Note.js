import { expect, renderComponent } from 'scripts/test_helper'
import { Note } from 'scrips/components'

describe('Note', () => {

    beforeEach(() => {
        const component = renderComponent(Note);
    })

    it('is component legit',() =>{
        expect(component).to.exist;
    })

})