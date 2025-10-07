import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin';

export const ownerEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            
            <TextInput source="first_name" label="Nombre" fullWidth />
            <TextInput source="last_name" label="Apellido" fullWidth />
            <TextInput source="email" type="email" fullWidth />
            <DateInput disabled source="created_at" label="Fecha Creación" />

        </SimpleForm>
    </Edit>
);