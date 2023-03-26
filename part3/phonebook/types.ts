export interface Person {
  id: number;
  name: string;
  number: string;
}

export type PersonOmitId = Omit<Person, "id">;
