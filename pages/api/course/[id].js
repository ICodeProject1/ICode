import connectMongo from "../../../database/connection";
import Course from "../../../model/Course";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  connectMongo().catch(() => res.json({ error: "Connection failed" }));

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const course = await Course.findById(id);
      res.status(201).json(course);
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const course = await Course.findById(id);
    try {
      if (session.user.role === "admin") {
        const deletedCourse = await Course.findOneAndDelete({ _id: id });
        res.status(201).json({ status: true, course: deletedCourse });
      } else if (session.user.role.split("admin")[1] === course.type) {
        const deletedCourse = await Course.findOneAndDelete({ _id: id });
        res.status(201).json({ status: true, course: deletedCourse });
      } else {
        res.status(404).json({ error: "You can't delete that user" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
