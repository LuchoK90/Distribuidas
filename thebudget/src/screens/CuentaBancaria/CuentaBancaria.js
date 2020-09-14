import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonRealizarTransferencia from '../../components/botonRealizarTransferencia/botonRealizarTransferencia';
import BotonAgregarCuenta from '../../components/botonAgregarCuenta/botonAgregarCuenta';

export default class CuentaBancaria extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Cuentas Bancarias',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  constructor(props) {
    super(props);
  }

  onPressTransferencia = item => {
    this.props.navigation.navigate('Transferencias', { item });
  };

  onPressNuevaCuenta = item => {
    this.props.navigation.navigate('NuevaCuenta');
  };

  renderRecipes = ({ item }) => (

      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.elemento}>N° DE CUENTA: {item.nCuenta}</Text>
        <Text style={styles.elemento}>CBU: {item.cbu}</Text>
        <Text style={styles.elemento}>TARJETA: {item.tarjeta}</Text>
        <Text style={styles.elemento}>SALDO: $ {item.saldo}</Text>
       
            <BotonRealizarTransferencia
              onPress={() => {
                this.onPressTransferencia(item);
              }}
            />
       
      </View>
     
   
  );

  render() {
    return (
      <View style={{flex:1}}>
      <BotonAgregarCuenta
               onPress={() => {
                this.onPressNuevaCuenta();
              }}
            />
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
        
      </View>
    );
  }
}
