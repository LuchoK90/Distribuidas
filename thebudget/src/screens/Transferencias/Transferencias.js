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
import BotonRealizarTransferencia from '../../components/botonRealizarTransferencia/botonRealizarTransferencia';
import InputCBUDestino from '../../components/inputCBUDestino/inputCBUDestino';

const { width: viewportWidth } = Dimensions.get('window');

export default class Transferencias extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
   // const category = getCategoryById(item.categoryId);
    //const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipe}>N° CUENTA: {item.nCuenta}</Text>
     
          </View>

          <View style={styles.infoContainer}>
       
            <Text style={styles.infoRecipe}>CBU: {item.cbu}</Text>
        
          </View>

          <View style={styles.infoContainer}>
           
            <Text style={styles.infoRecipe}>SALDO: $ {item.saldo}</Text>
          </View>

          <View style={{marginTop:20}}>
           
           <Text style={styles.infoRecipe}>Ingrese CBU de Cuenta Destino</Text>
         </View>
          <InputCBUDestino/>
          <View style={{marginTop:20}}>
           
           <Text style={styles.infoRecipe}>Ingrese monto a transferir ($)</Text>
         </View>
         <InputCBUDestino/>
         <View style={{marginTop:20}}>
           
           <Text style={styles.infoRecipe}>Ingrese Descripción</Text>
         </View>
          <InputCBUDestino/>
          <View style={styles.infoContainer}>
            <BotonRealizarTransferencia
              onPress={() => {
                let ingredients = item.ingredients;
                let title = 'Ingredients for ' + item.title;
                navigation.navigate('CuentasBancarias', { ingredients, title });
              }}
            />
          </View>
        </View>
      </ScrollView>
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
