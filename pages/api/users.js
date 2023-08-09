import connectMongo from "../../database/connection";
import User from "../../model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "GET") {
    try {
      if (session.user.role === "admin") {
        const users = await User.find();
        res.status(201).json({ status: true, users });
      } else if (session.user.role === "adminhr") {
        const users = await User.find();
        const updatedUsers = users.filter(
          (user) => !user.role.includes("admin")
        );
        res.status(201).json({ status: true, users: updatedUsers });
      } else if (
        session.user.role.includes("admin") &&
        session.user.role !== "admin"
      ) {
        const users = await User.find({
          role: session.user.role.split("admin")[1],
        });
        res.status(201).json({ status: true, users });
      } else {
        res.status(404).json({ error: "Data can't be fetched" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const user = await User.findById(id);
    try {
      if (!req.body) res.status(404).json({ error: "No Data Found!" });
      if (session.user.role === "admin") {
        const deletedUser = await User.findOneAndDelete({ _id: id });
        res.status(201).json({ status: true, user: deletedUser });
      } else if (session.user.role === "adminhr") {
        const deletedUser = await User.findOneAndDelete({ _id: id });
        res.status(201).json({ status: true, user: deletedUser });
      } else if (session.user.role.split("admin")[1] === user.role) {
        const deletedUser = await User.findOneAndDelete({ _id: id });
        res.status(201).json({ status: true, user: deletedUser });
      } else {
        res.status(404).json({ error: "You can't delete that user" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
