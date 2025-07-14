import React, {useEffect, useRef, useState} from 'react';
import {Alert, Modal, SafeAreaView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RNHoleView} from 'react-native-hole-view';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {getWindowHeight, getWindowWidth, isIos} from '@/lib/helpers';
import {useAppStateListener} from '../../hooks/useAppStateListener';
import {ICameraScannerProps} from '@/types';
import {Ionicons} from '@expo/vector-icons';

export const CameraScanner = ({
  setIsCameraShown,
  onReadCode,
}: ICameraScannerProps) => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const [isCameraInitialized, setIsCameraInitialized] = useState(isIos);
  const [isActive, setIsActive] = useState(isIos);
  const [flash, setFlash] = useState<'on' | 'off'>(isIos ? 'off' : 'on');
  const {appState} = useAppStateListener();
  const [codeScanned, setCodeScanned] = useState('');

  // Calculate hole dimensions with integer values to avoid precision errors
  const windowWidth = getWindowWidth();
  const windowHeight = getWindowHeight();
  
  const holeX = Math.floor(windowWidth * 0.1);
  const holeY = Math.floor(windowHeight * 0.28);
  const holeWidth = Math.floor(windowWidth * 0.8);
  const holeHeight = Math.floor(windowHeight * 0.4);

  useEffect(() => {
    if (codeScanned) {
      onReadCode(codeScanned);
    }
  }, [codeScanned, onReadCode]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCameraInitialized) {
      timeout = setTimeout(() => {
        setIsActive(true);
        setFlash('off');
      }, 1000);
    }
    setIsActive(false);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCameraInitialized]);

  const onInitialized = () => {
    setIsCameraInitialized(true);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        if (codes[0].value) {
          setIsActive(false);
          setTimeout(() => setCodeScanned(codes[0]?.value), 500);
        }
      }
      return;
    },
  });

  const onCrossClick = () => {
    setIsCameraShown(false);
  };

  const toggleFlash = () => {
    setFlash(prev => (prev === 'on' ? 'off' : 'on'));
  };

  const onError = (error: CameraRuntimeError) => {
    Alert.alert('Error!', error.message);
  };

  if (device == null) {
    Alert.alert('Error!', 'Camera could not be started');
  }

  if (isFocused && device) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Modal presentationStyle="fullScreen" animationType="slide">
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.icon} 
              onPress={onCrossClick}
            >
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.icon}
              onPress={toggleFlash}
            >
              <Ionicons 
                name={flash === 'on' ? "flash" : "flash-off"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
          
          <Camera
            torch={flash}
            onInitialized={onInitialized}
            ref={camera}
            onError={onError}
            photo={false}
            style={styles.fullScreenCamera}
            device={device}
            codeScanner={codeScanner}
            isActive={
              isActive &&
              isFocused &&
              appState === 'active' &&
              isCameraInitialized
            }
          />
          
          <RNHoleView
            holes={[
              {
                x: holeX,
                y: holeY,
                width: holeWidth,
                height: holeHeight,
                borderRadius: 10,
              },
            ]}
            style={[styles.rnholeView, styles.fullScreenCamera]}
          />
          
          <View style={styles.scanInstructions}>
            <Text style={styles.scanText}>Position QR code within frame</Text>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
  
  return null;
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '100%',
    height: 200,
  },
  fullScreenCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 100,
  },
  rnholeView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cameraControls: {
    height: 60,
    top: 15,
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 1000,
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scanInstructions: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});