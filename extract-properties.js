const propertiesNotWritable = [];

function extract(o) {
    for (let i in o.prototype) {
        if (o.prototype.hasOwnProperty(i)) {
            let p = Object.getOwnPropertyDescriptor(o.prototype, i);
            if (!p.writable && !p.set && !propertiesNotWritable.includes(i))
                propertiesNotWritable.push(i)
        }
    }
}

extract(Node);
extract(Element);
extract(HTMLElement);

console.log(propertiesNotWritable.length);
console.log(JSON.stringify(propertiesNotWritable, null, 4));