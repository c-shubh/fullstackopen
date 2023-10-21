export type NumberProperties<T> = {
  [K in keyof T]: number;
};
