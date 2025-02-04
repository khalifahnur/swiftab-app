import { createReservation, userCancelReservation } from '@/api/api';
import { Reservation, ReservationResponse, userCancelReservationParams } from '@/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

interface ReservationParams {
  restaurantId: string;
  userId: string;
  data: Reservation;
}

// Add interface for success callback props
interface UseCreateReservationOptions {
  onSuccess?: (data: ReservationResponse) => void;
  onError?: (error: Error) => void;
}

export const useCreateReservation = (options?: UseCreateReservationOptions) => {
  return useMutation({
    mutationFn: ({ userId, restaurantId, data }: ReservationParams) =>
      createReservation(userId, restaurantId, data),
    onSuccess: (data) => {
      // Call the success callback if provided
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: Error) => {
      console.error('Failed to create reservation:', error);
      // Call the error callback if provided
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};

export function userCancellationReservation() {
  return useMutation({
    mutationFn:({id,userId,restaurantId,reservationId}:userCancelReservationParams) => userCancelReservation({id,userId,restaurantId,reservationId}),
    onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Reservation cancelled',
        });
    },
    onError: (error) => {
      // Handle errors
      console.error('Failed to cancel reservation:', error.message);
      Toast.show({
        type: 'error',
        text2: 'Reservation cancelled error : Please try again.',
      });
    },
  });
}