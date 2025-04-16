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
    useDataProvider,
    RaRecord,
    FunctionField,
} from 'react-admin';
import { useEffect, useState } from 'react';

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

interface Tool {
    id: number;
    name: string;
}

interface ToolsFieldProps {
    record?: RaRecord;
}

const ToolsField = ({ record }: ToolsFieldProps) => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const dataProvider = useDataProvider();

    useEffect(() => {
        if (record?.id) {
            const fetchTools = async () => {
                try {
                    const response = await fetch(`http://localhost:5227/api/ServiceTools/service/${record.id}`);
                    const toolIds = await response.json();

                    if (toolIds && toolIds.length > 0) {
                        const toolsData = await Promise.all(
                            toolIds.map(async (toolId: number) => {
                                const { data } = await dataProvider.getOne('Tools', { id: toolId });
                                return data as Tool;
                            })
                        );
                        setTools(toolsData);
                    } else {
                        setTools([]);
                    }
                } catch (error) {
                    console.error('Error fetching tools:', error);
                    setTools([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchTools();
        }
    }, [record?.id, dataProvider]);

    if (loading) {
        return <span>Loading...</span>;
    }

    if (tools.length === 0) {
        return <span>No tools</span>;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {tools.map(tool => (
                <div key={tool.id} style={{
                    background: '#f0f0f0',
                    padding: '2px 8px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    color: '#000000',
                    border: '1px solid #d0d0d0'
                }}>
                    {tool.name}
                </div>
            ))}
        </div>
    );
};

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

            <FunctionField
                label="Tools"
                render={(record) => <ToolsField record={record} />}
            />

            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
