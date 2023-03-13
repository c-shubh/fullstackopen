import { useEffect, useState } from "react";
import type { NotificationType } from "../types";

interface NotificationProps extends NotificationType {}

export default function Notification({ message, type }: NotificationProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 3 * 1000);
  }, [message, type]);

  if (message === "") return <></>;

  return (
    <div className={`notification ${type} ${hidden ? "hidden" : ""}`}>
      {message}
    </div>
  );
}
