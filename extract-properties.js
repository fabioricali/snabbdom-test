const propertiesNotWritable = [];

function canAdd(p, i) {
    if (!p.writable && !p.set && !propertiesNotWritable.includes(i))
        propertiesNotWritable.push(i)
}

for (let i in Node.prototype) {
    if (Node.prototype.hasOwnProperty(i)) {
        let p = Object.getOwnPropertyDescriptor(Node.prototype, i);
        canAdd(p, i);
    }
}

for (let i in Element.prototype) {
    if (Element.prototype.hasOwnProperty(i)) {
        let p = Object.getOwnPropertyDescriptor(Element.prototype, i);
        canAdd(p, i);
    }
}

for (let i in HTMLElement.prototype) {
    if (HTMLElement.prototype.hasOwnProperty(i)) {
        let p = Object.getOwnPropertyDescriptor(HTMLElement.prototype, i);
        canAdd(p, i);
    }
}

console.log(propertiesNotWritable.length)

console.log(JSON.stringify(propertiesNotWritable, null, 4))