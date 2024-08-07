import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
      return res.status(400).json({ success: false, message: 'Все поля обязательны' });
    }

    try {
      const response = await axios.post(`https://web-production-8d99.up.railway.app/api/auth/register`, {
        username,
        name,
        password
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error calling backend server:', error);
      res.status(500).json({ success: false, message: 'Произошла ошибка при регистрации' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
}