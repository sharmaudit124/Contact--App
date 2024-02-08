import React, { useState } from 'react'
import { View, Text, Platform } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'

function Header({ onSearchChange }) {
    const [searchText, setSearchText] = useState('');
    const handleSearchChange = (text) => {
        setSearchText(text);
        onSearchChange(text); 
    };
    const customStyle = Platform.OS === 'android'
        ? { paddingVertical: 10, }
        : { borderBottomColor: 'lightgray', borderBottomWidth: 1, paddingBottom: 12 };
    return (
        <View style={customStyle}>
            <Text style={{
                fontWeight: 800,
                fontSize: 36
            }}>Contacts
            </Text>
            <SearchBar
                placeholder="Search"
                onChangeText={handleSearchChange}
                value={searchText}
                platform={Platform.OS}
                rightIcon={<Icon name="microphone" size={24} color="#000" />}
                containerStyle={{ width: 360, height: 34, marginLeft: -5, marginTop: 10, }}
                inputContainerStyle={{ backgroundColor: '#F0F0F0', borderRadius: 17 }}
            />
        </View>
    )
}

export default Header