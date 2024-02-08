# Contacts Mobile App with React Native

## Problem Statement

A mobile app for managing contacts. The app should allow users to save contact details in a local database along with photos. Users should be able to view the contact list, modify/delete any contact, favorite/unfavorite contacts, and view a list of favorite contacts.

## Requirements

### Contact List Screen

**Use Case:** User can see a list of contacts in ascending order by name.

**Details:**
1. Screen has the title ‘Contact List’.
2. List of contacts with contact name and photo in ascending order.
3. 'Add' button at the bottom right of the screen to navigate to the 'Create New Contact' screen.
4. Clicking on any contact navigates the user to the 'Update Contact' screen.

### Create New Contact Screen

**Use Case:** User can add a new contact.

**Details:**
1. Screen has the title ‘Add New Contact’.
2. Input fields:
   - Name of the person.
   - Mobile phone number.
   - Landline number.
   - Take/Browse photo of the person.
3. Favorite button to mark/unmark the contact as a favorite.
4. Save button to save the contact details.

### Update Contact Screen

**Use Case:** User can update contact details.

**Details:**
1. Screen has the title ‘Update Contact’ and displays details of selected contacts.
2. Input fields:
   - Name of the person.
   - Mobile phone number.
   - Landline number.
   - Take/Browse photo of the person.
3. Update button to update the contact details.
4. Favorite button to mark/unmark the contact as a favorite.
5. Delete button to delete the contact details.

### Favorite Contact List Screen

**Use Case:** User can see a list of contacts marked as a favorite.

**Details:**
1. Screen has the title ‘Favorite Contact List’.
2. List of favorite contacts in ascending order.

### App Navigation

**Use Case:** User can navigate to the contact list screen and favorite contact list screen.

**Details:**
1. App will have a sliding drawer (using master-detail page) with two options: ‘Contact List Screen’ and ‘Favorite Contacts.’
2. Clicking on any of these options will navigate the user to the corresponding screen.

## Technical Requirements

1. Use Expo for building and managing the project.
2. Use of React Drawer Navigation for app navigation.
3. Add a search input box to filter contacts based on the name.
4. Use of local database for CRUD operations.
5. Each contact in the list should be in a swiper item to show Update/delete button when swiped from the right side. You can use react-native-swipe-list-view or any other suitable library.

## Getting Started with Expo

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Expo](https://docs.expo.dev/get-started/installation/) installed globally.
- **Java 17 :** installed on your machine
- **Expo Mobile App :** make sure to download expo app in your mobile device.

### Installation

1. Extract the contents of the zip file.

2. Open a terminal and change into the project directory:

   ```bash
   cd path/to/contact-app

3. Install dependencies:

    ```bash
    npm install

4. Running the App using Expo:

    ```bash
    npx expo start -- --tunnel

5. Now open your expo app and scan the QR code and there you go!


## ***Note*** 
Sample Images are given in the smaple-Images folder.
