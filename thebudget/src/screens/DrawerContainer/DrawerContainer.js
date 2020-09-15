import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="DASHBOARD"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Dashboard');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="INGRESOS"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('IngresoView');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="EGRESOS"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('EgresoView');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="TARJETAS"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('TarjetaView');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="CUENTAS BANCARIAS"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('CuentasBancarias');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="INVERSIONES"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Inversiones');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="PRÉSTAMOS"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Prestamos');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="PRESUPUESTO"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="SALIR"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
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
