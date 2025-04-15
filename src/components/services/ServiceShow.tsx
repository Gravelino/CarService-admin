import {
    Show,
    TextField,
    NumberField,
    ReferenceField,
    ReferenceManyField,
    Datagrid,
    TabbedShowLayout,
} from 'react-admin';

export const ServiceShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Information">
                <TextField source="id" />
                <TextField source="serviceName" label="Name" />
                <TextField source="description" label="Description" />
                <NumberField source="basePrice" label="Price" options={{ style: 'currency', currency: 'UAH' }} />
                <NumberField source="duration" label="Duration (min.)" />
                <ReferenceField source="serviceCategoryId" reference="ServiceCategories" label="ServiceCategory">
                    <TextField source="categoryName" />
                </ReferenceField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Tools needed">
                <ReferenceManyField reference="Tools" target="serviceId" label="Tools for service">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" label="Name" />
                        <TextField source="serialNumber" label="Serial number" />
                        <TextField source="status" label="Status" />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);