import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Button } from 'react-native';
import styles from './styles';
import { tarjetas } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonAgregarCuenta from '../../components/botonAgregarCuenta/botonAgregarCuenta';

export default class TarjetaView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tarjetas',
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
    this.props.navigation.navigate('GastosAcumulados', { item });
  };

  onPressNuevaTarjeta = item => {
    this.props.navigation.navigate('Tarjeta');
  };

  renderRecipes = ({ item }) => (

      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.elemento}>VISA</Text>
        <Text style={styles.elemento}>LIMITE: 3000</Text>
        <Text style={styles.elemento}>TARJETA: {item.tarjeta}</Text>
        <Text style={styles.elemento}>ACUMULADO: $ {item.saldo}</Text>
       
           

        <Button 
        title="Detalle"
        onPress={() => {
          this.onPressTransferencia(item);
        }}/>
            
       
      </View>
     
   
  );

  render() {
    return (
      <View style={{flex:1}}>
      <Button 
        title="Agregar"
        onPress={() => {
          this.onPressNuevaTarjeta();
        }}/>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={tarjetas}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
        
      </View>
    );
  }
}
