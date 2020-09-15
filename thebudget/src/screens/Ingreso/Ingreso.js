import React, { Component, useState }  from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight, TextInput, Switch
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
  import { Checkbox } from 'react-native-paper';



export default class Ingreso extends React.Component {
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
    title: 'Ingreso'
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
  MyComponent = () => {
    const [checked, setChecked] = React.useState(false);
  
    return (
      <View style={styles.periodico}>
      <Checkbox 
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
      <Text>Periódico</Text>
      </View>
    );
  };

  render(){
    const { navigation } = this.props;
    let medioCobro=[{
      value: '74144/78998',
    },{
      value: '74889/12321',
    },{
      value: '46546/45645',
    },{
      value: 'Efectivo',
    },]
    let detalle=[{
      value: 'Sueldo',
    },{
      value: 'Facturación Autónomo',
    },{
      value: 'Alquiler Propiedad',
    }]
    
    return(
      <View style={styles.viewContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Monto'
          clearButtonMode='always'
          keyboardType='number-pad'
        />
        <Dropdown 
          label='Seleccionar Detalle'
          data={detalle}
        />
        <Dropdown 
          label='Seleccionar medio de cobro'
          data={medioCobro}
        />
        <this.MyComponent></this.MyComponent>
        <Button 
        title="Guardar"
        onPress={() => navigation.navigate('IngresoView')}
        />  
      </View>
    );
  }
} 
//onPress={navigation.navigate('IngredientsDetails', {  })}
//onPress={() => Alert.alert('Simple Button pressed')}
//onPress={() => navigation.navigate('IngresoView')}
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  periodico:{
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  }

})


AppRegistry.registerComponent('clear-text', () => ChangeText)