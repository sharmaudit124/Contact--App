import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactListScreen from './ContactListScreen';
import FavouriteContactListScreen from './FavouriteContactListScreen';
import CreateUpdateScreen from './CreateUpdateScreen';
import { Dimensions } from 'react-native';

function DrawerNavigator() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    marginVertical: 42,
                    height: Dimensions.get('screen').height
                }
            }}>
            <Drawer.Screen options={{

            }} name="Contact List" component={ContactListScreen} />
            <Drawer.Screen name="Favourite List" component={FavouriteContactListScreen} />
            <Drawer.Screen options={{ drawerLabel: () => null, drawerIcon: () => null, drawerActiveBackgroundColor: 'white' }} name="Contact App" component={CreateUpdateScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator