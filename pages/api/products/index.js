import axios from 'axios';

export default async function handler(req, res) {
    // console.log(req.method);
    let result = await axios.get('http://localhost:3000/db.json');
    res.status(200).json(result.data);
}
