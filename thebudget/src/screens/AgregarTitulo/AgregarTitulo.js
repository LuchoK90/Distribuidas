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
import SelectModoPlazoFijo from '../../components/SelectModoPlazoFijo/SelectModoPlazoFijo';

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
           
           <Text style={styles.infoRecipe}>Seleccione Cuenta Bancaria</Text>
         </View>
         <SelectTarjeta/>
          <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese Monto a Invertir ($)</Text>
         </View>
          <InputCBUDestino/>
          <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese Título</Text>
         </View>
         <InputCBUDestino/>
         <View style={{marginTop:20}}>
          <Text style={styles.infoRecipe}>Ingrese Rendimiento (%)</Text>
         </View>
         <InputCBUDestino/>
        

          <View style={styles.infoContainer}>
            <BotonNuevaCuenta
            
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
