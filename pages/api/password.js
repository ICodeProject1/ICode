import connectMongo from "../../database/connection";
import User from "../../model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { compare, hash, genSaltSync } from "bcryptjs";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "PUT") {
    if (!req.body) return res.status(404).json({ error: "No data found" });
    const { oldPassword, newPassword } = req.body;

    try {
      const user = await User.findOne({ username: session.user.username });
      const check = await compare(oldPassword, user.password);
      if (!check)
        return res.status(404).json({ error: "Incorrect Old Password" });
      const salt = await genSaltSync(10);
      const user2 = await User.updateOne(
        { username: session.user.username },
        { password: await hash(newPassword, salt) }
      );
      res.status(201).json({ status: true, user2 });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
