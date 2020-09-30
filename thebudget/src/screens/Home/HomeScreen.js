import React from 'react';
import {ScrollView, Text} from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import {Table, Row, Rows} from 'react-native-table-component';
import {BarChart, Grid} from 'react-native-svg-charts';
import {PieChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryPie} from "victory-native";

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
                name: "TC",
                population: 1000,
                color: "#523563",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "TD",
                population: 1000,
                color: "#a3bf0a",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Débito A.",
                population: 500,
                color: "#d14e57",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Transf.",
                population: 750,
                color: "#ecb3ff",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "MP",
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

        const HeadTable = ['Banco', 'N° Cuenta', 'Saldo'];
        const DataTable = [
            ['Santander', '10', '$50.000,00'],
            ['Frances', '20', '$200,00'],
            ['ICBC', '30', '$200,00']
        ]

        const HeadTable_2 = ['Tipo', 'Detalle', 'Fecha', 'Monto'];
        const DataTable_2 = [
            ['Egresos', 'Gas', '20-09', '$5.000,00'],
            ['Inversion', 'Plazo Fijo', '21-09', '$1.000,00'],
            ['Prestamos', 'Cuota 2', '22-09', '$2.000,00'],
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


        const data_prueba = {
            planned: [
                {x: 'Ingresos', y: 6000},
                {x: 'Egresos', y: 4000},
                {x: 'Inversiones', y: 1000},
                {x: 'Prest. Sol.', y: 2000},
                {x: 'Prest. Ot.', y: 2000},
            ],        
            actual: [
                {x: 'Ingresos', y: 5000},
                {x: 'Egresos', y: 8000},
                {x: 'Inversiones', y: 1000},
                {x: 'Prest. Sol.', y: 1000},
                {x: 'Prest. Ot.', y: 1000},
            ],
        };

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
                    backgroundColor="transparent"
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

                <VictoryChart>
                 
                    <VictoryGroup offset={20}>
                        <VictoryBar 
                            data ={data_prueba.actual} 
                                style={{
                                    data: {
                                        fill: 'lightblue',
                                    },
                                }}
                        />
                        <VictoryBar 
                            data ={data_prueba.planned} 
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

        );
    }
}
