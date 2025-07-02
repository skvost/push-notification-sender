export type PushNotificationInput = {
  body?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  titleLocKey?: string;
  titleLocArgs?: string[];
  bodyLocKey?: string;
  bodyLocArgs?: string[];
  devicePushToken: string;
  production: boolean;
  title?: string;
};
