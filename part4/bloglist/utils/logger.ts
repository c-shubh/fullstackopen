import config from "./config";

const info = (...params: any[]) => {
  if (config.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params: any[]) => {
  if (config.NODE_ENV !== "test") {
    console.error(...params);
  }
};

export default {
  info,
  error,
};
