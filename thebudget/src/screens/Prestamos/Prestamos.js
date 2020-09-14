import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { prestamos } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonOtorgarPrestamo from '../../components/BotonOtorgarPrestamo/BotonOtorgarPrestamo';
import BotonSolicitarPrestamo from '../../components/BotonSolicitarPrestamo/BotonSolicitarPrestamo';

export default class Prestamos extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Préstamos',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  constructor(props) {
    super(props);
  }

  onPressSolicitarPrestamo = item => {
    this.props.navigation.navigate('SolicitarPrestamo');
  };

  onPressOtorgarPrestamo = item => {
    this.props.navigation.navigate('OtorgarPrestamo');
  };

  renderPrestamos = ({ item }) => (

      <View style={styles.container}>
        <Text style={styles.elemento}>TIPO: {item.tipoPrestamo}</Text>
        <Text style={styles.elemento}>MONTO: $ {item.monto}</Text>
        <Text style={styles.elemento}>CUENTA: {item.cuenta}</Text>       
        <Text style={styles.elemento}>CUOTAS: {item.cuotas}</Text>  
      </View>
     
   
  );

  render() {
    return (
      <View style={{flex:1}}>
      <BotonOtorgarPrestamo
               onPress={() => {
                this.onPressOtorgarPrestamo();
              }}
            />
             <BotonSolicitarPrestamo
               onPress={() => {
                this.onPressSolicitarPrestamo();
              }}
            />
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={prestamos}
          renderItem={this.renderPrestamos}
          keyExtractor={item => `${item.recipeId}`}
        />
        
      </View>
    );
  }
}
