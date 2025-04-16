import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    ReferenceArrayInput,
    SelectArrayInput,
    required,
    FormDataConsumer,
    Loading,
    useEditController,
    useNotify,
    useRedirect,
} from 'react-admin';
import {
    Box,
    Typography,
    Chip,
    Stack
} from '@mui/material';
import { useEffect, useState } from 'react';

type ServiceFormData = {
    id?: number;
    serviceName?: string;
    description?: string;
    basePrice?: number;
    duration?: number;
    serviceCategoryId?: number;
    toolIds?: number[];
};

export const ServiceEdit = () => {
    const controller = useEditController();
    const { record, isLoading } = controller;
    const [toolIds, setToolIds] = useState<number[]>([]);
    const notify = useNotify();
    const redirect = useRedirect();

    useEffect(() => {
        if (record?.id) {
            fetch(`http://localhost:5227/api/ServiceTools/service/${record.id}`)
                .then(response => response.json())
                .then(data => {
                    setToolIds(data);
                })
                .catch(error => {
                    console.error('Error fetching tool IDs:', error);
                });
        }
    }, [record?.id]);

    if (isLoading) return <Loading />;

    const initialValues = record ? { ...record, toolIds } : undefined;

    const onSuccess = async (data: any) => {
        if (data.id && data.toolIds) {
            try {
                await fetch(`http://localhost:5227/api/ServiceTools/update/${data.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data.toolIds || []),
                });

                notify('Service successfully updated', { type: 'success' });
                redirect('list', 'Services');
            } catch (error) {
                console.error('Error updating tools:', error);
                notify('Помилка при оновленні інструментів', { type: 'warning' });
            }
        }
    };


    return (
        <Edit redirect="list"
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: onSuccess,
                onError: (error) => {
                    notify('Error while updating service', { type: 'error' });
                    console.error(error);
                }
            }}
        >
            <SimpleForm record={initialValues}>
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
        </Edit>
    );
};