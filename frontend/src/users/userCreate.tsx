import { Create, SimpleForm, TextInput } from 'react-admin';

export const userCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="first_name" label="Nombre" fullWidth />
            <TextInput source="last_name" label="Apellido" fullWidth />
            <TextInput source="email" type="email" fullWidth />
            <TextInput source="password" type="password" fullWidth />
        </SimpleForm>
    </Create>
);