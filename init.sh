#!/bin/bash

# Create the configuration directory if it doesn't exist
mkdir -p src/configuration

# Create pnConfig.ts
cat > src/configuration/pnConfig.ts << 'EOF'
export const Config = {
  APNS_KEY_PATH: "./path/to/your/apns/key.p8",
  APNS_KEY_ID: "YOUR_APNS_KEY_ID",
  APNS_TEAM_ID: "YOUR_APNS_TEAM_ID",
  BUNDLE_ID: "com.yourcompany.yourapp"
};
EOF

# Create pushNotificationData.ts
cat > src/configuration/pushNotificationData.ts << 'EOF'
import { PushNotificationInput } from "../constant/types";

export const pushNotificationData: PushNotificationInput = {
  devicePushToken: "YOUR_DEVICE_PUSH_TOKEN_HERE",
  title: "Test Notification",
  body: "This is a test push notification",
  production: true, //false for development (sandbox), true for production
  data: {
    //your data here
  }
};
EOF

echo "✅ Configuration files created successfully!"
echo "📁 Created: src/configuration/pnConfig.ts"
echo "📁 Created: src/configuration/pushNotificationData.ts"
echo ""
echo "🔧 Next steps:"
echo "1. Set up your environment variables or update the configuration files with your actual values"
echo "2. Make sure to add sensitive configuration files to .gitignore if needed"
