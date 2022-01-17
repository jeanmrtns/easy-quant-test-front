import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  const db = await connectToDatabase();

  const { email, password } = req.body.params;

  try {
    const response = await db.collection('users').findOne({
      email, password
    });

    const data = {
      email: response.email,
      id: response._id
    }

    return res.json(data);

  } catch (error) {
    throw new Error('Invalid credentials');
  }
}