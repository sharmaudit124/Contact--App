import { openDatabase } from 'expo-sqlite';

const db = openDatabase('contacts.db');

const createTable = (successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, landline TEXT, imgUrl TEXT, isFavorite BOOLEAN);',
                [],
                successCallback,
                (_, error) => errorCallback(`Error creating table: ${error.message}`)
            );
        },
        errorCallback
    );
};

// Insert contact
const insertContact = (name, mobile, landline, imgUrl, isFavorite, successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'INSERT INTO contacts (name, mobile, landline, imgUrl, isFavorite) VALUES (?, ?, ?, ?, ?);',
                [name, mobile, landline, imgUrl, isFavorite],
                (_, { insertId }) => successCallback(`Contact added successfully with ID: ${insertId}`),
                (_, error) => errorCallback(`Error adding contact: ${error.message}`)
            );
        },
        errorCallback
    );
};

// Update contact
const updateContact = (id, name, mobile, landline, imgUrl, isFavorite, successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'UPDATE contacts SET name=?, mobile=?, landline=?, imgUrl=?, isFavorite=? WHERE id=?;',
                [name, mobile, landline, imgUrl, isFavorite, id],
                successCallback,
                (_, error) => errorCallback(`Error updating contact: ${error.message}`)
            );
        },
        errorCallback
    );
};

// Delete contact
const deleteContact = (id, successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'DELETE FROM contacts WHERE id=?;',
                [id],
                successCallback,
                (_, error) => errorCallback(`Error deleting contact: ${error.message}`)
            );
        },
        errorCallback
    );
};

// Retrieve all contacts
const getAllContacts = (searchText, successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            let query = `SELECT * FROM contacts;`;
            if (searchText) {
                query = `SELECT * FROM contacts WHERE name LIKE '%${searchText}%';`;
            }

            tx.executeSql(
                query,
                [],
                (_, { rows }) => successCallback(rows._array),
                (_, error) => errorCallback(`Error fetching contacts: ${error.message}`)
            );
        },
        errorCallback
    );
};


// Retrieve contact by ID
const getContactById = (id, successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'SELECT * FROM contacts WHERE id = ? LIMIT 1;',
                [id],
                (_, { rows }) => {
                    const contact = rows.length > 0 ? rows._array[0] : null;
                    if (successCallback) {
                        successCallback(contact);
                    }
                },
                (_, error) => {
                    console.error('Error executing SQL query:', error);
                    if (errorCallback) {
                        errorCallback(`Error fetching contact: ${error.message}`);
                    }
                }
            );

        },
        (_, error) => {
            if (errorCallback) {
                errorCallback(`Error fetching contact: ${error.message}`);
            }
        }
    );
};

const dropTable = (successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'DROP TABLE IF EXISTS contacts;',
                [],
                successCallback,
                (_, error) => errorCallback(`Error dropping table: ${error.message}`)
            );
        },
        errorCallback
    );
};

const getFavoriteContacts = (searchText, successCallback, errorCallback) => {
    db.transaction(
        (tx) => {
            let query = 'SELECT * FROM contacts WHERE isFavorite = 1';

            if (searchText) {
                query += ` AND name LIKE '%${searchText}%'`;
            }

            tx.executeSql(
                query,
                [],
                (_, { rows }) => {
                    const favoriteContacts = rows._array;
                    successCallback(favoriteContacts);
                },
                (_, error) => errorCallback(`Error getting favorite contacts: ${error.message}`)
            );
        },
        errorCallback
    );
};



export {
    createTable,
    insertContact,
    updateContact,
    deleteContact,
    getAllContacts,
    getContactById,
    dropTable,
    getFavoriteContacts
};