import { PushNotificationInput } from "../constant/types";

export const pushNotificationData: PushNotificationInput = {
  devicePushToken: "your push token",
  title: "title",
  body: "body",
  production: true, //false for development (sandbox), true for production
  data: {
    //your data here
  },
};
