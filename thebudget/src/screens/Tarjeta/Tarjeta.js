import React , { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight, TextInput
} from 'react-native';
import hola from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import { AppRegistry, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Dropdown }
  from 'react-native-material-dropdown';



export default class Tarjeta extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  static navigationOptions = {
    title: 'Tarjeta'
  };

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  submitAndClear = () => {
    this.props.writeText(this.state.text)

    this.setState({
      text: ''
    })
  }

  render(){
    const { navigation } = this.props;
    let emisor=[{
      value: 'Visa',
    },{
      value: 'MasterCard',
    },{
      value: 'Cabal',
    },{
      value: 'American Express',
    }]
    return(
      <View style={styles.viewContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Banco'
          clearButtonMode='always'
        />
        <Dropdown 
          label='Seleccionar entidad emisora'
          data={emisor}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Últimos 4 números'
          clearButtonMode='always'
          keyboardType='number-pad'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Fecha Vencimiento'
          clearButtonMode='always'
          keyboardType='number-pad'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Fecha cierre resumen'
          clearButtonMode='always'
          keyboardType='number-pad'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Fecha vencimiento resumen'
          clearButtonMode='always'
          keyboardType='number-pad'
        />
        <Button 
        title="Guardar"
        onPress={() => navigation.navigate('TarjetaView')}
        />  
      </View>
    );
  }
} 
//onPress={navigation.navigate('IngredientsDetails', {  })}
//onPress={() => Alert.alert('Simple Button pressed')}
          //onPress={this.submitAndClear}

     /*      <Dropdown 
          label='fruta favorita'
          data={info}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Categoria'
          clearButtonMode='always'
        />
        <TextInput
          style={styles.textInput}
        placeholder='Medio de pago'
        clearButtonMode='always'
        /> */
/*const getFullName = (uno , dos , tres) => {
  return uno + " " + dos + " " + tres; 
}

const cat = () => {
  return(
    <View>
      <Text>hello im...</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue= 'Name me!'
      />
    </View>

  )
} 
*/


/*const Cat = (props) => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
}

const Cafe = () => {

  return (
    <View>
      <Cat name="Buji" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
          
        }}
        keyboardType='number-pad'
        //defaultValue= 'Name me!'
      />
    </View>
  );
}

export default Cafe;  */
const styles = StyleSheet.create({
  viewContainer: {
    width: '90%',
    marginLeft: 20,
    marginTop: 20
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 20,
    margin: 10
    //borderRadius: 20
  },
  drop:{
    //borderColor: 'gray',
    paddingLeft: 20,
    margin: 10
    //borderRadius: 20
  },
  boton:{
    height: 40,
    borderWidth: 1,
    //borderColor: 'gray',
    paddingLeft: 20,
    margin: 10
  }
})
AppRegistry.registerComponent('clear-text', () => ChangeText)