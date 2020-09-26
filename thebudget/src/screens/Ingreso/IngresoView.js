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
  import { DataTable } from 'react-native-paper';

  import * as SQLite from 'expo-sqlite';
  import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table"


const db = SQLite.openDatabase("budgetgo.db");





export default class IngresoView extends React.Component {
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
    title: 'Ingresos'
  };

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      variable: [],
      variableDos:0
            }
    this.select()
  }

  submitAndClear = () => {
    this.props.writeText(this.state.text)

    this.setState({
      text: ''
    })
  }
  componentDidMount() {
    this.select();
  }

  SampleFunction=(item)=>{
 
    Alert.alert(item);
 
  }

  render(){
    var SampleNameArray = [101000,1000];
    const { navigation } = this.props;
    let medioCobro=[{
      value: 'Sueldo',
    },{
      value: 'Aguinaldo',
    },{
      value: 'MercadoPago',
    },{
      value: 'Efectivo',
    },]
    return(
      <View style={styles.viewContainer}>
        <Button 
        title="Agregar"
        onPress={() => navigation.navigate('Ingreso')}/>
        
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>Fecha</DataTable.Title>    
            <DataTable.Title>Detalle</DataTable.Title>
            <DataTable.Title numeric>Monto</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
            <DataTable.Cell>25/9/2020</DataTable.Cell>
            <DataTable.Cell>{this.state.variable.fecha}</DataTable.Cell>
            <DataTable.Cell numeric>$30000</DataTable.Cell>
            </DataTable.Row>
          </DataTable>

            { SampleNameArray.map((item, key)=>(
         <Text key={key} style={styles.TextStyle} onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
         )}

        
      </View>
    );
  }

select() {
  console.log("select ingresoview");
  
  db.transaction(tx => {
    tx.executeSql("select * from movimientos", [], (_, { rows }) =>
        //this.state({fecha: JSON.stringify(rows._array)}) ,
         // this.setState({ datos_tabla: JSON.parse(window.localStorage.getItem("ranking")) })
        //this.setState(variable)=JSON.stringify(rows._array[0].fecha),
        this.setState({ variable: JSON.stringify(rows._array) }),
        //this.setState({ variableDos: JSON.stringify(row }),
        //this.setState({ variableDos: JSON.stringify(rows._array[1].detalle) }),
        console.log(this.state.variable+" todo")
        //console.log(this.state.fecha+" slect")
        //this.setState({ items: _array })
      );
  });
}


}
 
//onPress={navigation.navigate('IngredientsDetails', {  })}
//onPress={() => Alert.alert('Simple Button pressed')}



const styles = StyleSheet.create({
  viewContainer: {
    width: '90%',
    marginLeft: 20,
    marginTop: 20
  },
  titulo: {
    fontSize: 30,
    backgroundColor: 'gray',
    paddingLeft: 10,
    marginLeft: 50
    /* height: 40,y
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 20,
    margin: 10 */
    //borderRadius: 20
  },
  monto:{
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
//AppRegistry.registerComponent('clear-text', () => ChangeText)

/*<PricingCard
            color="#4f9deb"
            title="Sueldo"
            price="$10000"
            info={['09/09/2020']}
            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
        />
        
        
        /> */