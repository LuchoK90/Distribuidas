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
  import BotonPresupuestarIngresos from '../../components/botonPresupuestarIngresos/botonPresupuestarIngresos';
  import BotonPresupuestarEgresos from '../../components/botonPresupuestarEgresos/botonPresupuestarEgresos';
  import BotonPresupuestarInversiones from '../../components/botonPresupuestarInversiones/botonPresupuestarInversiones';
  import BotonPresupuestarPrestamo from '../../components/botonPresupuestarPrestamo/botonPresupuestarPrestamo';

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
    title: 'Seleccione Rubro'
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

  onPressPresupuestarIngresos = item => {
    this.props.navigation.navigate('PresupuestarIngresos');
  };

  onPressPresupuestarEgresos = item => {
    this.props.navigation.navigate('PresupuestarEgresos');
  };

  onPressPresupuestarInversiones = item => {
    this.props.navigation.navigate('PresupuestarInversiones');
  };

  onPressPresupuestarPrestamos = item => {
    this.props.navigation.navigate('PresupuestarPrestamos');
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
      value: 'Ingreso',
    },{
      value: 'Egreso',
    },{
      value: 'Inversiones',
    },{
      value: 'Prestamos',
    }]
    
    return(
      <View style={styles.viewContainer}>        
       <BotonPresupuestarIngresos 
               onPress={() => {
                this.onPressPresupuestarIngresos();
              }}
            /> 
           
            <BotonPresupuestarEgresos
               onPress={() => {
                this.onPressPresupuestarEgresos();
              }}
            />
        
            <BotonPresupuestarInversiones
               onPress={() => {
                this.onPressPresupuestarInversiones();
              }}
            />

<BotonPresupuestarPrestamo
               onPress={() => {
                this.onPressPresupuestarPrestamos();
              }}
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
    
  },
  drop:{
    
    paddingLeft: 20,
    margin: 10
    
  },
  boton:{
    height: 40,
    borderWidth: 1,
    
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