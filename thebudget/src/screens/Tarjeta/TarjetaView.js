import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Button, Alert } from 'react-native';
import styles from './styles';
import { tarjetas } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonAgregarCuenta from '../../components/botonAgregarCuenta/botonAgregarCuenta';

const TarjetaView = ({navigation}) => {
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'Tarjetas',
  //   headerLeft: () => <MenuImage
  //     onPress={() => {
  //       navigation.openDrawer();
  //     }}
  //   />
  // });

  const [variable, setVariable] = useState([]);

  const handleDetail = (item) => {
    // const resp = await getPaymentTotalAmountService("TRC", item.number); // llamar select para traer info del detalle
    // console.log("item",item)

    Alert.alert(
     `Detalle tarjeta ${item.tarjeta}`,
     `Monto gastado(Mes en Curso): ${item.saldo}\nEntidad Bancaria: ${item.title}`
       ,
       [
         {
           text: "Confirmar",
         },
       ]
    );
  };

  const onPressTransferencia = item => {
    navigation.navigate('GastosAcumulados', { item });
  };

  const onPressNuevaTarjeta = item => {
    navigation.navigate('Tarjeta');
  };

  useEffect(() => {
    
    handleSelect();
  }, []);
  const handleSelect = async () => {
    
    await select();
  };
 

  const select = () => {
    console.log("entro al select");
    db.transaction((tx) => {
      tx.executeSql("select * from medios where esTarjetaCredito = 1", [], (_, { rows }) => {
        setVariable(rows._array);
      });
    });
  };

  const renderRecipes = (item) => (

      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.elemento}>VISA</Text>
        <Text style={styles.elemento}>LIMITE: 3000</Text>
        <Text style={styles.elemento}>TARJETA: {item.tarjeta}</Text>
        <Text style={styles.elemento}>ACUMULADO: $ {item.saldo}</Text>
       
           

        <Button 
        title="Detalle"
        onPress={() => 
          handleDetail(item)}
        />
            
       
      </View>
     
   
  );

    return (
      <View style={{flex:1}}>
      <Button 
        title="Agregar"
        onPress={() => {
          onPressNuevaTarjeta();
        }}/>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={variable}
          renderItem={({ item }) => renderRecipes(item)}
          keyExtractor={item => `${item.recipeId}`}
        />
        
      </View>
    );
}

export default TarjetaView;
