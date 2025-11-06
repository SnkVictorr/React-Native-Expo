import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, use, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function SignGoogle(){
    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '212809405687-6ge5r3h4v16eqrsus9jauo6eddf26emo.apps.googleusercontent.com', 
        androidClientId: '212809405687-6pg37gl7m8f7r6dfn8pmcaud8goinknv.apps.googleusercontent.com'
    });
    React.useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          console.log("Token Google:", authentication?.accessToken);
        if(authentication?.accessToken){
        (async () => {try{
            const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: {Authorization: `Bearer ${authentication.accessToken}`}
            }
        );
            if(!res.ok) throw new Error('Failed to fetch user info');
            const userInfo = await res.json();
            const {email, name, picture} = userInfo;
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
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',   
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#4285F4',

        }}>
            <Text onPress={() => promptAsync()}>Sign in with Google</Text>
        </TouchableOpacity>
      </>
    )
}