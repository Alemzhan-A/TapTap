import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при поиске продуктов');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
      res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}