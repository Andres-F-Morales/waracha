import { List, Datagrid, TextField, ReferenceField, DateField, EditButton, DeleteButton } from 'react-admin';

export const assetList = () => (
    <List>
        <Datagrid rowClick="edit">

            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="serial" />
            <TextField source="type_name" />
            <TextField source="owner_name" />
            <TextField source="owner_email" />

            <DateField source="created_at" showTime={false} />
            <DateField source="updated_at"showTime={false} />

            <EditButton />
            <DeleteButton />

        </Datagrid>
    </List>
);