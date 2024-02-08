import React from 'react'
import { View, Text } from 'react-native'

function SubSectionHeader({ section }) {
    return (
        <View style={{
            paddingVertical: 8,
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
            marginRight: 24,
            backgroundColor: 'white'
        }} >
            <Text style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'darkgray',
                paddingVertical: 3,
            }}>{section.title}</Text>
        </View>

    )
}

export default SubSectionHeader