import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";

const App = () => {
  const webViewRef = useRef<WebView>(null);

  // const onLoad = async () => {
  //   const deviceId = await getOrCreateDeviceId();
  //   console.log("📢 디바이스 ID:", deviceId);
  //   if (webViewRef.current) {
  //     webViewRef.current.postMessage(JSON.stringify({ deviceId }));
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#121212" />
      <WebView
        ref={webViewRef as any}
        // source={{ uri: "https://yotubue-bookmarker-react.vercel.app" }}
        source={{ uri: "http://14.33.42.97:5173/" }}
        originWhitelist={["*"]}
        // onLoad={async () => {
        //   console.log("📢 [onLoad] 웹뷰 로드 완료, 디바이스 전송");
        //   await onLoad();
        //   console.log("📢 [onLoad] 디바이스 전송 완료");
        // }}
        onMessage={(event) => {
          console.log("📢 [onMessage] event:", event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
