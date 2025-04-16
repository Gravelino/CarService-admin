import {
    Edit,
    SimpleForm,
    TextInput,
    required
} from 'react-admin';

export const ToolEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Name" validate={[required()]} />
            <TextInput source="description" label="Description" multiline rows={4} fullWidth />
            <TextInput source="serialNumber" label="Serial number" validate={[required()]} />
        </SimpleForm>
    </Edit>
);