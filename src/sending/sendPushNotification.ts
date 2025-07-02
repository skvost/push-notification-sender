import { Provider, Notification } from "apn";

import "dotenv/config";

import { PushNotificationInput } from "../constant/types";
import { initializeFirebase } from "../firebase/initializeFirebase";
import { isFirebaseError } from "../firebase/isFirebaseError";
import { Config } from "../configuration/pnConfig";
import { pushNotificationData } from "../configuration/pushNotificationData";

const sendiOSPn = async ({
  devicePushToken,
  title,
  body,
  titleLocArgs,
  titleLocKey,
  bodyLocArgs,
  bodyLocKey,
  production,
  data,
}: PushNotificationInput) => {
  production;
  const apnProvider = new Provider({
    token: {
      key: Config.APNS_KEY_PATH,
      keyId: Config.APNS_KEY_ID,
      teamId: Config.APNS_TEAM_ID,
    },
    production,
  });

  const notification = new Notification();
  notification.topic = Config.BUNDLE_ID;

  notification.payload = data;
  console.log("notification: ", notification);
  console.log("data: ", data);

  notification.aps = {
    "content-available": 1,
  };
  notification.alert = {
    title: title || "",
    body: body || "",
    "title-loc-key": titleLocKey || undefined,
    "title-loc-args": titleLocArgs || undefined,
    "loc-key": bodyLocKey || undefined,
    "loc-args": bodyLocArgs || undefined,
  };

  const response = await apnProvider.send(notification, devicePushToken);

  console.log("response.sent: ", response.sent);
  console.log(response.sent.length);
  if (response.sent.length === 0) {
    throw new Error("Notification not sent.");
  }

  console.log("Notification sent successfully - iOS.");
  apnProvider.shutdown();

  return true;
};

export const sendPushNotification = async ({
  devicePushToken,
  title,
  body,
  titleLocArgs,
  titleLocKey,
  bodyLocArgs,
  bodyLocKey,
  production,
  data,
}: PushNotificationInput) => {
  const app = initializeFirebase();

  try {
    const response = await app.messaging().send({
      token: devicePushToken,
      android: {
        notification: {
          title: title ?? undefined,
          body: body ?? undefined,
          titleLocArgs: titleLocArgs ?? undefined,
          titleLocKey: titleLocKey ?? undefined,
          bodyLocArgs: bodyLocArgs ?? undefined,
          bodyLocKey: bodyLocKey ?? undefined,
        },
      },
      data,
    });

    console.log("response: ", response);
    if (response) {
      console.log("Notification sent successfully - Android.");
      return true;
    } else {
      throw new Error("Notification not sent.");
    }
  } catch (error) {
    if (isFirebaseError(error) && error.code === "messaging/invalid-argument") {
      await sendiOSPn({
        devicePushToken,
        title,
        body,
        titleLocArgs,
        titleLocKey,
        bodyLocArgs,
        bodyLocKey,
        production,
        data,
      });

      return true;
    } else {
      throw error;
    }
  }
};

for (let i = 0; i < 1; i++) {
  setTimeout(() => {
    sendPushNotification(pushNotificationData).then((result) => {
      console.log("result: ", result);
    });
  }, 300);
}
