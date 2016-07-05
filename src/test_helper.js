import React from 'react'
import jsdom from 'jsdom'
import jquery from 'jquery'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import chain, { expect } from 'chai'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'our reducers file (the index.js reference to all the exports'
import chaiJquery from 'chai-jquery'

//setting up jqUer environment in terminal:
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

function renderComponent(componentClass, props, state) {
    //Render our element (the component (in the argument) produced) into a fragment of the document.
    const ComponentInstance = TestUtils.renderIntoDocument(<Provider store={createStore(reducers, state)}>
        <ComponentClass {...props}/>
    </Provider>);

    //Use ReactDOM.findDOMNODE() to get a reference to the HTML that our component produced.
    //Then wrap that with a jquery element so we could do jquery stuff to it.
    return $(ReactDOM.findDOMNode(ComponentInstance));

}

//simulating events on the react component:
$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0], value);

};

//set-up chai-jquery.
//first argument: call with chai.
//last argument is our "funny" instance of jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect }