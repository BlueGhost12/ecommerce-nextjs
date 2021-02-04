import path from 'path';
import axios from 'axios';
import { server } from '../../../Config';

export default async function handler(req, res) {
    let fs = require('fs');

    //read JSON file
    let rawData = fs
        .readFileSync(path.join(process.cwd(), './public/invoices.json'))
        .toString();
    let JSONinvoices = JSON.parse(rawData);

    if (req.method === 'POST') {
        // set invoice ID
        req.body.invoiceId = 'Shopee_' + (JSONinvoices.length + 1).toString();
        // req.body.invoiceId = 'Shopee_1';

        // modify JSONinvoices
        JSONinvoices.push(req.body);

        // write to JSON file
        fs.writeFileSync(
            path.join(process.cwd(), './public/invoices.json'),
            JSON.stringify(JSONinvoices, null, 4),
            'utf-8'
        );

        res.status(200).json({
            message: 'Invoice created successfully',
            invoiceId: req.body.invoiceId,
        });
    } else if (req.method === 'GET') {
        let result = await axios.get(`${server}/invoices.json`);
        res.status(200).json(result.data);
    }
}
