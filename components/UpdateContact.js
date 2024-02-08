import React, { useState, useEffect } from 'react'
import { View, Alert, Text, TextInput, StyleSheet, Image, Platform, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { updateContact, getContactById } from '../utils/DatabaseHandler';

function UpdateContact({ id }) {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        fetchContactDetails();
    }, [id]);

    const fetchContactDetails = () => {
        getContactById(
            id,
            (contactDetails) => {
                if (contactDetails) {
                    setName(contactDetails.name);
                    setMobile(contactDetails.mobile);
                    setLandline(contactDetails.landline);
                    setIsFavorite(contactDetails.isFavorite);
                    setImgUrl(contactDetails.imgUrl);
                }
            },
            (error) => {
                console.error('Error fetching contact details:', error.message);
            }
        );
    };

    const updateContactDetails = () => {
        if (!validateContactDetails()) {
            return;
        }
        updateContact(
            id, name, mobile, landline,
            imgUrl, isFavorite,
            (successMessage) => {
                navigation.navigate('Contact List');
            },
            (errorMessage) => {
                console.error(errorMessage);
            }
        );
    }

    const validateContactDetails = () => {
        const isNumeric = (value) => {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };

        if (!name.trim()) {
            Alert.alert('Error', 'Name must not be empty');
            return false;
        }

        if (!isNumeric(mobile) || mobile.trim().length !== 10) {
            Alert.alert('Error', 'Mobile must be a 10-digit numeric value');
            return false;
        }

        if (!isNumeric(landline) || landline.trim().length !== 10) {
            Alert.alert('Error', 'Landline must be a 10-digit numeric value');
            return false;
        }

        return true;
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    const selectImage = async () => {
        const getPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (getPermission.granted === false) {
            Alert.alert('Permission Required', 'Pleas allow us to access media storage');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setImgUrl(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Update Contact</Text>
                <TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
                    {imgUrl !== null ? (
                        <Image source={{ uri: imgUrl }} style={styles.image} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Icon name="user" size={40} color="gray" />
                        </View>
                    )}
                </TouchableOpacity>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Mobile No"
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Landline No"
                    value={landline}
                    onChangeText={(text) => setLandline(text)}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.favouriteContainer} onPress={toggleFavorite} >
                    <Text style={styles.favouriteText}>Favourite</Text><Icon
                        name={isFavorite ? 'star' : 'star-o'}
                        size={24}
                        style={{ alignSelf: 'center' }}
                        color={isFavorite ? 'gold' : 'black'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    underlayColor="#003366"
                    onPress={updateContactDetails}
                >
                    <Text style={{
                        fontSize: 18, fontWeight: '600'
                    }} >
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 500,
        padding: 24,
        marginVertical: 90,
        marginHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 20,
        borderRadius: 50,
        alignSelf: 'center',
        color: 'black',
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginTop: 14,
        paddingHorizontal: 20,
        borderRadius: 50,
        color: 'black',
    },
    favouriteContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginTop: 20,
    },
    favouriteText: {
        marginRight: 10,
        padding: 5,
        fontWeight: '600'
    }
});


export default UpdateContact