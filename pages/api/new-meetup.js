import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { title, description, image, address } = req.body;
      const client = await MongoClient.connect(
        "mongodb+srv://atul:tester%40123@meetupcluster.ah8o1.mongodb.net/?retryWrites=true&w=majority&appName=MeetupCluster"
      );
      const db = client.db();

      const meetupCollection = db.collection("meetups");

      const result = await meetupCollection.insertOne({
        title,
        image,
        description,
        address,
      });

      console.log(result);

      client.close();

      return res.status(201).json({ message: "Meetup Inserted!" });
    }
  } catch (err) {
    console.log(err);
  }
}
