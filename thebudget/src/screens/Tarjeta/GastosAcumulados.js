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
import styles from './gastyles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import BotonRealizarTransferencia from '../../components/botonRealizarTransferencia/botonRealizarTransferencia';
import InputCBUDestino from '../../components/inputCBUDestino/inputCBUDestino';
import { DataTable } from 'react-native-paper';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
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
      <View style={gastyles.imageContainer}>
        <Image style={gastyles.image} source={{ uri: item }} />
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
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
          </View>

      

        

          <View style={styles.infoContainer}>
           
            <Text style={styles.infoRecipe}>ACUMULADO: $ {item.saldo}</Text>
          </View>

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

        </DataTable>

         
        </View>
      </ScrollView>
    );
  }
}


