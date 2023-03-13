export interface Person {
  id: number;
  name: string;
  number: string;
}

export interface NotificationType {
  message: string;
  type: "success" | "failure";
}
