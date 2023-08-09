import connectMongo from "../../database/connection";
import User from "../../model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "PUT") {
    if (!req.body) return res.status(404).json({ error: "No data found" });
    const { username } = req.body;
    if (username.length < 3) {
      return res
        .status(404)
        .json({ error: "Username must be more then 3 chars long" });
    } else if (username.includes(" ") || username === session.user.username) {
      return res.status(404).json({ error: "Invalid Username" });
    }

    try {
      const user = await User.updateOne(
        { username: session.user.username },
        { username }
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
