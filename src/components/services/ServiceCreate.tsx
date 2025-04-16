import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    ReferenceArrayInput,
    SelectArrayInput,
    required,
    FormDataConsumer,
} from 'react-admin';
import {
    Box,
    Typography,
    Chip,
    Stack,
} from '@mui/material';

type ServiceFormData = {
    id?: number;
    serviceName?: string;
    description?: string;
    basePrice?: number;
    duration?: number;
    serviceCategoryId?: number;
    toolIds?: number[];
};

export const ServiceCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="serviceName" label="Name" validate={[required()]} />
            <TextInput
                source="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
            />
            <NumberInput source="basePrice" label="Price" validate={[required()]} />
            <NumberInput
                source="duration"
                label="Duration (min.)"
                validate={[required()]}
            />
            <ReferenceInput
                source="serviceCategoryId"
                reference="ServiceCategories"
                label="Category"
            >
                <SelectInput optionText="categoryName" validate={[required()]} />
            </ReferenceInput>

            <ReferenceArrayInput
                source="toolIds"
                reference="Tools"
                label="Tools needed for service"
            >
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>

            <FormDataConsumer>
                {({ formData }: { formData: ServiceFormData }) =>
                    formData.toolIds && formData.toolIds.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="subtitle1">Selected tools:</Typography>
                            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                                {formData.toolIds.map((toolId: number) => (
                                    <Chip key={toolId} label={`Tool #${toolId}`} />
                                ))}
                            </Stack>
                        </Box>
                    )
                }
            </FormDataConsumer>
        </SimpleForm>
    </Create>
);