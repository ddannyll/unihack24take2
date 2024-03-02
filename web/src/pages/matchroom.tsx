import PocketBase from "pocketbase";

export interface PeepResponse {
  id: string;
  created: string;
  updated: string;
  "@collectionId": string;
  "@collectionName": string;
  age: number;
  bio: string;
  name: string;
  "@expand": {};
}

// export const client = new PocketBase("http://192.168.43.238:8090");
export const client = new PocketBase("http://127.0.0.1:8090");
export const realTime = async (index: [string], queryClient: QueryClient) => {
  return await client.realtime.subscribe("peeps", function (e) {
    console.log("real time peeps", e.record);
  });
};

export const allPeeps = async (): Promise<PeepResponse[] | Record[]> => {
  return await client.records.getFullList("peeps", 200 /* batch size */, {
    sort: "-created",
  });
};

export default function MatchRoom() {
  return <div>hello world</div>;
}
