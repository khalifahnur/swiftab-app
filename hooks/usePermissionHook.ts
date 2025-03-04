import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Camera } from "react-native-vision-camera";
import * as Notifications from "expo-notifications";
import messaging from '@react-native-firebase/messaging';

export const useAppPermissions = () => {
  const [permissions, setPermissions] = useState({
    location: false,
    camera: false,
    notifications: false,
    firebaseMessaging: false
  });

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Location permission
        const locationStatus = await Location.requestForegroundPermissionsAsync();
        const hasLocationPermission = locationStatus.status === "granted";

        // Camera permission
        let hasCameraPermission = false;
        const cameraStatus = await Camera.getCameraPermissionStatus();
        if (cameraStatus !== "granted") {
          hasCameraPermission = (await Camera.requestCameraPermission()) === "granted";
        } else {
          hasCameraPermission = true;
        }

        // Expo notifications permission
        let hasNotificationPermission = false;
        const { status: notifStatus } = await Notifications.getPermissionsAsync();
        if (notifStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          hasNotificationPermission = status === "granted";
        } else {
          hasNotificationPermission = true;
        }

        // Firebase messaging permission
        let hasFirebasePermission = false;
        const authStatus = await messaging().requestPermission();
        hasFirebasePermission = 
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        // Update state
        setPermissions({
          location: hasLocationPermission,
          camera: hasCameraPermission,
          notifications: hasNotificationPermission,
          firebaseMessaging: hasFirebasePermission
        });

        if (!hasNotificationPermission || !hasFirebasePermission) {
          alert("Please enable notifications in settings!");
        }
      } catch (error) {
        console.error("Permission error:", error);
      }
    };

    requestPermissions();
  }, []);

  return permissions;
};