"use client";

import PocketBase from "pocketbase";

import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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

const HARD_CODED = "fbc9i9k93o0mlxd";

// export const client = new PocketBase("http://192.168.43.238:8090");
const pb = new PocketBase("http://127.0.0.1:8090");

interface Message {
  id: string;
  text: string;
  user?: string;
}

export const appendToCache = async (
  index: [string],
  queryClient: QueryClient,
  newData: any
) => {
  queryClient.setQueryData(index, newData);
};

export default function MatchRoom() {
  const queryClient = new QueryClient();

  const { data: todo, isLoading } = useQuery({
    queryKey: ["peeps"],
    queryFn: async () => {
      const res = await pb.collection("peeps").getOne(HARD_CODED);
      return res;
    },
  });

  const { data: messages, isLoading: messagesIsLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = (await pb.collection("messages").getFullList()).map(
        (rec): Message => {
          return {
            id: rec.id,
            text: rec.data.text,
            user: rec.data.user,
          };
        }
      );
      return res;
    },
  });

  useEffect(() => {
    // try to create an object with the same id as the one we are fetching if it doesn't exist

    // fetch the object once and then subscribe to it
    const unsubscribePromise = pb
      .collection("peeps")
      .subscribe(HARD_CODED, (e) => {
        appendToCache(["peeps"], queryClient, e.record);
      });

    const unsubscribePromise2 = pb
      .collection("messages")
      .subscribe("*", (e) => {
        console.log("wr2", e);

        if (e.action === "create") {
          appendToCache(["messages"], queryClient, e.record);
        }
      });

    return () => {
      (async () => {
        (await unsubscribePromise)();
      })();
    };
  }, []);

  console.log("data", todo);
  console.log("messages", messages);

  return (
    <>
      <div>{JSON.stringify(todo)}</div>

      <hr />

      {/* map the messages */}

      {messages?.map((message: { id: string; text: string }) => {
        return (
          <div key={message.id}>
            <div>{message.text}</div>
          </div>
        );
      })}
    </>
  );
}
