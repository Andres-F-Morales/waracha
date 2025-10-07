import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin';

export const assetCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" fullWidth validate={[required()]}/>

            <ReferenceInput
                source="type_id"
                reference="asset-types"
            >
                <SelectInput optionText="name" validate={[required()]} />
            </ReferenceInput>

            <ReferenceInput
                source="owner_id"
                reference="owners"
            >
                <SelectInput optionText={(record) => `${record.first_name} ${record.last_name}`} validate={[required()]} />
            </ReferenceInput>
            <TextInput source="serial" fullWidth validate={[required()]}/>
        </SimpleForm>
    </Create>
);