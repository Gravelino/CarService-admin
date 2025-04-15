import {
    TextInput,
    BooleanInput,
    TopToolbar,
    FilterButton,
    List,
    Datagrid,
    TextField,
    EmailField,
    DateField,
    NumberField,
    BooleanField,
    EditButton,
    ShowButton,
    DeleteButton,
} from 'react-admin';

const workerFilters = [
    <TextInput key="nameLike" label="Search by name" source="nameLike" alwaysOn />,
    <TextInput key="specialization" label="Search by specialization" source="specialization" alwaysOn />,
    <BooleanInput key="isActive" label="Only active" source="isActive" alwaysOn />,
    <TextInput key="email" label="Email" source="email" />,
    <TextInput key="phone" label="Phone" source="phone" />,
];

const WorkerListActions = () => (
    <TopToolbar>
        <FilterButton filters={workerFilters} />
    </TopToolbar>
);

export const WorkerList = () => (
    <List
        filters={workerFilters}
        actions={<WorkerListActions />}
        sort={{ field: 'lastName', order: 'ASC' }}
        filterDefaultValues={{ nameLike: '', specialization: '', isActive: true, email: '', phone: '' }}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" label="First name" />
            <TextField source="lastName" label="Last name" />
            <TextField source="specialization" label="Specialization" sortable={true} />
            <DateField source="hireDate" label="Hire date" sortable={true} />
            <EmailField source="email" label="Email" />
            <TextField source="phone" label="Phone" />
            <NumberField source="salary" label="Salary" sortable={true} />
            <BooleanField source="isActive" label="isActive" sortable={true} />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);