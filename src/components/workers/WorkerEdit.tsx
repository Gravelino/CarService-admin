import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    NumberInput,
    BooleanInput,
    required,
    email,
} from 'react-admin';

export const WorkerEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="firstName" label="First name" validate={[required()]} />
            <TextInput source="lastName" label="Last name" validate={[required()]} />
            <TextInput source="specialization" label="Specialization" validate={[required()]} />
            <DateInput source="hireDate" label="Hire date" validate={[required()]} />
            <TextInput source="phone" label="Phone" validate={[required()]} />
            <TextInput source="email" label="Email" validate={[required(), email()]} />
            <NumberInput source="salary" label="Salary" validate={[required()]} />
            <BooleanInput source="isActive" label="Is active" />
        </SimpleForm>
    </Edit>
);