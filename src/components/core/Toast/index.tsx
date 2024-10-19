import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons

interface ToastProps {
  message: string;
  type?: 'success' | 'error'; // Type of toast
  duration?: number; // Duration in milliseconds
  onHide?: () => void; // Callback to reset the message state after toast hides
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onHide,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (message) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Fade out after the duration
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            if (onHide) {
              onHide(); // Hide the toast by clearing the message state
            }
          });
        }, duration);
      });
    }
  }, [message]);

  if (!message) {
    return null;
  }

  const backgroundColor =
    type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#333';

  const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';

  return (
    <View style={styles.toastContainer}>
      <Animated.View
        style={[styles.toast, {opacity: fadeAnim, backgroundColor}]}>
        <Icon name={icon} size={20} color="#fff" style={styles.icon} />
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50, // Position it at the top
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000, // Ensure it appears above other elements
  },
  toast: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10, // Slightly rounded for a cleaner look
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
    maxWidth: '90%', // Adjust width
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600', // Slightly bolder text
  },
  icon: {
    marginRight: 10,
  },
});

export default Toast;
