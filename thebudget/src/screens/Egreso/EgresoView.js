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

export default class EgresoView extends React.Component {
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
    title: 'Egresos'
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
    return(
      <View style={styles.viewContainer}>
        <Button 
        title="Agregar"
        onPress={() => navigation.navigate('Egreso')}/>
        
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>Fecha</DataTable.Title>    
            <DataTable.Title>Detalle</DataTable.Title>
            <DataTable.Title numeric>Monto</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
            <DataTable.Cell>05/09/2020</DataTable.Cell>
            <DataTable.Cell>Luz</DataTable.Cell>
            <DataTable.Cell numeric>1400</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
            <DataTable.Cell>13/09/2020</DataTable.Cell>
            <DataTable.Cell>UADE</DataTable.Cell>
            <DataTable.Cell numeric>21500</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
            <DataTable.Cell>17/09/2020</DataTable.Cell>
            <DataTable.Cell>Obra Social</DataTable.Cell>
            <DataTable.Cell numeric>5420</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
            <DataTable.Cell>20/09/2020</DataTable.Cell>
            <DataTable.Cell>Comida</DataTable.Cell>
            <DataTable.Cell numeric>2000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
            <DataTable.Cell>28/09/2020</DataTable.Cell>
            <DataTable.Cell>Internet</DataTable.Cell>
            <DataTable.Cell numeric>1800</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
                console.log(page);
            }}
            label="1-2 of 6"
            />
        </DataTable>
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
AppRegistry.registerComponent('clear-text', () => ChangeText)

/*<PricingCard
            color="#4f9deb"
            title="Sueldo"
            price="$10000"
            info={['09/09/2020']}
            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
        />
        
        
        /> */