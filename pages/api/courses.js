import connectMongo from "../../database/connection";
import Course from "../../model/Course";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "GET") {
    try {
      if (session.user.role === "admin") {
        const courses = await Course.find().sort({ order: 1 });
        res.status(201).json({ status: true, courses });
      } else if (
        session.user.role.includes("admin") &&
        session.user.role !== "admin"
      ) {
        const courses = await Course.find({
          type: session.user.role.split("admin")[1],
        }).sort({ order: 1 });
        res.status(201).json({ status: true, courses });
      } else {
        const courses = await Course.find({
          type: session.user.role,
        }).sort({ order: 1 });
        res.status(201).json({ status: true, courses });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, subtitle, description, image, pdf, type, order } =
        req.body;
      if (session.user.role.includes("admin")) {
        const check = await Course.findOne({ type, order });
        console.log(check);
        if (check) {
          return res.status(404).json({ message: "Order already exists" });
        }
        const course = await Course.create({
          title,
          subtitle,
          description,
          image,
          pdf,
          type,
          order,
        });
        res.status(201).json({ status: true, course });
      } else {
        res.status(404).json({ error: "You can't add course" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
