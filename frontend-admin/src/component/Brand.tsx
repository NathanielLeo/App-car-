import { List, Datagrid, TextField, DeleteButton, EditButton, Create, Edit, SimpleForm, TextInput, useRecordContext } from "react-admin";
import { Link as RouterLink } from 'react-router-dom';

const CustomImageField = ({ source }: { source: string }) => {
    const record = useRecordContext();

    if (!record || !record[source]) {

        return <span>No logo</span>;
    }
    return (
        <RouterLink to={`/brands/${record.id}/update-logo`
        }>
            <img src={record[source]} alt="Brand" style={{ width: '100px', height: 'auto' }} />
        </RouterLink >

    );

};
export const BrandList = () => (
    <List>
        <Datagrid rowClick={false}>
            <TextField source="brandId" label="Brand ID" />
            <TextField source="brandName" label="Brand Name" />
            <CustomImageField source="logo" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>

);

export const BrandCreate = () => (
    <Create >
        <SimpleForm>
            <TextInput source="brandName" label="Brand Name" />
        </SimpleForm>
    </Create>

);

export const BrandEdit = () => (<Edit>
    <SimpleForm>
        <TextInput source="brandId" label="Brand ID" disabled />
        <TextInput source="brandName" label="Brand Name" />
    </SimpleForm>
</Edit>

);