import React, {useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Button } from 'react-native-paper';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("budgetgo.db");


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
    const handleSelect = async () => {
        await select();
       
        
    };
    useEffect(() => {
        handleSelect();
    }, []);
    
    const select = () => {
        db.transaction((tx) => { 
            tx.executeSql("select * from usuarios where logueado=1", [], (_, { rows }) => {
              //setUsuarios(rows._array);
              console.log("usuario"+usuarios);
              //setInversiones(rows._array);
            });
        });
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
                        onChangeText={(email) => setEmail({ email })} />
                </View>

                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Contraseña..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(password) => setPass({ password })}/>
                </View>

                <TouchableOpacity style={styles.loginBtn}>
                    <Button onPress={() => navigation.navigate('Dashboard')}><Text style={{color:'white'}}>LOGIN</Text></Button>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                
                    <Button onPress={() => navigation.navigate('Dashboard')}><Text style={{color:'white'}}>REGISTRARSE</Text></Button>
                </TouchableOpacity>

                
            </View>

        );
    
}
export default Login;