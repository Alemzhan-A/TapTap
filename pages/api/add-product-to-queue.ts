import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { productLink, product_name, initial_price, current_price, conversation_link, seller_phone,
      chat_history } = req.body;
    const token = req.headers.authorization;

    try {
      const response = await axios.post(
        `https://web-production-8d99.up.railway.app/api/queue/add`,
        { 
          productLink, 
          product_name, 
          initial_price, 
          current_price, 
          conversation_link,
          seller_phone,
          chat_history,
        },
        { headers: { Authorization: token } }
      );
      console.log('Данные, отправляемые на сервер Railway:', {
        productLink,
        product_name,
        initial_price,
        current_price,
        conversation_link,
        seller_phone,
        chat_history,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error calling backend server:', error);
      res.status(500).json({ success: false, message: 'Произошла ошибка при добавлении продукта в очередь' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
}