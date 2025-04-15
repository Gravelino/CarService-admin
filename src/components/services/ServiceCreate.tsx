import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required
} from 'react-admin';

export const ServiceCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="serviceName" label="Name" validate={[required()]} />
            <TextInput source="description" label="Description" multiline rows={4} fullWidth />
            <NumberInput source="basePrice" label="Price" validate={[required()]} />
            <NumberInput source="duration" label="Duration (min.)" validate={[required()]} />
            <ReferenceInput
                source="serviceCategoryId"
                reference="ServiceCategories"
                label="Category"
            >
                <SelectInput
                    optionText="categoryName"
                    validate={[required()]}
                />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);