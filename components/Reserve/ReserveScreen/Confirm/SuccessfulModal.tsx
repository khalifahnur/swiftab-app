// components/SuccessModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { color } from '@/constants/Colors';
import LottieView from "lottie-react-native";

interface SuccessModalProps {
  visible:boolean;
  handleModalVisible: ()=>void;
  reservationDetails: {
    name: string;
    date: string;
    time: string;
    duration: string;
    guest: number;
    tableNumber: string;
    reservationId: string;
  } | null;
}

const SuccessModal: React.FC<SuccessModalProps> = ({visible, handleModalVisible, reservationDetails }) => {
  const router = useRouter();

  if (!reservationDetails) return null;

  const handleViewTicket = ()=>{
    router.push('/(tabs)')
    handleModalVisible()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Success Animation */}
          <View style={styles.iconContainer}>
            <LottieView
              source={require("@/assets/images/lottie/success.json")}
              autoPlay
              loop={true}
              style={{ width: 100, height: 100 }}
            />
          </View>

          <Text style={styles.title}>Successfully Reserved Your Table!</Text>
          
          {/* Reservation Details */}
          <View style={styles.detailsContainer}>
            <DetailRow label="Reservation ID" value={reservationDetails?.responseData.reservationId} />
            <DetailRow label="Name" value={reservationDetails?.responseData.name} />
            <DetailRow label="Date" value={reservationDetails?.responseData.date} />
            <DetailRow label="Time" value={reservationDetails?.responseData.time} />
            <DetailRow label="Duration" value={`${reservationDetails?.responseData.duration} Mins`} />
            <DetailRow label="No. of Guests" value={reservationDetails?.responseData.guest.toString()} />
            <DetailRow label="Table Number" value={reservationDetails?.responseData.tableNumber} />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleViewTicket}
            >
              <Text style={styles.buttonText}>View E-Ticket</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/(tabs)/(toptabs)')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                View Bookings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  label: {
    color: '#666666',
    fontSize: 14,
  },
  value: {
    fontWeight: '500',
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    backgroundColor: color.green,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: color.green,
  },
  secondaryButtonText: {
    color: color.green,
  },
});

export default SuccessModal;