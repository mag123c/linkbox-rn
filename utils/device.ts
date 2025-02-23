import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import { saveUser } from "../services/userService";

const DEVICE_ID_KEY = "DEVICE_UNIQUE_ID";

export const removeDeviceId = async () => {
  try {
    await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
  } catch (error) {
    console.error("SecureStore 삭제 실패:", error);
  }
};

// 📌 디바이스 ID 생성
export const createDeviceId = async (): Promise<string | null> => {
  let id =
    Application.getAndroidId() || (await Application.getIosIdForVendorAsync());
  return id || null;
};

// 📌 디바이스 ID 저장
export const setDeviceId = async (id: string) => {
  try {
    await SecureStore.setItemAsync(DEVICE_ID_KEY, id);
  } catch (error) {
    console.error("SecureStore 저장 실패", error);
  }
};

// 📌 기존 디바이스 ID 가져오기
export const getDeviceId = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(DEVICE_ID_KEY);
  } catch (error) {
    console.error("SecureStore에서 ID 가져오기 실패", error);
    return null;
  }
};

// 📌 디바이스 ID 가져오거나 생성
export const getOrCreateDeviceId = async (): Promise<string> => {
  try {
    let storedId = await getDeviceId();
    console.log("storedId", storedId);

    if (storedId) {
      return storedId;
    }

    let newId = await createDeviceId();

    if (!newId) {
      throw new Error("디바이스 ID 생성 실패");
    }

    await setDeviceId(newId);
    try {
      await saveUser(newId);
    } catch (error) {
      console.error("유저 저장 실패:", error);
    }

    return newId;
  } catch (error) {
    console.error("getOrCreateDeviceId 에러:", error);
    throw error;
  }
};
