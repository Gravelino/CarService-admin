import {Admin, EditGuesser, ListGuesser, Resource} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="Customers" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Services" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Visits" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Payments" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Workers" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);
