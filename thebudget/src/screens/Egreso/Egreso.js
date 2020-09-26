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
  import ElegirFecha from '../../components/ElegirFecha/ElegirFecha';
  import Camara from '../../components/Camara/Camara';

import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import SelectMultiple from 'react-native-select-multiple';
import MultiSelect from 'react-native-multiple-select';
import PickList from 'react-native-picklist';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as SQLite from 'expo-sqlite';



const db = SQLite.openDatabase("budgetgo.db");

const fruits = ['Septiembre', 'Octubre', 'Noviembre'];

const items = [{
  id: '92iijs7yta',
  name: 'Ondo'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun'
}, {
  id: '16hbajsabsd',
  name: 'Calabar'
}, {
  id: 'nahs75a5sg',
  name: 'Lagos'
}, {
  id: '667atsas',
  name: 'Maiduguri'
}, {
  id: 'hsyasajs',
  name: 'Anambra'
}, {
  id: 'djsjudksjd',
  name: 'Benue'
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna'
}, {
  id: 'suudydjsjd',
  name: 'Abuja'
  }
];

const userList = {
  "123":"Tom",
  "124":"Michael",
  "125":"Christin"
};


export default class Egreso extends React.Component {

  static navigationOptions = PickList.navigationOptions;
  state = { selectedFruits: [] };
  state = {
    //We will store selected item in this
    selectedItems: [],
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    //Set Selected Items
  };
 
  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  };

  state = {
    image: null,
  };

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
    title: 'Egreso'
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
      tx.executeSql("select * from movimientos", [], (_, { rows }) =>
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
      <Text>Débito Automático</Text>
      </View>
    );
  };

  state = {
    selectedItems : []
  };

  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

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
    //const { selectedItems } = this.state;
    const { navigation } = this.props;
    let medioGasto=[{
      value: '74144/78998',
    },{
      value: '74889/12321',
    },{
      value: 'Efectivo',
    },]
    let detalle=[{
      value: 'Universidad',
    },{
      value: 'Luz',
    },{
      value: 'Gas',
    },{
      value: 'Cable',
    },{
      value: 'Telefono',
    },{
      value: 'Internet',
    },{
      value: 'Impuesto Nacional',
    },{
      value: 'Impuesto Provincial',
    },{
      value: 'Impuesto Municipal',
    },{
      value: 'Colegio',
    },{
      value: 'Obra Social',
    },{
      value: 'Gastos Varios',
    },{
      value: 'Comida',
    },{
      value: 'Viáticos',
    },{
      value: 'Entretenimiento',
    }]
    let meses=[{
      value: 'Todos los meses',
    },{
      value: 'Bimestral',
    },{
      value: 'Trimestral',
    },{
      value: 'Cuatrimestral',
    },{
      value: 'Semestral',
    }]

    let Cuotas=[{
      value: '3',
    },{
      value: '6',
    },{
      value: '9',
    },{
      value: '12',
    },{
      value: '18',
    }]
    let { image } = this.state;
    const { selectedItems } = this.state;
    return (
      <View style={styles.viewContainer}>
      
      <TextInput
      style={styles.textInput}
      placeholder='Monto'
      clearButtonMode='always'
      keyboardType='number-pad'
      onChangeText={monto => this.setState({ monto })}
      editable={this.state.TextInputDisableHolder}
    />

    <Dropdown
      label='Seleccionar Detalle'
      data={detalle}
      onChangeText={detalle => this.setState({ detalle })}
      disabled={false}
    />
    <Dropdown 
      label='Seleccionar Medio de Pago'
      data={medioGasto}
      onChangeText={medio => this.setState({ medio })}
    />
    <Dropdown 
    label='Seleccionar Cuotas'
    data={Cuotas}
    onChangeText={cuotas => this.setState({ cuotas })}
    />
    <this.MyComponent></this.MyComponent>
    <ElegirFecha title="hasta" style={{width:'100%'}}></ElegirFecha>
   
    <Button style={{marginBottom:10}} title="Adjuntar Comprobante" onPress={this._pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <View style={{marginTop:20}}>
    <Button 
    title="Guardar"
    onPress={() => this.add(this.state.monto,this.state.detalle,this.state.medio)}
    />  
     
    

    
     </View>


      </View>
    );
  }

  add(monto,detalle,medio) {
    db.transaction(
      tx => {
        tx.executeSql("insert into movimientos ( fecha, detalle, monto, medio, tipo_mov, comprobante) values (?,?, ?, ?, 'Egreso', '')", [this.getCurrentDate(), detalle,monto,medio]),(_,{ rows }) => 
                        console.log(JSON.stringify(rows)),(_,{ error}) => 
                        console.log(JSON.stringify(error));             
        
      },
     
    );
   
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
} 

/* <View style={styles.viewContainer}>
      
      <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#48d22b"
            submitButtonText="Submit"
          />
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

      <ElegirFecha></ElegirFecha>
      <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <View style={styles.row}>
            <View style={[styles.box, styles.box2]}><SelectMultiple
          items={fruits}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} /></View>
            <View style={[styles.box]}></View>
            <View style={[styles.box, styles.box3]}></View>
          </View>  

            
         }*/



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
    marginTop: 20,
    padding: 10
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
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  box: {
    flex: 1,
    height: 160,
    backgroundColor: '#333',
  },
  box2: {
    backgroundColor: 'green'
  },
  box3: {
    backgroundColor: 'orange'
  },
  two: {
    flex: 2
  }

})


AppRegistry.registerComponent('clear-text', () => ChangeText)

/* <View style={styles.viewContainer}>
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

<ElegirFecha></ElegirFecha>

<Camara></Camara>

</View> */