import React from 'react'
import AddContact from '../components/AddContact';
import UpdateContact from '../components/UpdateContact';

function CreateUpdateScreen({ route }) {
    const { title, contactData } = route.params;
    return (
        title === "Add" ? <AddContact /> : <UpdateContact id={contactData.key} />
    )
};

export default CreateUpdateScreen