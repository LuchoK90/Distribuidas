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
import BotonAgregarPlazoFijo from '../../components/botonAgregarPlazoFijo/botonAgregarPlazoFijo';
import BotonAgregarTitulo from '../../components/botonAgregarTitulo/botonAgregarTitulo';
import BotonAgregarAccion from '../../components/botonAgregarAccion/botonAgregarAccion';


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

  onPressNuevoPlazoFijo = item => {
    this.props.navigation.navigate('AgregarPlazoFijo');
  };

  onPressNuevoTitulo = item => {
    this.props.navigation.navigate('AgregarTitulo');
  };

  onPressNuevasAcciones = item => {
    this.props.navigation.navigate('AgregarAcciones');
  };




  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');


    return (
      <ScrollView style={styles.container}>
   
       
         
         
         
        
        

         
          <BotonAgregarPlazoFijo 
               onPress={() => {
                this.onPressNuevoPlazoFijo();
              }}
            /> 
           
            <BotonAgregarTitulo
               onPress={() => {
                this.onPressNuevoTitulo();
              }}
            />
        
            <BotonAgregarAccion
               onPress={() => {
                this.onPressNuevasAcciones();
              }}
            />
         
  
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
