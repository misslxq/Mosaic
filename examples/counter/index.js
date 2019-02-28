import Mosaic from '../../src/index';
import { traverse } from '../../src/util';

// const Counter = new Mosaic({
//     data: { count: 0 },
//     view: (d, a) => html`<div>
//         <p>${d.count}</p>
//     </div>`
// });
// const i1 = Counter.place({ count: 10 });
// const i2 = Counter.place({ count: 89 });
// const i3 = Counter.place({ count: 35 });
// console.log(i1, i2, i3);

// Define this property on all HTML elements.

// Create the elements and add them to the dom.
const a = document.createElement('div');
const b = document.createElement('h1');
const c = document.createElement('p');
let copyA = document.createElement('div');
c.innerHTML = 'This is a paragraph inside a header inside a div.';

b.appendChild(c);
a.appendChild(b);
copyA = document.importNode(a, true);

document.getElementById('root').appendChild(a);
document.getElementById('root').appendChild(copyA);

// Traverse the nodes the first time and create keys for them. These will 
// persist throughout each template instance, so when you query them later
// you should get every instance that matches that key.
traverse(document.getElementById('root'), node => {
    // node.__mosaicKey = ('' + Math.random()).slice(2);
    node.setAttribute('__mosaicKey', ('' + Math.random()).slice(2));
});
copyA.setAttribute('__mosaicKey', a.getAttribute('__mosaicKey'));

console.log(a.getAttribute('__mosaicKey'));
console.log(b.getAttribute('__mosaicKey'));
console.log(c.getAttribute('__mosaicKey'));
console.log(copyA.getAttribute('__mosaicKey'));

// Query the nodes for the same values. This shows how you can locate exact
// DOM tempate nodes by using this __mosaicKey property.
const sel = `[__mosaicKey='${a.getAttribute('__mosaicKey')}']`;
const domToChange = document.querySelectorAll(sel);
console.log(domToChange);



// new Mosaic({
//     element: '#root',
//     data: { count: 5, name: 'header' },
//     created: (data, actions) => {
//         setTimeout(() => {
//             data.count += 5;
//             data.name = "my-header";
//         }, 3000);
//         // setTimeout(() => {
//         //     data.count += 5;
//         //     data.name = "navigation";
//         // }, 5000);
//     },
//     updated: (data, actions) => {
//         // console.log(data);
//     },
//     view: (data, actions) => html`<div>
//         <h1>Current Count:</h1>
//         <h2>${data.count}</h2>
//         <br>
//         <div>
//             <p class="${data.name}">${data.count}</p>
//         </div>
//     </div>`
// }).paint();