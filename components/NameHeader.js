import React, { useRef } from 'react'
import { View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { deleteContact, } from '../utils/DatabaseHandler';

function NameHeader({ item, onDeleteSuccess }) {
    const navigation = useNavigation();
    const swipeableRef = useRef(null);
    const renderRightActions = () => {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => handleUpdateClick()}>
                    <Text style={{ padding: 12, fontWeight: 600 }}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteClick()}>
                    <Text style={{ paddingVertical: 12, fontWeight: 600 }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const handleUpdateClick = () => {
        const data = {
            title: "Update",
            contactData: item
        }
        onDeleteSuccess();
        navigation.navigate('Contact App', data)
        swipeableRef.current && swipeableRef.current.close();
    };

    const handleDeleteClick = () => {
        deleteContact(item.key, () => {
            onDeleteSuccess()
        }, (error) => {
            console.error(error);
        })
        swipeableRef.current && swipeableRef.current.close();
    };
    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={swipeableRef}
                renderRightActions={renderRightActions}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingVertical: 8,
                    borderBottomColor: '#F0F0F0',
                    borderBottomWidth: 1,
                    marginRight: 24
                }}>
                    {item.imgUrl ? (
                        <Image
                            source={{ uri: item.imgUrl }}
                            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 10 }}
                        />
                    ) : (
                        <View style={{ width: 35, height: 35, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="user" size={24} color="gray" />
                        </View>
                    )}

                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 6,
                        fontWeight: 500
                    }} >{item.value}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>

    )
}

export default NameHeader