import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { PhotoItem } from '../types/report';

export async function pickPhoto(camera: boolean): Promise<PhotoItem[]> {
  const permission = camera
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permission required',
      camera
        ? 'Please allow camera access for Symphony Install+.'
        : 'Please allow photo access for Symphony Install+.'
    );
    return [];
  }

  const result = camera
    ? await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.65,
        base64: true,
      })
    : await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.65,
        base64: true,
        allowsMultipleSelection: true,
        selectionLimit: 10,
      });

  if (result.canceled) return [];

  return result.assets.map(asset => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    uri: asset.uri,
    base64: asset.base64,
  }));
}
