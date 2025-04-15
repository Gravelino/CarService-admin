import {
    List,
    Datagrid,
    TextField,
    NumberField,
    ReferenceField,
    EditButton,
    DeleteButton,
    ShowButton,
    TextInput,
    FilterButton,
    TopToolbar,
    CreateButton,
    SortButton,
} from 'react-admin';

const ServiceFilters = [
    <TextInput key="nameLike" label="Search by name" source="NameFilter" alwaysOn />,
    <TextInput key="description" label="Search by description" source="DescriptionFilter" />,
];

const ServiceListActions = () => (
    <TopToolbar>
        <CreateButton />
        <FilterButton />
        <SortButton fields={['serviceName', 'basePrice', 'duration']} />
    </TopToolbar>
);

const ServiceEmpty = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No service</h2>
        <p>Create your first service</p>
        <CreateButton label="Create a service" />
    </div>
);

export const ServiceList = () => (
    <List
        filters={ServiceFilters}
        actions={<ServiceListActions />}
        sort={{ field: 'serviceName', order: 'ASC' }}
        filterDefaultValues={{ NameFilter: '', DescriptionFilter: '' }}
        empty={<ServiceEmpty />}
    >
        <Datagrid>
            <TextField source="id" />
            <TextField source="serviceName" label="Name" />
            <TextField source="description" label="Description" />
            <NumberField
                source="basePrice"
                label="Price"
                options={{ style: 'currency', currency: 'UAH' }}
                sortable
            />
            <NumberField
                source="duration"
                label="Duration (min.)"
                sortable
            />
            <ReferenceField
                source="serviceCategoryId"
                reference="ServiceCategories"
                label="Category"
                link={false}
            >
                <TextField source="categoryName" />
            </ReferenceField>
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);