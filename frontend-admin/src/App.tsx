import { Admin, Resource, ShowGuesser, EditGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import { CategoryList, CategoryCreate, CategoryEdit } from "./component/Category";
import { ProductCreate, ProductEdit, ProductList } from "./component/Product";
import { CartList, CartShow } from "./component/Cart";
import ProductImageUpdate from "./component/ProductUpdateImage";
import { BrandCreate, BrandEdit, BrandList } from "./component/Brand";
import BrandUpdateImage from "./component/BrandUpdateImage";

export const App = () => (
  <Admin authProvider={authProvider} layout={Layout} dataProvider={dataProvider} dashboard={Dashboard}>
    <CustomRoutes>
      <Route path="/products/:id/update-image" element={<ProductImageUpdate />} />
      <Route path="/brands/:id/update-logo" element={<BrandUpdateImage/>} />
    </CustomRoutes>
    <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={CategoryIcon} />
    <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} icon={Inventory2Icon} />
    <Resource name="brands" list={BrandList} create={BrandCreate} edit={BrandEdit} icon={CategoryIcon} />
    <Resource name="carts" list={CartList} show ={CartShow} icon={ShoppingCartIcon}/>   

  </Admin>

);