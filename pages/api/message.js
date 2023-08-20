import connectMongo from "../../database/connection";
import Message from "../../model/Message";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "GET") {
    try {
      if (session.user.role === "admin") {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(201).json({ status: true, messages });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No data found" });
    const { name, whatsapp, email, message } = req.body;
    try {
      const response = await Message.create({
        name,
        whatsapp,
        email,
        message,
      });
      res.status(201).json({ status: true, response });
    } catch (error) {
      res.status(404).json({ error });
    }
  }
  if (req.method === "DELETE") {
    if (!req.body) return res.status(404).json({ error: "No data found" });
    const { id } = req.body;
    try {
      if (session.user.role === "admin") {
        await Message.findByIdAndDelete(id);
        res.status(201).json({ status: true });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
