import connectMongo from "../../../database/connection";
import Table from "../../../model/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "GET") {
    try {
      if (session.user.role === "admin" || session.user.role === "adminhr") {
        const table = await Table.find();
        res.status(201).json(table);
      } else {
        res.status(404).json({ error: "You can't fetch data" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (req.method === "POST") {
    try {
      if (session.user.role === "admin" || session.user.role === "adminhr") {
        const table = await Table.create({
          name: "",
          role: "hr",
          starting: 0,
          attendance: 0,
          bonus: 0,
          tasks: 0,
          attitude: 0,
          session: 1,
          newTable: true,
          hi: "hello",
        });
        res.status(201).json(table);
      } else {
        res.status(404).json({ error: "You can't fetch data" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
