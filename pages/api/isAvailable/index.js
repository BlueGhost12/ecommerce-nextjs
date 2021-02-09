export default function handler(req, res) {
    let fs = require('fs');
    let quantity = 0;
    let hasChanged = false;
    let updatedCart = req.body;
    // read JSON file
    let rawData = fs.readFileSync('./public/db.json').toString();
    let JSONproducts = JSON.parse(rawData);

    updatedCart = updatedCart.map(cartProduct => {
        const DbProduct = JSONproducts.find(product => cartProduct.id.toString() === product.id.toString());
        if(cartProduct.instance > DbProduct.stock){
            hasChanged = true;
            quantity += DbProduct.stock;
            return {...cartProduct, instance: DbProduct.stock}
        } else {
            quantity += cartProduct.instance;
            return cartProduct
        }
    });
    updatedCart = updatedCart.filter(cartProduct => cartProduct.instance !== 0);

    res.status(200).json({ updatedCart, hasChanged, quantity });
}
