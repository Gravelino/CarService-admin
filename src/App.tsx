import {Admin, EditGuesser, ListGuesser, Resource} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

import { CustomerList } from "./components/customers/CustomerList";
import { CustomerEdit } from "./components/customers/CustomerEdit";
import { CustomerShow } from "./components/customers/CustomerShow";

import PeopleIcon from '@mui/icons-material/People';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={() => <Dashboard />}

  >
    <Resource
        name="Customers"
        list={CustomerList}
        edit={CustomerEdit}
        show={CustomerShow}
        icon={PeopleIcon}
        options={{ label: 'Customers' }}
    />
    <Resource name="Services" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Visits" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Payments" list={ListGuesser} edit={EditGuesser} />
    <Resource name="Workers" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

const Dashboard = () => (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the car service administrative panel</h1>
      <p>Select the desired section from the menu on the left to manage your data.</p>
    </div>
);