import {
    List,
    Datagrid,
    TextField,
    DeleteButton,
    EditButton,
    Create,
    Edit,
    SimpleForm,
    TextInput
} from "react-admin";

// Component for listing categories
export const CategoryList = () => (
    <List>
        <Datagrid>
            <TextField source="categoryId" label="Category ID" />
            <TextField source="categoryName" label="Category Name" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Component for creating a new category
export const CategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="categoryName" label="Category Name" />
        </SimpleForm>
    </Create>
);

// Component for editing an existing category
export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="categoryId" label="Category ID" disabled />
            <TextInput source="categoryName" label="Category Name" />
        </SimpleForm>
    </Edit>
);