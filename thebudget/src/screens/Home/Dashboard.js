import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  ScrollView,
  AppRegistry,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import hola from "./styles";
import { Container, H1 } from "native-base";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dropdown } from "react-native-material-dropdown";
import { DataTable } from "react-native-paper";
import {PieChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryPie} from "victory-native";
import {Table, Row, Rows} from 'react-native-table-component';
import {RecipeCard} from '../../AppStyles';
import * as SQLite from "expo-sqlite";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
const screenWidth = Dimensions.get("window").width;
const db = SQLite.openDatabase("BASEBASEBASE_2.db");


const Dashboard_Posta = ({ navigation }) => {
  const [text, setText] = useState("");
  const [variable1, setVariable1] = useState([]);
  const [variable2, setVariable2] = useState([]);
  const [variable3, setVariable3] = useState([]);
  const [variable4, setVariable4] = useState([]);
  const [variable5, setVariable5] = useState([]);

  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;



  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const HeadTable = ['Banco', 'N° Cuenta', 'Saldo'];


const HeadTable_2 = ['Detalle', 'Fecha', 'Monto'];
  // const navigationOptions = () => {
  //   return {
  //     headerTransparent: 'true',
  //     title: 'Ingresos',
  //     headerLeft: () => <BackButton
  //       onPress={() => {
  //         navigation.goBack();
  //       }}
  //     />
  //   };
  // };

  // const  navigationOptions = () => {
  //   title: 'Ingresos'
  // };
  const handleSelect = async () => {
    await select();
  };
  useEffect(() => {
    handleSelect();
  }, []);
  
  const getDate = () => {   
    var day = new Date().getDate();  

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return day;
  };

  const getMonth = () => {   
    var month = new Date().getMonth() + 1;  

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return month;
  };

  const getFullYear = () => {   
    var year = new Date().getFullYear();  

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return year;
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return date + "/" + month + "/" + year;
  };




  const getWeek = () =>  {
    var dd = new Date();
    var d = new Date(Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
};

  const select = () => {
    db.transaction((tx) => {
        tx.executeSql("select medio as name, sum(monto) population, case medio when 'Efectivo' then '#ea4b8f' when 'Mercadopago' then '#523563' when 'Transferencia' then '#a3bf0a' when 'Acción' then '#d14e57' when 'Plazo Fijo' then '#ecb3ff' when 'Titulo' then '#c78164' else '#24a4b1' end color from movimientos inner join usuarios on movimientos.user = usuarios.id_usuario where usuarios.logueado = 1 and tipo_mov='Egreso' and mes = '" + getMonth() + "' and anio = '" + getFullYear() + "' and medio is not null group by medio", [], (_, { rows }) => {
            setVariable1(rows._array);
            console.log(variable1);
            //console.log(getMonth());
          });
      tx.executeSql("select medios.banco banco, medios.numero numero, (medios.saldo + Sum(case movimientos.tipo_mov when 'Ingreso' then movimientos.monto when 'Egreso' then (-1)*movimientos.monto else 0 end)) saldo from medios inner join usuarios on medios.user = usuarios.id_usuario left join movimientos on medios.numero = movimientos.medio and medios.user = movimientos.user where usuarios.logueado=1 and medios.esCuentaBancaria=1 and (movimientos.anio is null or movimientos.fecha <= '" + getCurrentDate() + "') group by medios.banco, medios.numero", [], (_, { rows }) => {
        let array = rows._array.map(obj => Object.values(obj));
        setVariable2(array);
        //console.log(getDate());
      });
      tx.executeSql("select distinct tipo_mov x, sum(monto) y from movimientos inner join usuarios on movimientos.user = usuarios.id_usuario where usuarios.logueado = 1 and mes = '" + getMonth() + "' and anio = '" + getFullYear() + "' group by tipo_mov union select 'Inversion' x, sum(monto*rendimiento) y from inversiones inner join usuarios on inversiones.user = usuarios.id_usuario where usuarios.logueado = 1 and mes = '" + getMonth() + "' and anio = '" + getFullYear() + "' union select 'Prestamo' x, sum(monto/cuotas) y from prestamos inner join usuarios on prestamos.user = usuarios.id_usuario where usuarios.logueado = 1 and mes = '" + getMonth() + "' and anio = '" + getFullYear() + "' and tipo = 'Solicitado'", [], (_, { rows }) => {
        setVariable5(rows._array);
        console.log(variable5);
      });   
      tx.executeSql("select distinct rubro x, sum(monto) y from presupuestos inner join usuarios on presupuestos.user = usuarios.id_usuario where usuarios.logueado = 1 and mes = '" + getMonth() + "' and anio = '" + getFullYear() + "' group by rubro", [], (_, { rows }) => {
        setVariable4(rows._array);
        console.log(variable4);
      });  
      tx.executeSql("select 'Tarjeta', medios.vencimiento_resumen vencimiento, (medios.saldo + Sum(case movimientos.tipo_mov when 'Ingreso' then movimientos.monto when 'Egreso' then movimientos.monto else 0 end)) saldo from medios inner join usuarios on medios.user = usuarios.id_usuario left join movimientos on medios.numero = movimientos.medio and medios.user=movimientos.user where usuarios.logueado = 1 and medios.esTarjetaCredito=1 and (movimientos.anio is null or movimientos.fecha <= '" + getCurrentDate() + "') and medios.vencimientoResumenAnio = '"+ getFullYear()+"' and medios.vencimientoResumenSem = '"+ getWeek()+"' group by medios.vencimiento_resumen union select 'Plazo Fijo', vencimiento, sum(monto*rendimiento) from inversiones inner join usuarios on inversiones.user = usuarios.id_usuario where usuarios.logueado = 1 and tipo = 'Plazo Fijo' and anio = '"+ getFullYear()+"' and sem= '"+ getWeek()+"' group by vencimiento   union select 'Prestamo', vencimiento, sum(monto/cuotas) from prestamos inner join usuarios on prestamos.user = usuarios.id_usuario where usuarios.logueado = 1 and tipo = 'Solicitado' and anio = '"+ getFullYear()+"' and sem= '"+ getWeek()+"' group by vencimiento", [], (_, { rows }) => {
        let array = rows._array.map(obj => Object.values(obj));
        setVariable3(array);
        //console.log(getDate());
      });
    });
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

  return (
    <Container style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 5 }}>
      <ScrollView>
            
            <Text style={styles.mesNombre}>{monthNames[getMonth()-1] + ' - ' + getFullYear()}</Text>

            <Text style={styles.graficosNombre}>{'Gastos por Medio de Pago'}</Text>
            <PieChart
                data={variable1}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <Text style={styles.graficosNombre}>{'Saldos Cuentas Bancarias'}</Text>                
                <Table borderStyle={{ borderWidth: 3, borderColor: '#270570' }}>
                    <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                    <Rows data={variable2} textStyle={styles.TableText} />
                </Table>

               <Text style={styles.graficosNombre}>{'Vencimientos'}</Text>
               <Table borderStyle={{ borderWidth: 1, borderColor: '#270570' }}>
                    <Row data={HeadTable_2} style={styles.HeadStyle} textStyle={styles.TableText} />
                    <Rows data={variable3} textStyle={styles.TableText} />
                </Table>

                <Text style={styles.graficosNombre}>{'Desvíos'}</Text>
                <VictoryChart>
                 
                 <VictoryGroup offset={20}>
                     <VictoryBar 
                         data ={variable5} 
                             style={{
                                 data: {
                                     fill: 'lightblue',
                                 },
                             }}
                     />
                     <VictoryBar 
                         data ={variable4} 
                         style={{
                             data: {
                                 fill: '#270570',
                             },
                         }}
                     />
                 </VictoryGroup>
                 <VictoryLegend 
                     x={Dimensions.get('screen').width / 2 - 100}
                     orientation = "horizontal"
                     gutter={20}
                     data={[
                         {
                             name: 'Real',
                             symbol:{
                                 fill: 'lightblue',
                             },
                         },
                         {
                             name: 'Presupuestado',
                             symbol:{
                                 fill: '#270570',
                             },
                         },
                     ]}   
                 />
             </VictoryChart>   
        
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

Dashboard_Posta["navigationOptions"] = (screenProps) => ({
  title: "Dashboard",
});
// HomeScreen2.navigationOptions = (screenProps) => ({
// headerTransparent: 'true',
// title: 'Ingresos',
// headerLeft: () => <BackButton
//   onPress={() => {
//     navigation.goBack();
//   }}
// />
// });

const styles = StyleSheet.create({
  viewContainer: {
    width: "90%",
    marginLeft: 20,
    marginTop: 20,
  },
  titulo: {
    fontSize: 30,
    backgroundColor: "gray",
    paddingLeft: 10,
    marginLeft: 50,
  },
  monto: {
    paddingLeft: 20,
    margin: 10,
  },
  boton: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 10,
  },
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
  }
});

export default Dashboard_Posta;
