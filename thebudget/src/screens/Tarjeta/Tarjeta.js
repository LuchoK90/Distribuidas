import React , { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight, TextInput
} from 'react-native';
import estilos from './estilos';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import { AppRegistry, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Dropdown }
  from 'react-native-material-dropdown';
  import ElegirFecha from '../../components/ElegirFecha/ElegirFecha';
  import * as SQLite from 'expo-sqlite';



  const db = SQLite.openDatabase("budgetgo.db");


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

    this.state = { chosenDate: new Date(), prueba: false };
    this.setDate = this.setDate.bind(this);
    this.state = { TextInputDisableStatus: true }
    //Aca
    this.state = {date:"20-09-2020"}
     //Tabla de movimientos
     
    db.transaction(tx => {
      console.log("ingreso constructor");
      /* tx.executeSql(
        "create table if not exists movimientos (id_movimiento integer primary key not null, fecha text, detalle text, monto int, medio text, tipo_mov text, comprobante text);"
      ); */
      tx.executeSql("select * from tarjetas", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
      );
    });
  }

  submitAndClear = () => {
    this.props.writeText(this.state.text)

    this.setState({
      text: ''
    })
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    
    console.log(date + '/' + month + '/' + year + "getCurrentDate"+this.state.fecha);
    return date + '/' + month + '/' + year;
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
          onChangeText={banco => this.setState({ banco })}
        />
        <Dropdown 
          label='Seleccionar entidad emisora'
          data={emisor}
          onChangeText={emisor => this.setState({ emisor })}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Últimos 4 números'
          clearButtonMode='always'
          keyboardType='number-pad'
          onChangeText={numeros => this.setState({ numeros })}
        />
        <Text>Fecha Vencimiento</Text>
        <ElegirFecha style={{width:'100%'}} onChangeText={vencimiento => this.setState({ vencimiento })}></ElegirFecha>
        <Text>Fecha Cierre Resumen</Text>
        <ElegirFecha style={{width:'100%'}} onChangeText={cierre_resumen => this.setState({ cierre_resumen })}></ElegirFecha>
        <Text>Fecha Vencimiento Resumen</Text>
        <ElegirFecha style={{width:'100%'}} onChangeText={vencimiento_resumen => this.setState({ vencimiento_resumen })}></ElegirFecha>
        
        <Button 
        title="Guardar"
        onPress={() => this.add(this.state.banco,this.state.emisor,this.state.numeros,this.state.vencimiento,this.state.cierre_resumen,this.state.vencimiento_resumen)}
        />  
      </View>
    );
  }
  add(banco, emisor, numeros, vencimiento, cierre_resumen, vencimiento_resumen) {
    db.transaction(
      tx => {
        tx.executeSql("insert into tarjetas (banco, entidad, numero, vencimiento, cierre_resumen,  vencimiento_resumen) values (?, ?, ?, ?, ?, ?)", [banco, emisor, numeros, vencimiento, cierre_resumen, vencimiento_resumen]),(_,{ rows }) => 
                        console.log(JSON.stringify(rows)),(_,{ error}) => 
                        console.log(JSON.stringify(error));             
        
      },
     
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