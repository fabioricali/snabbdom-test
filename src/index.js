require('../extract-properties');
const snabbdom = require('snabbdom');
const patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/attributes').default, // makes it easy to toggle classes
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
const h = require('snabbdom/h').default; // helper function for creating vnodes

const container = document.getElementById('app');

function someFn() {
    console.log('someFn')
}

function anotherEventHandler() {
    console.log('anotherEventHandler')
}

let hook = {
    create(emptyVnode, vnode) {
        //console.log('create', emptyVnode, vnode);
        //console.log('elm is on body', document.body.contains(vnode.elm))
    },
    insert(vnode) {
        //console.log(Object.getOwnPropertyDescriptor(Element.prototype, 'nodeType'))
        //console.dir(vnode.elm)
        //console.log('insert', vnode);
        //console.log('elm is on body', document.body.contains(vnode.elm))
    },
    update(oldVnode, vnode) {
        //vnode.text += '----';
        //console.log('update', oldVnode, vnode)
    },
    destroy(vnode) {
        //console.log('destroy')
    },
    /*remove(vnode, removeCallback) {
        console.log('remove', removeCallback())
    }*/
};

let vnode = h('div', {}, [
    'Time ',
    h('span', {hook, props: {title: 'time'}}, new Date().toLocaleTimeString()),
    h('div', {hook, }, 'other')
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);
//console.log(document.getElementById('tb'))

function click(first, second, e) {
    console.log(first, second, e);
}

let tpl = `
<my-cmp data="${{first: 'wiw'}}">
`;

setInterval(() => {
    let newVnode = h('div-div', {hook, }, [
        'Time',
        h('span', {
            hook,
            style: {
                color: Math.random() > 0.5 ? 'green' : 'orangered'
            },
            data: ['aiaiaiaiia'],
            props: {
                title: 'time',
                //dataset : 3,
                //style: 'color: red',
                nukData: {salutation: 'hello'},
            },
            on: {
                click: [click.bind(click), 'hello', 'wow']
            }
            }, [new Date().toLocaleTimeString(), ' after']),
        ''
    ]);
// Second `patch` invocation
    patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state

    vnode = newVnode;
}, 1000);