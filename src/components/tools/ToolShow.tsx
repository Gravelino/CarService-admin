import {
    Show,
    TextField,
    TabbedShowLayout,
    NumberField
} from 'react-admin';

export const ToolShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Information">
                <TextField source="id" />
                <TextField source="name" label="Name" />
                <TextField source="description" label="Description" />
                <NumberField source="serialNumber" label="Serial number" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);
