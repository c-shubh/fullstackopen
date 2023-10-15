interface MongoServerError {
  code: number;
  message: string;
}

const MongoServerError = {
  DuplicateKeyError: 11000,
} as const;

export default MongoServerError;
