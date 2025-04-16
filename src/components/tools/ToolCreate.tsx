import {
    Create,
    SimpleForm,
    TextInput,
    required,
    NumberInput
} from 'react-admin';

export const ToolCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Name" validate={[required()]} />
            <TextInput source="description" label="Description" multiline rows={4} fullWidth />
            <NumberInput source="serialNumber" label="Serial number" validate={[required()]} />
        </SimpleForm>
    </Create>
);