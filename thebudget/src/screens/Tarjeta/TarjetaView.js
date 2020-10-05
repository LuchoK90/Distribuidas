import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Button, Alert } from 'react-native';
import styles from './styles';
import { tarjetas } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import BotonAgregarCuenta from '../../components/botonAgregarCuenta/botonAgregarCuenta';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const TarjetaView = ({navigation}) => {
  

  const [variable, setVariable] = useState([]);

  const handleDetail = (item) => {
  

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

  const getCurrentDate = () => {
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    
    return date + "/" + month + "/" + year;
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
    
    db.transaction((tx) => {
      tx.executeSql("select medios.banco banco, medios.numero numero, medios.entidad entidad, (medios.saldo + Sum(case movimientos.tipo_mov when 'Ingreso' then movimientos.monto when 'Egreso' then movimientos.monto else 0 end)) saldo from medios inner join usuarios on medios.user = usuarios.id_usuario left join movimientos on medios.numero = movimientos.medio and medios.user = movimientos.user where usuarios.logueado = 1 and medios.esTarjetaCredito=1 and (movimientos.anio is null or movimientos.fecha <= '" + getCurrentDate() + "') group by medios.banco, medios.numero, medios.entidad", [], (_, { rows }) => {
        setVariable(rows._array);
       
      });
    });
  };

  const renderRecipes = (item) => (

      <View style={styles.container}>
        <Text style={styles.title}>{item.entidad}</Text>
        <Text style={styles.elemento}>BANCO: {item.banco}</Text>
        <Text style={styles.elemento}>NÚMERO DE TARJETA: {item.numero}</Text>
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
