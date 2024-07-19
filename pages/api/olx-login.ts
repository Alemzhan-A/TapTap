import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { productLink } = req.body;
    const token = req.headers.authorization;

    try {
      const response = await axios.post(`https://multiple-silvana-taptaptap-21f8273d.koyeb.app/api/olx-login`, 
        { productLink },
        { headers: { Authorization: token } }
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error calling backend server:', error);
      res.status(500).json({ success: false, message: 'Произошла ошибка при входе' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
}