import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { Table, Row, Rows } from "react-native-table-component";
import { BarChart, Grid } from "react-native-svg-charts";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLegend,
  VictoryPie,
} from "victory-native";
import { Button } from "react-native-paper";
import { Container } from "native-base";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [ingresos, setIngresos] = useState([]);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = [
    {
      name: "Contado",
      population: 500,
      color: "#ea4b8f",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "TC",
      population: 1000,
      color: "#523563",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "TD",
      population: 1000,
      color: "#a3bf0a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Débito A.",
      population: 500,
      color: "#d14e57",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Transf.",
      population: 750,
      color: "#ecb3ff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "MP",
      population: 500,
      color: "#c78164",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Otros",
      population: 500,
      color: "#24a4b1",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const HeadTable = ["Banco", "N° Cuenta", "Saldo"];
  const DataTable = [
    ["Santander", "10", "$50.000,00"],
    ["Frances", "20", "$200,00"],
    ["ICBC", "30", "$200,00"],
  ];

  const HeadTable_2 = ["Tipo", "Detalle", "Fecha", "Monto"];
  const DataTable_2 = [
    ["Egresos", "Gas", "20-09", "$5.000,00"],
    ["Inversion", "Plazo Fijo", "21-09", "$1.000,00"],
    ["Prestamos", "Cuota 2", "22-09", "$2.000,00"],
  ];

  const data1_ = [100, 50, 30, 100].map((value) => ({ value }));
  const data2_ = [150, 40, 30, 100].map((value) => ({ value }));

  const barData = [
    {
      data: data1_,
      svg: {
        fill: "rgb(134, 65, 244)",
      },
    },
    {
      data: data2_,
    },
  ];

  const data_prueba = {
    planned: [
      { x: "Ingresos", y: 6000 },
      { x: "Egresos", y: 4000 },
      { x: "Inversiones", y: 1000 },
      { x: "Prest. Sol.", y: 2000 },
      { x: "Prest. Ot.", y: 2000 },
    ],
    actual: [
      { x: "Ingresos", y: 5000 },
      { x: "Egresos", y: 8000 },
      { x: "Inversiones", y: 1000 },
      { x: "Prest. Sol.", y: 1000 },
      { x: "Prest. Ot.", y: 1000 },
    ],
  };


  useEffect(() => {
   
    
  }, [ingresos]);

  useEffect(() => {
    if (navigation.isFocused) {
      
      obtenerIngresosEnMemoria();
    }
    return () => {};
  }, [navigation]);

  const obtenerIngresosEnMemoria = async () => {
    await db.transaction((tx) => {
      tx.executeSql("select * from movimientos", [], (_, { rows }) => {
        setIngresos(rows._array);
        
      });
    });
  };



  const createExcel = async (ing) => {
    
    var wb = XLSX.utils.book_new();
    /*Ingresos */
    var wsIngresos = XLSX.utils.json_to_sheet(ing);
    XLSX.utils.book_append_sheet(wb, wsIngresos, "Ingresos");



    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });
    const uri = FileSystem.cacheDirectory + "budgetGo.xlsx";

    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Budget Go data",
      UTI: "com.microsoft.excel.xlsx",
    });
  };
  const handleDownload =   () => {

    createExcel(ingresos);
  };

  return (
    <Container style={{ flex: 1 }}>
      <View
        style={{
          marginHorizontal: 5,

          marginTop: 10,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={styles.logo}>Budget GO</Text>

        <Image
          style={{ width: "40%", height: "40%" }}
          source={require("../../../assets/images/login.jpeg")}
        />
        <Text style={styles.logo}>Bienvenido</Text>
        
       
      </View>
    </Container>
  );
};

HomeScreen["navigationOptions"] = (screenProps) => ({
  title: "Home",
  headerLeft: () => (
    <MenuImage
      onPress={() => {
        screenProps.navigation.openDrawer();
      }}
    />
  ),
});



export default HomeScreen;
