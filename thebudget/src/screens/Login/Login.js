import React, {useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Button } from 'react-native-paper';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("BASEBASEBASE_2");


//export default class CategoriesScreen extends React.Component {
const Login = ({navigation}) =>{
    
    const[password, setPass] = useState("");
    const[email, setEmail] = useState("");
    const[usuarios, setUsuarios] = useState("0");
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
    /* const handleSelect = async () => {
        await if()
       
        
    };
    useEffect(() => {
        handleSelect();
    }, []); */
    
        const add=(email,password) => {
            
            /* db.transaction((tx) => {
            tx.executeSql(
                "insert into usuarios ( mail , pass , logueado) values (?,?,1)",
                [email,password]
            ),
            (_, { rows }) => console.log(JSON.stringify(rows)),
            (_, { error }) => console.log(JSON.stringify(error));
            }); */
        };

        const loguearse=(email,password) => {
            
           /*  db.transaction((tx) => {
            tx.executeSql(
                "insert into usuarios ( mail , pass , logueado) values (?,?,1)",
                [email,password]
            ),
            (_, { rows }) => console.log(JSON.stringify(rows)),
            (_, { error }) => console.log(JSON.stringify(error));
            }); */
        };
    
      const select = async () => {
        await db.transaction((tx) => {
          tx.executeSql("select * from usuarios", [], (_, { rows }) => {
            //setVariable(rows._array);
            console.log(rows._array);
          });
        });
      };
    
      const registrarse = () =>{
        add(email,password);
        select();
        navigation.navigate("Home");
      };

      const ingresar = () =>{
        loguearse(email,password);
        navigation.navigate("Home");
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
                    <Button onPress={() => ingresar()}><Text style={{color:'white'}}>LOGIN</Text></Button>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                
                    <Button onPress={() => registrarse()}><Text style={{color:'white'}}>REGISTRARSE</Text></Button>
                </TouchableOpacity>

                
            </View>

        );
    
}
export default Login;