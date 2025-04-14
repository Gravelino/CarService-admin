import {
    Show,
    TextField,
    EmailField,
    DateField,
    TabbedShowLayout,
    ReferenceManyField,
    Datagrid
} from 'react-admin';

export const CustomerShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Information">
                <TextField source="id" />
                <TextField source="firstName" label="First name" />
                <TextField source="lastName" label="Last name" />
                <EmailField source="email" label="Email" />
                <TextField source="phone" label="Phone" />
                <DateField source="registrationDate" label="Registration date" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Cars">
                <ReferenceManyField reference="Cars" target="customerId" label="Customer's cars">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="brand" label="Brand" />
                        <TextField source="model" label="Model" />
                        <TextField source="year" label="Year of release" />
                        <TextField source="licensePlate" label="License plate" />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Visits">
                <ReferenceManyField reference="Visits" target="customerId" label="Customer's visits">
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
