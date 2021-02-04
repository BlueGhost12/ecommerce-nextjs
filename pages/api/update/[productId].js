import * as path from 'path';
export default function handler(req, res) {
    let fs = require('fs');

    //read JSON file
    let rawData = fs.readFileSync('./public/db.json').toString();
    let JSONproducts = JSON.parse(rawData);

    JSONproducts.forEach((prod) => console.log(prod));

    //modify JSOnproducts
    // JSONproducts = JSONproducts.map((product) =>
    //     product.id.toString() === req.query.productId.toString()
    //         ? { ...product, stock: product.stock - 1 }
    //         : product
    // );

    //write to JSON file
    // fs.writeFileSync(
    //     './public/db.json',
    //     JSON.stringify(JSONproducts, null, 4),
    //     'utf-8'
    // );

    res.status(200).json({ message: 'done' });
}
