import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  StyleSheet,
  Linking,
} from "react-native";
import { usePermissions } from "@/hooks/usePermissions";
import { EPermissionTypes } from "../../constants";
import { RESULTS } from "react-native-permissions";
import { goToSettings } from "@/lib/helpers";
import { CameraScanner } from "@/components/Scan/CameraScanner";
import { color } from "@/constants/Colors";

export const Container = () => {
  const { askPermissions } = usePermissions(EPermissionTypes.CAMERA);
  const [cameraShown, setCameraShown] = useState(false);
  const [qrText, setQrText] = useState("");

  let items = [
    {
      id: 1,
      title: "QR code Scanner",
    },
  ];

  function handleBackButtonClick() {
    if (cameraShown) {
      setCameraShown(false);
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
  }, []);

  const takePermissions = async () => {
    askPermissions()
      .then((response) => {
        //permission given for camera
        if (
          response.type === RESULTS.LIMITED ||
          response.type === RESULTS.GRANTED
        ) {
          setCameraShown(true);
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
    setTimeout(async () => {
      await Linking.openURL(value);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={takePermissions}
        activeOpacity={0.5}
        style={styles.itemContainer}
      >
        <Text style={styles.itemText}>Scan the QR code</Text>
      </TouchableOpacity>
      {cameraShown && (
        <CameraScanner
          setIsCameraShown={setCameraShown}
          onReadCode={handleReadCode}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    marginTop: 30,
    justifyContent: "center",

    paddingLeft: 20,
  },
  itemText: {
    fontSize: 17,
    color: color.navy,
    textAlign:'center'
  },
});
