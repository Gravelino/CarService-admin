import {
    Show,
    TextField,
    ReferenceManyField,
    Datagrid,
    TabbedShowLayout,
} from 'react-admin';

export const CategoryServiceShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Information">
                <TextField source="id" />
                <TextField source="categoryName" label="Name" />
                <TextField source="description" label="Description" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Services in the category">
                <ReferenceManyField reference="Services" target="categoryId" label="Services">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="categoryName" label="Name" />
                        <TextField source="description" label="Description" />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);