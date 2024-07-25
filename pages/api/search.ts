import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { query } = req.body;
    try {
      const response = await axios.post('https://web-production-8d99.up.railway.app/api/search', 
        { query }, 
        { 
          timeout: 80000, // 30 секунд
          headers: { 'Content-Type': 'application/json' }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
      res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}