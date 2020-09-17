import React from 'react';
import { 
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



export default class Presupuesto extends React.Component {
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
    title: 'Presupuesto'
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
    let categoria=[{
      value: 'Servicios',
    },{
      value: 'Impuestos',
    },{
      value: 'Otros',
    }]
    let rubro=[{
      value: 'Luz',
    },{
      value: 'Alquiler',
    },{
      value: 'Gas',
    },{
      value: 'Municipal',
    },{
      value: 'Provincial',
    },{
      value: 'Otro',
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
          label='Categoría'
          data={categoria}
        />
        <Dropdown 
          label='Rubro'
          data={rubro}
        />
        
        
        <Button 
        title="Guardar"
        onPress={() => navigation.navigate('PresupuestoView')}
        />  
      </View>
    );
  }
} 

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