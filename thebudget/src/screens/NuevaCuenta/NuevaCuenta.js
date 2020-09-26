import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import BotonNuevaCuenta from '../../components/BotonNuevaCuenta/BotonNuevaCuenta';
import InputCBUDestino from '../../components/inputCBUDestino/inputCBUDestino';
import SelectTarjeta from '../../components/SelectTarjeta/SelectTarjeta';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("budgetgo.db");

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'false',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
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
      tx.executeSql("select * from cuentas", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
      );
    });
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



  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');


    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}></Text>
          <View style={styles.infoContainer}>
          </View>

          <View>
           
           <Text style={styles.infoRecipe}>Ingrese Entidad Bancaria</Text>
         </View>
          <InputCBUDestino
            onChangeText={banco => this.setState({ banco })}
          />
          <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese Número de Cuenta</Text>
         </View>
          <InputCBUDestino
             onChangeText={numero => this.setState({ numero })}
          />
          <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese CBU</Text>
         </View>
         <InputCBUDestino
            onChangeText={cbu => this.setState({ cbu })}
         />
         <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese Tarjeta Asociada</Text>
         </View>
         <InputCBUDestino
           onChangeText={debito => this.setState({ debito })}
         />
         <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese Saldo</Text>
         </View>
          <InputCBUDestino
             onChangeText={saldo => this.setState({ saldo })}
          />

          <View style={styles.infoContainer}>
            <BotonNuevaCuenta
            
            />
          </View>
        </View>
      </ScrollView>
    );
  }
  add(banco, numero, cbu, debito, saldo) {
    db.transaction(
      tx => {
        tx.executeSql("insert into cuentas (banco, numero, cbu, debito, saldo) values (?, ?, ?, ?, ?)", [banco, numero, cbu, debito, saldo]),(_,{ rows }) => 
                        console.log(JSON.stringify(rows)),(_,{ error}) => 
                        console.log(JSON.stringify(error));             
        
      },
     
    );
   
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
