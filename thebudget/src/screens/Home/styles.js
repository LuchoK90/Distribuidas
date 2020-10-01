import {StyleSheet} from 'react-native';
import {RecipeCard} from '../../AppStyles';

const styles = StyleSheet.create({

    container: RecipeCard.container,

    photo: RecipeCard.photo,

    title: RecipeCard.title,

    category: RecipeCard.category,

    graficosNombre: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#270570'
    },

    mesNombre: {
        fontSize: 28,
        margin: 10,
        fontWeight: 'bold',
        color: '#270570',
        textAlign: 'center'
    },
    
    HeadStyle: {
        backgroundColor: 'lightblue'
    },
    infoPhoto: {
        height: '10%',
        width: '10%',
        marginTop:1,
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#0e84e6",
        textAlign: 'center'
      }
});

export default styles;
