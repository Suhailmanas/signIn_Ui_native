import { Platform } from "react-native";

export const codeToArray = (code:any) => code?.split('') ?? [];
const majorVersionIOS = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported =
  Platform.OS === 'ios' && majorVersionIOS >= 12;
export default {codeToArray, isAutoFillSupported};
