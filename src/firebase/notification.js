import { messaging } from "./firebase.init";
import { getToken } from "firebase/messaging";
import axios from "axios";

// export const askForNotificationPermission = async (userId) => {
//   try {
//     const permission = Notification.permission;

//     // ✅ Permission already granted → just get the token
//     if (permission === "granted") {
//       const token = await getToken(messaging, {
//         vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//       });

//       if (token) {
//         await axios.post("/save-token", { token, userId });
//       }

//       return token;
//     }

//     // ✅ First time asking (permission = "default")
//     if (permission === "default") {
//       const result = await Notification.requestPermission();

//       if (result === "granted") {
//         const token = await getToken(messaging, {
//           vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//         });

//         if (token) {
//           await axios.post("/save-token", { token, userId });
//         }

//         return token;
//       }

//       // ❌ User clicked "Block" → do nothing
//       console.log("User denied notifications");
//       return null;
//     }

//     // ✅ User has already blocked notifications
//     if (permission === "denied") {
//       console.log("Notifications blocked by user");
//       return null;
//     }

//   } catch (error) {
//     console.error("FCM Error:", error);
//     return null;
//   }
// };


export const askForNotificationPermission = async (userId) => {
    try {
      const permission = await Notification.requestPermission();
  
      if (permission === "granted") {
        // ✅ User allowed → safe to get token
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
  
        if (token) {
          await axios.post("/save-token", { token, userId });
        }
      }
  
      if (permission === "denied") {
        console.warn("⚠️ Notifications are blocked by the user.");
        return; // ✅ DO NOT call getToken()
      }
  
      // "default" (user closed popup without choosing)
      if (permission === "default") {
        console.log("User dismissed permission dialog.");
        return;
      }
  
    } catch (error) {
      console.error("FCM Error:", error);
    }
  };
  