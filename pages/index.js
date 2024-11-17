import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGO_DB_URI);
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const result = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: result.map((res) => ({
        ...res,
        id: res._id.toString(),
        _id: null,
      })),
    },
    revalidate: 1,
  };
}
