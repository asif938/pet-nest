import { messaging } from "./firebase.init";
import { getToken } from "firebase/messaging";
import axios from "axios";

export const askForNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        await axios.post("/save-token", { token, userId });
      }
    }
  } catch (error) {
    console.error("FCM Error:", error);
  }
};
