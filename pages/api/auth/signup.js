import connectMongo from "../../../database/connection";
import User from "../../../model/User";
import { hash, genSaltSync } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No data found" });
    const { username, name, password, role } = req.body;
    // console.log(req.body);

    const check = await User.findOne({ username });
    if (check) return res.status(422).json({ message: "User already exists" });

    try {
      const salt = await genSaltSync(10);
      const user = await User.create({
        name,
        role,
        username,
        password: await hash(password, salt),
      });

      res.status(201).json({ status: true, user });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
