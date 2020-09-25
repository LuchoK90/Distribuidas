import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput, Alert,StyleSheet,
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import BotonNuevaCuenta from '../../components/BotonNuevaCuenta/BotonNuevaCuenta';
import InputCBUDestino from '../../components/inputCBUDestino/inputCBUDestino';
import SelectPresupuestoCategoriaIngreso from '../../components/SelectPresupuestoCategoriaIngreso/SelectPresupuestoCategoriaIngreso';
import * as SQLite from 'expo-sqlite';
import Constants from "expo-constants";

const { width: viewportWidth } = Dimensions.get('window');
const db = SQLite.openDatabase("budgetgo.db");

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
      activeSlide: 0,
      montoPresupuesto:0
    };
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
      tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
    });
  }

  montoPresupuesto(montoPresupuesto) {

    this.setState({ montoPresupuesto: montoPresupuesto })
   
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
           
           <Text style={styles.infoRecipe}>Ingrese Monto Presupuestado ($)</Text>
         </View>
          <InputCBUDestino onChange={(ev) => { this.montoPresupuesto(ev.target.value) }} ref="montoPresupuesto" name="montoPresupuesto" id="montoPresupuesto"/>
          <View>
           
           <Text style={styles.infoRecipe}>Seleccione Categoría</Text>
         </View>
          <SelectPresupuestoCategoriaIngreso/>

          <View style={styles.infoContainer}>
            <BotonNuevaCuenta
            
            />
            <Button title="HOLA"  onPress={() => {
              this.add("Hola");
            }}></Button>
              <Button title="CHAU"  onPress={() => {
              this.select();
            }}></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
  add(text) {
    // is text empty?
    console.log("text",text)
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [text]),(_,{ rows }) => 
                        console.log(JSON.stringify(rows)),(_,{ error}) => 
                        console.log(JSON.stringify(error));             
        
      },
     
    );
   
  }

  select() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}  

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
 