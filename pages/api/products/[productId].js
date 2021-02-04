import db from '../../../public/db.json';
import axios from 'axios';

export default async function handler({ query: { productId } }, res) {
    const result = await axios.get('http://localhost:3000/db.json');
    const product = result.data.find(
        (item) => item.id.toString() === productId.toString()
    );
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(400).json({
            message: `Product with id ${productId} not found.`,
        });
    }
}
