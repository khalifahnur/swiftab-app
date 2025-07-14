import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AuthData, AuthResponse, ErrorResponse } from '@/types';
import { forgotPassword, loginUser, newPassword, signUpUser, verifyCode } from '@/api/api';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export function useLogin(): UseMutationResult<AuthResponse, ErrorResponse, AuthData> {
  return useMutation<AuthResponse, ErrorResponse, AuthData>({mutationFn:loginUser, 
    onSuccess: (data:AuthResponse) => {
      console.log('Login successful:', data);
    },
    onError: (error:ErrorResponse) => {
      console.error('Login error:', error.message);
    },
  });
}

export function useSignUp(): UseMutationResult<AuthResponse, ErrorResponse, AuthData> {
  return useMutation<AuthResponse, ErrorResponse, AuthData>({mutationFn:signUpUser,
    onSuccess: () => {
      console.log('Sign-up successful:');
    },
    onError: (error:ErrorResponse) => {
      console.error('Sign-up error:', error.message);
    },
  });
}


interface ForgotPasswordResponse {
  email: string;
  message?: string;
}

export function useForgotPassword() {
  return useMutation<ForgotPasswordResponse, ErrorResponse, string>({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log('Verification code sent to:', data);
    },
    onError: (error) => {
      console.error('Failed to send verification code:', error.message);
    },
  });
}


type VerifyCodeVariables = {
  email: string;
  verificationCode: string;
};

type VerifyCodeResponse = {
  status: number;
  email: string;
  message?: string;
};

export function useVerifyCode() {
  const router = useRouter();
  return useMutation<VerifyCodeResponse, ErrorResponse, VerifyCodeVariables>({
    mutationFn: verifyCode,
    onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: 'Verification Successful',
          text2: 'You can now reset your password.',
        });
        router.push({ pathname: "/(auth)/newpassword", params: { email: data.email } });
      // } else if (data.status === 400) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Invalid or Expired Code',
      //     text2: 'Please check your verification code and try again.',
      //   });
      // }
    },
    onError: (error) => {
      // Handle errors
      console.error('Failed to verify code:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'An error occurred while verifying the code. Please try again.',
      });
    },
  });
}

type passwordParams = {
  email: string;
  newPassword: string;
};

type newPsswdResponse = {
  status: number;
  email: string;
  message?: string;
};


export function useNewPassword() {
  const router = useRouter();
  return useMutation<newPsswdResponse, ErrorResponse, passwordParams>({
    mutationFn: newPassword,
    onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Password Changed',
        });
        router.push("/(auth)/signin");
    },
    onError: (error) => {
      // Handle errors
      console.error('Failed to change password:', error.message);
      Toast.show({
        type: 'error',
        text2: 'Password changed error : Please try again.',
      });
    },
  });
}