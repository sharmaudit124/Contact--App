import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import SIZES from '../utils/Constants'
import Header from '../components/Header'
import { AlphabetList } from "react-native-section-alphabet-list";
import SubSectionHeader from '../components/SubSectionHeader'
import NameHeader from '../components/NameHeader'
import { useNavigation } from '@react-navigation/native';
import { getFavoriteContacts } from '../utils/DatabaseHandler'
import { useIsFocused } from "@react-navigation/native";

function FavouriteContactListScreen() {
    const [contactData, setContactData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchContacts();
        }

    }, [isFocused, onDeleteSuccess, searchText]);

    const fetchContacts = () => {
        getFavoriteContacts(searchText,
            (contacts) => {
                setContactData(contacts);
            },
            (error) => {
                console.error(error);
            }
        );
    };
    const onDeleteSuccess = () => {
        fetchContacts();
    };
    const handleSearchChange = (text) => {
        setSearchText(text);
    };
    const formattedContactData = contactData.map((contact) => ({
        value: contact.name,
        mobile: contact.mobile,
        landline: contact.landline,
        isFavorite: contact.isFavorite,
        imgUrl: contact.imgUrl,
        key: contact.id
    }));

    const navigateToAddContact = () => {
        const data = {
            title: 'Add',
            contactData: 42,
        };
        navigation.navigate('Contact App', data);
    };
    return (
        <View style={{
            width: SIZES.screenWidth,
            height: SIZES.screenHeight,
            padding: 18,
            backgroundColor: "#fff",
        }}>
            <Header onSearchChange={handleSearchChange} />
            {contactData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No records found</Text>
                </View>
            ) : (
                <View style={{ marginTop: 16, flex: 1 }}>
                    <AlphabetList style={{ overflow: 'scroll' }}
                        showsVerticalScrollIndicator={false}
                        data={formattedContactData}
                        letterListContainerStyle={{
                            //marginTop: -150,
                            display: 'none'
                        }}
                        indexLetterContainerStyle={{
                            marginVertical: 1,
                        }}
                        indexLetterStyle={{
                            color: '#007bff',
                            fontSize: 11,
                        }}
                        renderCustomSectionHeader={(section) => (
                            <SubSectionHeader section={section} />
                        )}
                        renderCustomItem={(item) => (
                            <NameHeader item={item} onDeleteSuccess={onDeleteSuccess} />
                        )}
                    />
                </View>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={navigateToAddContact}
                activeOpacity={0.7}
            >
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    emptyText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#555',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 32,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        ...Platform.select({
            android: {
                bottom: 80,
                right: 44,
            },
            ios: {
                bottom: 140,
                right: 50
            },
        }),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: 'lightgray',
        zIndex: 100
    },
    plus: {
        fontWeight: '400',
        fontSize: 36,
    }
});
export default FavouriteContactListScreen