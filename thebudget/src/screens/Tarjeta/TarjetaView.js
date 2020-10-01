import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Button, Alert } from 'react-native';
import styles from './styles';
import { tarjetas } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonAgregarCuenta from '../../components/botonAgregarCuenta/botonAgregarCuenta';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("budgetgo.db");

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
     `Detalle tarjeta ${item.numero}`,
     `Monto gastado(Mes en Curso): ${-1*item.saldo}\nEntidad Bancaria: ${item.entidad}`
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
        console.log(rows._array)
      });
    });
  };

  const renderRecipes = (item) => (

      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.elemento}>{item.banco}</Text>
        <Text style={styles.elemento}>{item.entidad}</Text>
        <Text style={styles.elemento}>{item.numero}</Text>
        <Text style={styles.elemento}>ACUMULADO: $ {-1*item.saldo}</Text>
       
           

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
