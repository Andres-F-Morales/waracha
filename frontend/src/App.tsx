import { Admin, Resource, ListGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Dashboard } from "./Dashboard";
import { userCreate } from "./users/userCreate";
import { userEdit } from "./users/userEdit";
import { ownerCreate } from "./owners/ownerCreate.tsx";
import { ownerEdit } from "./owners/ownerEdit.tsx";
import { userList } from "./users/userList";
import { ownerList } from "./owners/ownerList";
import WarachaLogin from "./Login";
import { assetList } from "./assets/assetList.tsx";
import { assetCreate } from "./assets/assetCreate.tsx";

export const App = () => (
  <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={WarachaLogin}
        dashboard={Dashboard}
    >
      <Resource name="assets" 
        list={assetList}
        create={assetCreate} />
      <Resource name="asset-types" />
      <Resource name="owners" 
        list={ownerList}
        create={ownerCreate}
        edit={ownerEdit}
        options={{ hasCreate: true }} 
      />

      <Resource name="users" 
        list={userList}
        create={userCreate}
        edit={userEdit}
      />
    </Admin>
);
