"use client";

import PocketBase from "pocketbase";

import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Textarea, user } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";

import { Avatar } from "@nextui-org/react";

import { useMatchStore } from "@/features/stores/matchStore";
import { useAuthStore } from "@/features/stores/authStore";

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
  newData: any,
) => {
  queryClient.setQueryData(index, (oldData: any) => {
    if (oldData) {
      return [...oldData, newData];
    }
    return [newData];
  });
};

const UserTab = ({ id }: { id: string }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await pb.collection("users").getOne(id);
      return res;
    },
  });

  return <Avatar name={user?.name || user?.email} />;
};

export default function MatchRoom() {
  const queryClient = new QueryClient();

  const [message, setMessage] = useState("");

  const {
    messages,
    actions: { setMessages, setPeeps, addMessage },
  } = useMatchStore();

  const { userId } = useAuthStore();

  const { data: match, isLoading } = useQuery({
    queryKey: ["peeps"],
    queryFn: async () => {
      const res = await pb.collection("peeps").getOne(HARD_CODED);
      return res;
    },
  });

  const { data: messagesQ1, isLoading: messagesIsLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = (await pb.collection("messages").getFullList()).map(
        (rec): Message => {
          return {
            id: rec.id,
            text: rec.data.text,
            user: rec.data.user,
          };
        },
      );

      //   update the store
      setMessages(res);
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
        const rec = e.record;
        addMessage({
          id: rec.id,
          text: rec.data.text,
          user: rec.data.user,
        });
      });

    return () => {
      (async () => {
        (await unsubscribePromise)();
        (await unsubscribePromise2)();
      })();
    };
  }, []);

  console.log("match", match?.field.includes(userId), userId, match?.field);

  //   get my own id
  return (
    <>
      <div className="w-full">
        <div className="flex gap-3 items-center w-full justify-center p-4 gap-y-4">
          {match?.field.map((id: any) => {
            return <UserTab id={id} />;
          })}
          {/* <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /> */}
          {/* <Avatar name="Joe" /> */}
        </div>

        {!match?.field.includes(userId) && (
          <Button
            className="w-full"
            onPress={() => {
              pb.collection("peeps").update(HARD_CODED, {
                data: {
                  name: "new name",
                },
              });
            }}
          >
            Join Room
          </Button>
        )}
      </div>

      {/* <div>{JSON.stringify(match)}</div> */}

      <hr />

      {/* map the messages */}
      {messages?.map((message: { id: string; text: string }) => {
        return (
          <div key={message.id}>
            <div>{message.text}</div>
          </div>
        );
      })}

      <Textarea
        label="Message"
        placeholder="Enter your description"
        className="max-w-xs"
        onValueChange={(e) => {
          setMessage(e);
        }}
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            pb.collection("messages").create({
              data: {
                text: message.trim(),
                user: "user",
              },
            });
            setMessage("");
          }
        }}
      />
    </>
  );
}
