import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  StyleSheet,
  Linking,
  StatusBar,
} from "react-native";
import { usePermissions } from "@/hooks/usePermissions";
import { EPermissionTypes } from "../../constants";
import { RESULTS } from "react-native-permissions";
import { goToSettings } from "@/lib/helpers";
import { CameraScanner } from "@/components/Scan/CameraScanner";
import { color } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export const Container = () => {
  const { askPermissions } = usePermissions(EPermissionTypes.CAMERA);
  const [cameraShown, setCameraShown] = useState(false);
  const [qrText, setQrText] = useState("");
  const [scanSuccess, setScanSuccess] = useState(false);

  function handleBackButtonClick() {
    if (cameraShown) {
      setCameraShown(false);
      return true;
    }
    return false;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [cameraShown]);

  const takePermissions = async () => {
    askPermissions()
      .then((response) => {
        if (
          response.type === RESULTS.LIMITED ||
          response.type === RESULTS.GRANTED
        ) {
          setCameraShown(true);
          setScanSuccess(false);
        }
      })
      .catch((error) => {
        if ("isError" in error && error.isError) {
          Alert.alert(
            error.errorMessage ||
              "Something went wrong while taking camera permission"
          );
        }
        if ("type" in error) {
          if (error.type === RESULTS.UNAVAILABLE) {
            Alert.alert("This feature is not supported on this device");
          } else if (
            error.type === RESULTS.BLOCKED ||
            error.type === RESULTS.DENIED
          ) {
            Alert.alert(
              "Permission Denied",
              "Please give permission from settings to continue using camera.",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Go To Settings", onPress: () => goToSettings() },
              ]
            );
          }
        }
      });
  };

  const handleReadCode = (value: string) => {
    console.log(value);
    setQrText(value);
    setCameraShown(false);
    setScanSuccess(true);
    
    setTimeout(async () => {
      await Linking.openURL(value);
    }, 500);
  };

  const closeScanner = () => {
    setCameraShown(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {!cameraShown ? (
        <View style={styles.scannerCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="qr-code" size={64} color={color.green} />
          </View>
          
          <Text style={styles.cardTitle}>QR Code Scanner</Text>
          
          {scanSuccess && (
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
              <Text style={styles.successText}>Scan successful!</Text>
            </View>
          )}
          
          <TouchableOpacity
            onPress={takePermissions}
            activeOpacity={0.7}
            style={styles.scanButton}
          >
            <Ionicons name="scan-outline" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
          
          <Text style={styles.instructionText}>
            Point your camera at a QR code to scan and open the link
          </Text>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={closeScanner}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          
          <CameraScanner
            setIsCameraShown={setCameraShown}
            onReadCode={handleReadCode}
          />
          
          <View style={styles.scanOverlay}>
            <Text style={styles.scannerInstructions}>
              Position QR code within frame
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f8",
    alignItems: "center",
    justifyContent: "center",
  },
  scannerCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 16,
    backgroundColor: "#f0f4f9",
    padding: 16,
    borderRadius: 50,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: color.green,
    marginBottom: 16,
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f7ee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    justifyContent: "center",
  },
  successText: {
    color: "green",
    marginLeft: 8,
    fontWeight: "500",
  },
  scanButton: {
    backgroundColor: color.green,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  instructionText: {
    color: "#757575",
    textAlign: "center",
    fontSize: 14,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scanOverlay: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  scannerInstructions: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});