import { UUID } from "crypto";

export interface User {
  id: UUID;
  name: string;
  friends: Friend[];
}

export interface Friend {
  id: UUID;
  name: string;
}
