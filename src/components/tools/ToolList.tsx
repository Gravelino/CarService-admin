import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    ShowButton,
    TextInput,
    FilterButton,
    TopToolbar,
    CreateButton, NumberField,
} from 'react-admin';

const ToolFilters = [
    <TextInput key="nameLike" label="Search by name" source="nameLike" alwaysOn />,
    <TextInput key="descriptionLike" label="Search by description" source="descriptionLike" />,
];

const ToolListActions = () => (
    <TopToolbar>
        <CreateButton />
        <FilterButton />
    </TopToolbar>
);

const ToolEmpty = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No tools</h2>
        <p>Create your first tool</p>
        <CreateButton label="Create a tool" />
    </div>
);

export const ToolList = () => (
    <List
        filters={ToolFilters}
        actions={<ToolListActions />}
        sort={{ field: 'name', order: 'ASC' }}
        filterDefaultValues={{ nameLike: '', descriptionLike: ''}}
        empty={<ToolEmpty />}
    >
        <Datagrid>
            <TextField source="id" label="Id" />
            <TextField source="name" label="Name" />
            <TextField source="description" label="Description" />
            <NumberField source="serialNumber" label="Serial number" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);