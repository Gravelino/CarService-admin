import {
    Edit,
    SimpleForm,
    TextInput,
    required
} from 'react-admin';

export const CategoryServiceEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="categoryName" label="name" validate={[required()]} />
            <TextInput source="description" label="Description" multiline rows={4} fullWidth />
        </SimpleForm>
    </Edit>
);