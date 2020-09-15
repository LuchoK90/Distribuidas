import React from 'react';
import {ScrollView, Text} from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import {Table, Row, Rows} from 'react-native-table-component';
import {BarChart, Grid} from 'react-native-svg-charts';
import {PieChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
const screenWidth = Dimensions.get("window").width;

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Dashboard',
        headerLeft: () => <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    });

    constructor(props) {
        super(props);
    }

    render() {

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

        const data = [
            {
                name: "Contado",
                population: 500,
                color: "#ea4b8f",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Tarjeta de Credito",
                population: 1000,
                color: "#523563",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Tarjeta de Débito",
                population: 1000,
                color: "#a3bf0a",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Débito Automático",
                population: 500,
                color: "#d14e57",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Transferencia",
                population: 750,
                color: "#ecb3ff",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Mercado Pago",
                population: 500,
                color: "#c78164",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Otros",
                population: 500,
                color: "#24a4b1",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ];

        const HeadTable = ['Banco', 'N° Cuenta', 'Moneda', 'Saldo'];
        const DataTable = [
            ['Santander', '10', '$', '50.000,00'],
            ['Frances', '20', 'U$S', '200,00'],
            ['ICBC', '20', '€', '200,00']
        ]

        const HeadTable_2 = ['Tipo', 'Detalle', 'Fecha', 'Moneda', 'Monto'];
        const DataTable_2 = [
            ['Egresos', 'Gas', '20-09-2020', '$', '5.000,00'],
            ['Inversiones', 'Plazo Fijo', '21-09-2020', 'U$S', '1.000,00'],
            ['Prestamos', 'Cuota 2', '22-09-2020', '$', '2.000,00'],
        ]

        const data1_ = [100, 50, 30, 100]
            .map((value) => ({ value }))
        const data2_ = [150, 40, 30, 100]
            .map((value) => ({ value }))

        const barData = [
            {
                data: data1_,
                svg: {
                    fill: 'rgb(134, 65, 244)',
                },
            },
            {
                data: data2_,
            },
        ]


        return (

            <ScrollView>
            
                <Text style={styles.mesNombre}>{'Septiembre 2020'}</Text>

                <Text style={styles.graficosNombre}>{'Gastos por Medio de Pago'}</Text>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="#DDD5F5"
                    paddingLeft="15"
                    absolute
                />

                <Text style={styles.graficosNombre}>{'Saldos Cuentas Bancarias'}</Text>                
                <Table borderStyle={{ borderWidth: 1, borderColor: '#270570' }}>
                    <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                    <Rows data={DataTable} textStyle={styles.TableText} />
                </Table>

                <Text style={styles.graficosNombre}>{'Vencimientos'}</Text>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#270570' }}>
                    <Row data={HeadTable_2} style={styles.HeadStyle} textStyle={styles.TableText} />
                    <Rows data={DataTable_2} textStyle={styles.TableText} />
                </Table>

                <Text style={styles.graficosNombre}>{'Desvíos'}</Text>
                <BarChart style={{ height: 200 }}
                    data={barData}
                    yAccessor={({ item }) => item.value}
                    svg={{
                        fill: '#DDD5F5',
                    }}
                    contentInset={{ top: 30, bottom: 30 }}>
                    <Grid />
                </BarChart>

            </ScrollView>

        );
    }
}
