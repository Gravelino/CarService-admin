import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    required,
    email,
} from 'react-admin';

export const CustomerEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="firstName" label="First name" validate={[required()]} />
            <TextInput source="lastName" label="Last name" validate={[required()]} />
            <TextInput source="email" label="Email" validate={[required(), email()]} />
            <TextInput source="phone" label="Phone" validate={[required()]} />
            <DateInput source="registrationDate" label="Registration date" />
        </SimpleForm>
    </Edit>
);