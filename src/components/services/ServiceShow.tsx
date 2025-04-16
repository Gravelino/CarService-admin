import {
    Show,
    TextField,
    NumberField,
    ReferenceField,
    Datagrid,
    TabbedShowLayout,
    Loading,
    useShowController,
    useDataProvider
} from 'react-admin';
import { useEffect, useState } from 'react';

export const ServiceShow = () => {
    const { record, isLoading } = useShowController();
    const dataProvider = useDataProvider();
    const [tools, setTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (record?.id) {
            const fetchTools = async () => {
                try {
                    const response = await fetch(`http://localhost:5227/api/ServiceTools/service/${record.id}`);
                    const toolIds = await response.json();

                    if (toolIds && toolIds.length > 0) {
                        const toolsData = await Promise.all(
                            toolIds.map(async (id: number) => {
                                try {
                                    const { data } = await dataProvider.getOne('Tools', { id });
                                    return data;
                                } catch (error) {
                                    console.error(`Error getting tool with ID ${id}:`, error);
                                    return null;
                                }
                            })
                        );
                        setTools(toolsData.filter(tool => tool !== null));
                    } else {
                        setTools([]);
                    }
                } catch (error) {
                    console.error('Error getting tools:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchTools();
        }
    }, [record?.id, dataProvider]);

    if (isLoading) return <Loading />;

    return (
        <Show>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="Information">
                    <TextField source="id" />
                    <TextField source="serviceName" label="Name" />
                    <TextField source="description" label="Description" />
                    <NumberField source="basePrice" label="Price" options={{ style: 'currency', currency: 'UAH' }} />
                    <NumberField source="duration" label="Duration (min.)" />
                    <ReferenceField source="serviceCategoryId" reference="ServiceCategories" label="Category">
                        <TextField source="categoryName" />
                    </ReferenceField>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Tools needed">
                    {loading ? (
                        <Loading />
                    ) : tools.length > 0 ? (
                        <Datagrid
                            data={tools}
                            bulkActionButtons={false}
                            rowClick="disabled"
                            isRowSelectable={() => false}
                            sx={{
                                '& tbody tr': {
                                    cursor: 'default',
                                    pointerEvents: 'none'
                                },
                                '& tbody td': {
                                    userSelect: 'text'
                                }
                            }}
                        >
                            <TextField source="id" />
                            <TextField source="name" label="Name" />
                            <TextField source="serialNumber" label="Serial number" />
                        </Datagrid>
                    ) : (
                        <div style={{ padding: '16px' }}>There are no tools intended for this service.</div>
                    )}
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
};