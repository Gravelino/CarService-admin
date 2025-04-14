import {
    List,
    Datagrid,
    TextField,
    EmailField,
    DateField,
    EditButton,
    DeleteButton,
    ShowButton,
    TextInput,
    FilterButton,
    TopToolbar
} from 'react-admin';

const customerFilter = [
    <TextInput key="nameLike" label="Search by name" source="NameLike" alwaysOn />,
    <TextInput key="email" label="Email" source="Email" />,
    <TextInput key="phone" label="Phone" source="Phone" />,
];

const CustomerListActions = () => (
    <TopToolbar>
        <FilterButton filters={customerFilter} />
    </TopToolbar>
);

export const CustomerList = () => (
    <List
        filters={customerFilter}
        actions={<CustomerListActions />}
        sort={{ field: 'lastName', order: 'ASC' }}
        filterDefaultValues={{ nameLike: '', email: '', phone: '' }}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" label="First name" />
            <TextField source="lastName" label="Last name" />
            <EmailField source="email" label="Email" />
            <TextField source="phone" label="Phone" />
            <DateField source="registrationDate" label="Registration date" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);