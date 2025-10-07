import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton } from 'react-admin';

export const ownerList = () => (
    <List>
        <Datagrid rowClick="edit">
            
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            
            <EmailField source="email" />
            <DateField source="created_at" showTime={false} />
            <DateField source="updated_at" showTime={false} />
            
            <EditButton />
            <DeleteButton />
            
        </Datagrid>
    </List>
);