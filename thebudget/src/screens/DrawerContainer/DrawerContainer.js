import React from 'react';
import { View, AsyncStorage, DevSettings } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import RNExitApp from 'react-native-exit-app';

const idUsuarioLogueado = '@my-app:value';

export default class DrawerContainer extends React.Component {

 

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home2.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="DASHBOARD"
            source={require('../../../assets/icons/dashboard.png')}
            onPress={() => {
              navigation.navigate('Dashboard_Posta');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="INGRESOS"
            source={require('../../../assets/icons/ingresos.png')}
            onPress={() => {
              navigation.navigate('IngresoView');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="EGRESOS"
            source={require('../../../assets/icons/egresos.png')}
            onPress={() => {
              navigation.navigate('EgresoView');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="TARJETAS"
            source={require('../../../assets/icons/cards.png')}
            onPress={() => {
              navigation.navigate('TarjetaView');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="CUENTAS BANCARIAS"
            source={require('../../../assets/icons/cuentas.png')}
            onPress={() => {
              navigation.navigate('CuentasBancarias');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="INVERSIONES"
            source={require('../../../assets/icons/inversiones.png')}
            onPress={() => {
              navigation.navigate('Inversiones');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="PRÉSTAMOS"
            source={require('../../../assets/icons/prestamos.png')}
            onPress={() => {
              navigation.navigate('Prestamos');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="PRESUPUESTO"
            source={require('../../../assets/icons/presupuesto.png')}
            onPress={() => {
              navigation.navigate('PresupuestoView');
              navigation.closeDrawer();
            }}
          />
        <MenuButton
            title="EXPORTAR EXCEL"
            source={require('../../../assets/icons/presupuesto.png')}
            onPress={() => {
              navigation.navigate('ExportExcel');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="BACKUP"
            source={require('../../../assets/icons/presupuesto.png')}
            onPress={() => {
              navigation.navigate('Backup');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CERRAR SESION"
            source={require('../../../assets/icons/exit.png')}
            onPress={() => {  
             
              navigation.navigate('Login');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
