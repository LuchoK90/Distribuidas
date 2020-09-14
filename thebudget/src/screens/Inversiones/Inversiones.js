import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { inversiones } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonRealizarTransferencia from '../../components/botonRealizarTransferencia/botonRealizarTransferencia';
import BotonAgregarInversion from '../../components/botonAgregarInversion/botonAgregarInversion';

export default class Inversiones extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Inversiones',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  constructor(props) {
    super(props);
  }

  onPressNuevaInversion = item => {
    this.props.navigation.navigate('Invertir');
  };

  renderInversiones = ({ item }) => (

      <View style={styles.container}>
        <Text style={styles.elemento}>TIPO: {item.tipoInversion}</Text>
        <Text style={styles.elemento}>{item.info}</Text>
        <Text style={styles.elemento}>CAPITAL INVERTIDO: $ {item.capitalInvertido} </Text>
        <Text style={styles.elemento}>RENDIMIENTO: {item.ganancia} %</Text>
        <Text style={styles.elemento}>VENCIMIENTO: {item.vencimiento}</Text>
        <Text style={styles.elemento}>CUENTA: {item.cuenta}</Text>       
      </View>
     
   
  );

  render() {
    return (
      <View style={{flex:1}}>
      <BotonAgregarInversion
               onPress={() => {
                this.onPressNuevaInversion();
              }}
            />
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={inversiones}
          renderItem={this.renderInversiones}
          keyExtractor={item => `${item.recipeId}`}
        />
        
      </View>
    );
  }
}
