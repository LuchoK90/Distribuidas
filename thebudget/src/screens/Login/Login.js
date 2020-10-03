import React, {useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert,AsyncStorage } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Button } from 'react-native-paper';
import * as SQLite from "expo-sqlite";
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const idUsuarioLogueado = '@my-app:value';


//export default class CategoriesScreen extends React.Component {
const Login = ({navigation}) =>{
    
    const[password, setPass] = useState(' ');
    const[email, setEmail] = useState(' ');
    const[usuarios, setUsuarios] = useState([ ]);
    const[encontroUsuario, setEncontroUsuario] = useState(false);
   /*  static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        headerLeft: () => <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    }); */

    /* constructor(props) {
        super(props);
        db.transaction((tx) => { 
            tx.executeSql("select * from usuarios", [], (_, { rows }) => {
              console.log(rows._array);
              //setInversiones(rows._array);
            });
        });
    } */

    /* state = {
        email: "",
        password: ""
    } */
    

    useEffect(() => {
            
           
            handleSelect();
            
        
        
        
    }, []);


    const handleSelect = async () => {
       
        await select();
        
        
    };
    
    
       
    
      const select =   () => {
          console.log("db")
          db.transaction((tx) => { 
        //tx.executeSql("select * from usuarios where mail = '" + email + "'", [], (_, { rows }) => {
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
    

      const ingresar = () =>{
        desloguear();
        for(let i=0;i<usuarios.length;i++){
              if(usuarios[i].mail===email&&usuarios[i].pass===password){
                logear(usuarios[i].id_usuario);
                navigation.navigate("Home");
                return;
              }else{
                setEncontroUsuario(false);
              }
              
        };
        //console.log(encontroUsuario);
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
        
            
        
       
        /* console.log("aca"+encontroUsuario)
        if(encontroUsuario){
            console.log("encontro usuario");
            
            navigation.navigate("Home");
        }else{
            console.log("no encontro usuario")
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
               //setEncontroUsuario(1);
        } */
        //loguearse(email,password);
        //navigation.navigate("Home");
      };

      const logear = async (id) =>{
        await db.transaction((tx) => { 
          //tx.executeSql("select * from usuarios where mail = '" + email + "'", [], (_, { rows }) => {
                  tx.executeSql("update usuarios set logueado = 1 where id_usuario = '"+id+"'", [], (_, { rows }) => {
                
               
                console.log("logueado");
              });
            })
      };
      const desloguear = async () =>{
        await db.transaction((tx) => { 
          //tx.executeSql("select * from usuarios where mail = '" + email + "'", [], (_, { rows }) => {
                  tx.executeSql("update usuarios set logueado = 0;", [], (_, { rows }) => {
                
               
                console.log("deslogueado");
              });
            })
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