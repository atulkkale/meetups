import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupDetail.title}</title>
        <meta name="description" content={props.meetupDetail.description} />
      </Head>
      <MeetupDetail
        title={props.meetupDetail.title}
        image={props.meetupDetail.image}
        address={props.meetupDetail.address}
        description={props.meetupDetail.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://atul:tester%40123@meetupcluster.ah8o1.mongodb.net/?retryWrites=true&w=majority&appName=MeetupCluster"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const result = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: result.map((res) => ({ params: { meetupId: res._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://atul:tester%40123@meetupcluster.ah8o1.mongodb.net/?retryWrites=true&w=majority&appName=MeetupCluster"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupDetail: {
        ...selectedMeetup,
        id: selectedMeetup._id.toString(),
        _id: null,
      },
    },
  };
}
