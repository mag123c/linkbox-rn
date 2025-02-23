import axiosClient from "./axios-client";

// 최초 접속 시 유저 정보 저장
export const saveUser = async (deviceUUID: string): Promise<any> => {
  try {
    console.log("TEST1");
    const response = await axiosClient.post(
      `/users`,
      { uuid: deviceUUID },
      { withCredentials: true }
    );
    console.log("✅ [saveUser] 응답 받음:", response.status, response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      "❌ [saveUser] 유저 정보 변경 실패",
      JSON.stringify(error, null, 2)
    );
    return null;
  }
};
