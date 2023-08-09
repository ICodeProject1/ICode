import connectMongo from "../../../database/connection";
import Table from "../../../model/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "PUT") {
    const { id } = req.query;
    const {
      starting,
      attendance,
      final,
      bonus,
      tasks,
      attitude,
      name,
      role,
      newTable,
    } = req.body;
    try {
      if (session.user.role === "admin" || session.user.role === "adminhr") {
        const table = await Table.findOneAndUpdate(
          { _id: id },
          {
            starting,
            attendance,
            final,
            bonus,
            tasks,
            attitude,
            name,
            role,
            newTable,
          }
        );
        res.status(201).json(table);
      } else {
        res.status(404).json({ error: "You can't fetch data" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      if (session.user.role === "admin" || session.user.role === "adminhr") {
        const table = await Table.findByIdAndDelete(id);
        res.status(201).json({ status: true, table });
      } else {
        res.status(404).json({ error: "You can't fetch data" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
