import {Admin, EditGuesser, ListGuesser, Resource} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

import { CustomerList } from "./components/customers/CustomerList";
import { CustomerEdit } from "./components/customers/CustomerEdit";
import { CustomerShow } from "./components/customers/CustomerShow";

import { ServiceList } from "./components/services/ServiceList";
import { ServiceEdit } from "./components/services/ServiceEdit";
import { ServiceCreate } from "./components/services/ServiceCreate";
import { ServiceShow } from "./components/services/ServiceShow";

import { CategoryServiceList } from "./components/categoryService/CategoryServiceList";
import { CategoryServiceEdit } from "./components/categoryService/CategoryServiceEdit";
import { CategoryServiceCreate } from "./components/categoryService/CategoryServiceCreate";
import { CategoryServiceShow } from "./components/categoryService/CategoryServiceShow";

import { WorkerList } from "./components/workers/WorkerList.tsx";
import { WorkerEdit } from "./components/workers/WorkerEdit";
import { WorkerShow } from "./components/workers/WorkerShow";

import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import HandymanIcon from '@mui/icons-material/Handyman';
import EngineeringIcon from '@mui/icons-material/Engineering';

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
    <Resource
      name="ServiceCategories"
      list={CategoryServiceList}
      edit={CategoryServiceEdit}
      create={CategoryServiceCreate}
      show={CategoryServiceShow}
      icon={CategoryIcon}
      options={{ label: 'Service categories' }}
    />
    <Resource
      name="Services"
      list={ServiceList}
      edit={ServiceEdit}
      create={ServiceCreate}
      show={ServiceShow}
      icon={HandymanIcon}
      options={{ label: 'Services' }}
    />
    <Resource name="Visits" list={ListGuesser} edit={EditGuesser} />
    {/*<Resource name="Payments" list={ListGuesser} edit={EditGuesser} />*/}
    <Resource
      name="Workers"
      list={WorkerList}
      edit={WorkerEdit}
      show={WorkerShow}
      icon={EngineeringIcon}
      options={{ label: 'Workers' }}
    />
  </Admin>
);

const Dashboard = () => (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the car service administrative panel</h1>
      <p>Select the desired section from the menu on the left to manage your data.</p>
    </div>
);