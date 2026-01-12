import type { SaveData } from '@/types/save';

// UTF-8 safe base64 decode
function utf8Base64Decode(base64: string): string {
  // First decode from base64 to binary
  const binaryString = atob(base64);
  // Convert binary string to Uint8Array
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  // Decode UTF-8 bytes to string
  return new TextDecoder('utf-8').decode(bytes);
}

// UTF-8 safe base64 encode
function utf8Base64Encode(str: string): string {
  // Encode string to UTF-8 bytes
  const bytes = new TextEncoder().encode(str);
  // Convert bytes to binary string
  let binaryString = '';
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  // Encode binary string to base64
  return btoa(binaryString);
}

export function decodeSaveData(base64String: string): SaveData | null {
  try {
    // Clean the string (remove whitespace, newlines, etc.)
    const cleanedString = base64String.trim().replace(/\s/g, '');
    
    // Decode base64 with UTF-8 support
    const decodedString = utf8Base64Decode(cleanedString);
    
    // Parse JSON
    const saveData = JSON.parse(decodedString) as SaveData;
    
    // Basic validation
    if (!saveData.player || !saveData.area) {
      throw new Error('Invalid save structure');
    }
    
    return saveData;
  } catch (error) {
    console.error('Error decoding save:', error);
    return null;
  }
}

export function encodeSaveData(saveData: SaveData): string {
  try {
    const jsonString = JSON.stringify(saveData);
    return utf8Base64Encode(jsonString);
  } catch (error) {
    console.error('Error encoding save:', error);
    return '';
  }
}

export function downloadSaveFile(content: string, filename: string = 'modified_save.txt') {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
