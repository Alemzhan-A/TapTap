import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const response = await axios.get(`https://multiple-silvana-taptaptap-21f8273d.koyeb.app/api/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product' });
  }
};