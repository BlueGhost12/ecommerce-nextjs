import path from 'path';
import axios from 'axios';
import { server } from '../../../Config';

export default async function handler({ query: { invoiceId }, method }, res) {
    let fs = require('fs');

    //read JSON file
    let rawData = fs
        .readFileSync(path.join(process.cwd(), './public/invoices.json'))
        .toString();
    let JSONinvoices = JSON.parse(rawData);

    if (method === 'GET') {
        let result = await axios.get(`${server}/invoices.json`);
        const invoice = result.data.find(
            (invoice) => invoice.invoiceId.toString() === invoiceId.toString()
        );
        !!invoice
            ? res.status(200).json(invoice)
            : res.status(200).json({ message: 'Invoice not found' });
    }
}
