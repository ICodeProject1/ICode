import connectMongo from "../../database/connection";
import User from "../../model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "PUT") {
    if (!req.body) return res.status(404).json({ error: "No data found" });
    const { name } = req.body;
    if (name.length < 3) {
      return res
        .status(404)
        .json({ error: "Name must be more then 3 chars long" });
    } else if (name.includes(" ") || name === session.user.name) {
      return res.status(404).json({ error: "Invalid Name" });
    }

    try {
      const user = await User.updateOne(
        { username: session.user.username },
        { name }
      );
      res.status(201).json({ status: true, user });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only PUT Accepted" });
  }
}
