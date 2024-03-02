/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Meetup = "meetup",
  Message = "message",
  Notification = "notification",
  Tag = "tag",
  User = "user",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type MeetupRecord = {
  meetupName: string;
  messages?: RecordIdString[];
  users?: RecordIdString[];
};

export type MessageRecord = {
  fromUser?: RecordIdString;
  meetup?: RecordIdString[];
  message?: string;
  timeStamp?: IsoDateString;
};

export type NotificationRecord = {
  forUser?: RecordIdString;
  message?: string;
};

export type TagRecord = {
  name: string;
  numSearching?: number;
  user?: RecordIdString[];
};

export enum UserGenderOptions {
  "male" = "male",
  "female" = "female",
}
export type UserRecord = {
  bio?: string;
  gender?: UserGenderOptions;
  latitude?: number;
  longitude?: number;
  meetups?: RecordIdString[];
  messages?: RecordIdString[];
  notifications?: RecordIdString[];
  profilePicture?: string;
  searching?: boolean;
  selectedTags?: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type MeetupResponse<Texpand = unknown> = Required<MeetupRecord> &
  BaseSystemFields<Texpand>;
export type MessageResponse<Texpand = unknown> = Required<MessageRecord> &
  BaseSystemFields<Texpand>;
export type NotificationResponse<Texpand = unknown> =
  Required<NotificationRecord> & BaseSystemFields<Texpand>;
export type TagResponse<Texpand = unknown> = Required<TagRecord> &
  BaseSystemFields<Texpand>;
export type UserResponse<Texpand = unknown> = Required<UserRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  meetup: MeetupRecord;
  message: MessageRecord;
  notification: NotificationRecord;
  tag: TagRecord;
  user: UserRecord;
};

export type CollectionResponses = {
  meetup: MeetupResponse;
  message: MessageResponse;
  notification: NotificationResponse;
  tag: TagResponse;
  user: UserResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "meetup"): RecordService<MeetupResponse>;
  collection(idOrName: "message"): RecordService<MessageResponse>;
  collection(idOrName: "notification"): RecordService<NotificationResponse>;
  collection(idOrName: "tag"): RecordService<TagResponse>;
  collection(idOrName: "user"): RecordService<UserResponse>;
};
