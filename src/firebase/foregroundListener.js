import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase.init";

onMessage(messaging, (payload) => {
  console.log("Foreground FCM:", payload);

  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
