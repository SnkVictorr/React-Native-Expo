import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Image } from "react-native";
WebBrowser.maybeCompleteAuthSession();

export default function SignGoogle() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "212809405687-6ge5r3h4v16eqrsus9jauo6eddf26emo.apps.googleusercontent.com",
    androidClientId:
      "212809405687-6pg37gl7m8f7r6dfn8pmcaud8goinknv.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Token Google:", authentication?.accessToken);
      if (authentication?.accessToken) {
        (async () => {
          try {
            const res = await fetch(
              "https://www.googleapis.com/userinfo/v2/me",
              {
                headers: {
                  Authorization: `Bearer ${authentication.accessToken}`,
                },
              }
            );
            if (!res.ok) throw new Error("Failed to fetch user info");
            const userInfo = await res.json();
            const { email, name, picture } = userInfo;
            console.log("user email:", email);
            console.log("user name:", name);
            console.log("user picture:", picture);
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        })();
      }
    }
  }, [response]);

  return (
    <>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => promptAsync()}
      >
        {" "}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 100,
          }}
        >
          {" "}
          <Image
            source={require("../../assets/images/google.png")}
            style={{ width: 50, height: 50 }}
          />{" "}
        </View>{" "}
      </TouchableOpacity>
    </>
  );
}
