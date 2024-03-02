import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";
const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8090";

/**
 * NOTE: only use this on the client side, see
 * {@link https://github.com/pocketbase/js-sdk#ssr-integration}
 */
export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
