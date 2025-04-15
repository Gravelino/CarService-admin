import {
    Create,
    SimpleForm,
    TextInput,
    required
} from 'react-admin';

export const CategoryServiceCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="categoryName" label="Name" validate={[required()]} />
            <TextInput source="description" label="Description" multiline rows={4} fullWidth />
        </SimpleForm>
    </Create>
);