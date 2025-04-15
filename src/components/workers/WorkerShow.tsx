import {
    Show,
    TextField,
    EmailField,
    DateField,
    NumberField,
    BooleanField,
    TabbedShowLayout,
    ReferenceManyField,
    Datagrid
} from 'react-admin';

export const WorkerShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Information">
                <TextField source="id" />
                <TextField source="firstName" label="First name" />
                <TextField source="lastName" label="Last name" />
                <TextField source="specialization" label="Specialization" />
                <DateField source="hireDate" label="Hire date" />
                <EmailField source="email" label="Email" />
                <TextField source="phone" label="Phone" />
                <NumberField source="salary" label="Salary" />
                <BooleanField source="isActive" label="Active" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Scheduled Visits">
                <ReferenceManyField reference="Visits" target="workerId" label="Worker's scheduled visits">
                    <Datagrid>
                        <TextField source="id" />
                        <DateField source="visitDate" label="Visit date" />
                        <TextField source="status" label="Status" />
                        <TextField source="description" label="Description" />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);