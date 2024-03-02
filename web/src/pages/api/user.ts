import type { NextApiRequest, NextApiResponse } from "next";
import { pb } from "@/features/pocketbase";

interface authResponseType {
  userId: string;
}

interface authParamType {
  email: string;
  password: string;
}

interface errorType {
  error: string;
}

export const register = async (
  req: NextApiRequest,
  res: NextApiResponse<authResponseType | errorType>,
) => {
  if (req.method === "POST") {
    const jsonBody: authParamType = req.body;
    try {
      await pb
        .collection("users")
        .getFirstListItem(`email = "${jsonBody.email}"`);
    } catch (e) {
      res.status(400).json({ error: "user with this email already exists" });
    }
    await pb.collection("user").create({});
  } else {
    return res.status(405).json({ error: "method not allowed" });
  }
};
