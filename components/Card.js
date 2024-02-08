import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'

function Card() {
    const containerStyle = Platform.OS === 'android'
        ? { paddingVertical: 12, marginTop: 10, flexDirection: 'row' }
        : { paddingVertical: 12, flexDirection: 'row', };

    return (
        <TouchableOpacity onPress={() => {
        }}>
            <View style={containerStyle}>
                <Image source={require("../assets/udit-image.jpeg")}
                    style={{
                        width: 65, height: 65, borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                    }} />
                <View style={{ marginLeft: 12, justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 600
                    }}>Udit Sharma</Text>
                    <Text style={{
                        color: 'darkgray',
                        fontWeight: 500
                    }}>My Card</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default Card