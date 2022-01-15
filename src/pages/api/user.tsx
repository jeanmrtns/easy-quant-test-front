import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

interface ResponseType {
  message: string;
}

export default async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  const db = await connectToDatabase();

  const { email, password } = req.body.params;

  try {
    const response = await db.collection('users').findOne({
      email, password
    })

    return res.json(response);

  } catch (error) {
    throw new Error('Invalid credentials' + error);
  }
}