import React, {useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert,AsyncStorage } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Button } from 'react-native-paper';
import * as SQLite from "expo-sqlite";
import clienteAxios from "../../axios";
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const idUsuarioLogueado = '@my-app:value';


//export default class CategoriesScreen extends React.Component {
const Login = ({navigation}) =>{
    
    const[password, setPass] = useState(' ');
    const[email, setEmail] = useState(' ');
    const[usuarios, setUsuarios] = useState([ ]);
    const[encontroUsuario, setEncontroUsuario] = useState(false);

    useEffect(() => {     
      handleSelect();
    }, []);

    const handleSelect = async () => {
      await select();  
    };   
    
    const select =   () => {
      db.transaction((tx) => { 
        tx.executeSql("select * from usuarios", [], (_, { rows }) => {              
          setUsuarios(rows._array);
          console.log(rows._array);
        });
      });
    };
      
      const registro=()=>{
        db.transaction((tx) => {
            console.log("usuarios")
            tx.executeSql(
              "insert into usuarios(mail, pass, logueado ) VALUES(?,?,0)",
            [email,password]
            );
          });
          select();
          if(true){
            Alert.alert(
                `Se ha registrado correctamente, GO! `,
                `Muchas gracias`
                  ,
                  [
                    {
                      text: "Confirmar",
                    },
                  ]
               ); 
        }
      };
    

      const ingresar = async() =>{
        desloguear();
        for(let i=0;i<usuarios.length;i++){
              if(usuarios[i].mail===email&&usuarios[i].pass===password){
                logear(usuarios[i].id_usuario);
                await recuperar(usuarios[i].id_usuario);
                console.log("usuarios en el for ",usuarios[i].id_usuario);
                
                
                return;
              }else{
                setEncontroUsuario(false);
              }
              
        };
   
        if(!encontroUsuario){
            Alert.alert(
                `Usuario no encontrado `,
                `Por favor, regístrese`
                  ,
                  [
                    {
                      text: "Confirmar",
                    },
                  ]
               ); 
        }
      };

      const logear = async (id) =>{
        await db.transaction((tx) => { 
          //tx.executeSql("select * from usuarios where mail = '" + email + "'", [], (_, { rows }) => {
                  tx.executeSql("update usuarios set logueado = 1 where id_usuario = '"+id+"'", [], (_, { rows }) => {
                
               
                console.log("logueado");
              });
            })
      };
      const recuperar = async (id) =>{
        await obtenerMovimientosServidor(id);
        await obtenerPrestamosServidor(id);
        await obtenerUsuariosServidor(id);
        await obtenerPresupuestosServidor(id);
        await obtenerMediosServidor(id);
        await obtenerInversionesServidor(id);
        navigation.navigate("Home");
      };
      const desloguear = async () =>{
        await db.transaction((tx) => { 
          //tx.executeSql("select * from usuarios where mail = '" + email + "'", [], (_, { rows }) => {
                  tx.executeSql("update usuarios set logueado = 0;", [], (_, { rows }) => {
                
               
                console.log("deslogueado");
              });
            })
      };

      const obtenerMovimientosServidor = async (id) =>{
        const response = await clienteAxios.get('/movimientos/'+id);
          console.log("obtener del server",response.data.movimientos);
           for (const movimiento of response.data.movimientos) {
            db.transaction((tx) => {
              tx.executeSql(
                "insert into movimientos (fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem, user) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [movimiento.fecha, movimiento.detalle, movimiento.monto, movimiento.medio,movimiento.tipo_mov, movimiento.comprobante, movimiento.dia, movimiento.mes, movimiento.anio, movimiento.sem,movimiento.user]
              ),
                (_, { rows }) => console.log(JSON.stringify(rows)),
                (_, { error }) => console.log(JSON.stringify(error));
            });
          } 
      };
      const obtenerInversionesServidor = async (id) =>{
        const response = await clienteAxios.get(`/inversiones/`+id);
        for (const inversion of response.data.inversiones) {
          db.transaction((tx) => {
            tx.executeSql(
              "insert into inversiones (tipo, flag_deposito, monto, rendimiento, vencimiento, cuenta, dia, mes, anio, sem, user) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [inversion.tipo, inversion.flag_deposito, inversion.monto, inversion.rendimiento, inversion.vencimiento, inversion.cuenta, inversion.dia, inversion.mes, inversion.anio, inversion.sem, inversion.user]
            ),
              (_, { rows }) => console.log(JSON.stringify(rows)),
              (_, { error }) => console.log(JSON.stringify(error));
          });
        }
      };
      const obtenerPrestamosServidor = async (id) =>{
        const response = await clienteAxios.get(`/prestamos/`+id);
        for (const prestamo of response.data.prestamos) {
          db.transaction((tx) => {
            tx.executeSql(
              "insert into prestamos (tipo, monto, cuenta, cuotas, vencimiento, dia, mes, anio, sem, user) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [prestamo.tipo, prestamo.monto, prestamo.cuenta, prestamo.cuotas, prestamo.vencimiento, prestamo.dia, prestamo.mes, prestamo.anio, prestamo.sem, prestamo.user]
            ),
              (_, { rows }) => console.log(JSON.stringify(rows)),
              (_, { error }) => console.log(JSON.stringify(error));
          });
        }
      };
      const obtenerMediosServidor = async (id) =>{
        const response = await clienteAxios.get(`/medios/`+id);
        for (const medio of response.data.medios) {
          db.transaction((tx) => {
            tx.executeSql(
              "insert into medios (banco, numero, cbu, debito, saldo, entidad,vencimiento, cierre_resumen, vencimiento_resumen, esCuentaBancaria, esTarjetaCredito, esEfectivo, vencimientoResumenDia, vencimientoResumenMes, vencimientoResumenAnio, vencimientoResumenSem, user) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)",
              [medio.banco, medio.numero, medio.cbu, medio.debito, medio.saldo, medio.entidad,medio.vencimiento, medio.cierre_resumen, medio.vencimiento_resumen, medio.esCuentaBancaria, medio.esTarjetaCredito, medio.esEfectivo, medio.vencimientoResumenDia, medio.vencimientoResumenMes, medio.vencimientoResumenAnio, medio.vencimientoResumenSem, medio.user]
            ),
              (_, { rows }) => console.log(JSON.stringify(rows)),
              (_, { error }) => console.log(JSON.stringify(error));
          });
        }
      };
      const obtenerUsuariosServidor = async (id) =>{
        const response = await clienteAxios.get(`/usuarios/`+id);
        for (const usuario of response.data.usuarios) {
          db.transaction((tx) => {
            tx.executeSql(
              "insert into usuarios (mail, pass, logueado) values (?, ?, ?)",
              [usuario.mail, usuario.pass, usuario.logueado]
            ),
              (_, { rows }) => console.log(JSON.stringify(rows)),
              (_, { error }) => console.log(JSON.stringify(error));
          });
        }
      };
      const obtenerPresupuestosServidor = async (id) =>{
        const response = await clienteAxios.get(`/presupuestos/`+id);
        for (const presupuesto of response.data.presupuestos) {
          db.transaction((tx) => {
            tx.executeSql(
              "insert into presupuestos (mes, anio, rubro, categoria, monto, user) values (?, ?, ?, ?, ?, ?)",
              [presupuesto.mes, presupuesto.anio, presupuesto.rubro, presupuesto.categoria, presupuesto.monto, presupuesto.user]
            ),
              (_, { rows }) => console.log(JSON.stringify(rows)),
              (_, { error }) => console.log(JSON.stringify(error));
          });
        }
      };
   
    
    //if(usuarios.logueado)
        //const { navigation } = this.props;
        return (
            
            <View style={styles.container}>
                <Text style={styles.logo}>Budget GO</Text>

                <Image style={styles.infoPhoto} source={require('../../../assets/images/login.jpeg')} />

                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)} />
                </View>

                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Contraseña..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(password) => setPass(password)}/>
                </View>

                <TouchableOpacity style={styles.loginBtn}>
                    <Button onPress={ingresar}><Text style={{color:'white'}}>LOGIN</Text></Button>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                
                    <Button onPress={() => registro()}><Text style={{color:'white'}}>REGISTRARSE</Text></Button>
                </TouchableOpacity>

                

                
            </View>

        );
    
}
export default Login;