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
    CreateButton,
} from 'react-admin';

const CategoryServiceFilters = [
    <TextInput key="nameLike" label="Search by name" source="nameLike" alwaysOn />,
    <TextInput key="descriptionLike" label="Search by description" source="descriptionLike" />,
];

const CategoryServiceListActions = () => (
    <TopToolbar>
        <CreateButton />
        <FilterButton />
    </TopToolbar>
);

const CategoryServiceEmpty = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No service categories</h2>
        <p>Create your first service category</p>
        <CreateButton label="Create a category" />
    </div>
);

export const CategoryServiceList = () => (
    <List
        filters={CategoryServiceFilters}
        actions={<CategoryServiceListActions />}
        sort={{ field: 'name', order: 'ASC' }}
        filterDefaultValues={{ nameLike: '', descriptionLike: ''}}
        empty={<CategoryServiceEmpty />}
    >
        <Datagrid>
            <TextField source="id" label="Id" />
            <TextField source="categoryName" label="Name" />
            <TextField source="description" label="Description" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);