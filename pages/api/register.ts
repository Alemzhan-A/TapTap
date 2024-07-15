import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, olxEmail, password } = req.body;
    if (!username || !olxEmail || !password) {
      return res.status(400).json({ success: false, message: 'Все поля обязательны' });
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        username,
        olxEmail,
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