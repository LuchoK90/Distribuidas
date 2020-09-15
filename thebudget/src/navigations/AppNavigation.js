import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
/* import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' */
import Dashboard from '../screens/Home/HomeScreen';
import CuentasBancarias from '../screens/CuentaBancaria/CuentaBancaria';
import Login from '../screens/Login/Login';
import Transferencias from '../screens/Transferencias/Transferencias';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import NuevaCuenta from '../screens/NuevaCuenta/NuevaCuenta';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import Inversiones from '../screens/Inversiones/Inversiones';
import Invertir from '../screens/Invertir/Invertir';
import AgregarPlazoFijo from '../screens/AgregarPlazoFijo/AgregarPlazoFijo';
import AgregarTitulo from '../screens/AgregarTitulo/AgregarTitulo';
import AgregarAcciones from '../screens/AgregarAcciones/AgregarAcciones';
import Prestamos from '../screens/Prestamos/Prestamos';
import OtorgarPrestamo from '../screens/OtorgarPrestamo/OtorgarPrestamo';
import SolicitarPrestamo from '../screens/SolicitarPrestamo/SolicitarPrestamo';
import Ingreso from '../screens/Ingreso/Ingreso';
import Egreso from '../screens/Egreso/Egreso';
import EgresoView from '../screens/Egreso/EgresoView';
import Tarjeta from '../screens/Tarjeta/Tarjeta';
import TarjetaView from '../screens/Tarjeta/TarjetaView';
import IngresoView from '../screens/Ingreso/IngresoView';
import Presupuesto from '../screens/Presupuesto/Presupuesto';
import PresupuestoView from '../screens/Presupuesto/PresupuestoView';

/* const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  )
} */

const MainNavigator = createStackNavigator(
  {
    Dashboard: Dashboard,
    Login: Login,
    CuentasBancarias: CuentasBancarias,
    Transferencias: Transferencias,
    RecipesList: RecipesListScreen,
    Ingredient: IngredientScreen,
    Search: SearchScreen, 
    IngredientsDetails: IngredientsDetailsScreen,
    NuevaCuenta: NuevaCuenta,
    Invertir: Invertir,
    AgregarPlazoFijo: AgregarPlazoFijo,
    AgregarAcciones: AgregarAcciones,
    AgregarTitulo: AgregarTitulo,
    Prestamos: Prestamos,
    OtorgarPrestamo: OtorgarPrestamo,
    SolicitarPrestamo: SolicitarPrestamo,
    Inversiones: Inversiones,
    EgresoView: EgresoView,
    Egreso: Egreso,
    Ingreso: Ingreso,
    TarjetaView: TarjetaView,
    IngresoView: IngresoView,
    Tarjeta: Tarjeta,
    Presupuesto: Presupuesto,
    PresupuestoView: PresupuestoView,
  },
  {
    initialRouteName: 'Dashboard',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
); 

/* const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      drawerContent={props=> DrawerContainer}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} */

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

/* export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} */
 
export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;