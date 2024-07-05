import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const BACKEND_URL = "https://web-production-096d.up.railway.app/" || 'http://localhost:3000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, productLink } = req.body;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/olx-login`, {
        email,
        password,
        productLink
      });
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