import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Button } from 'react-native-paper';

export default class CategoriesScreen extends React.Component {
   /*  static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        headerLeft: () => <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    }); */

    constructor(props) {
        super(props);
    }

    state = {
        email: "",
        password: ""
    }

    render() {
        const { navigation } = this.props;
        return (

            <View style={styles.container}>
                <Text style={styles.logo}>Budget GO</Text>

                <Image style={styles.infoPhoto} source={require('../../../assets/images/login.jpeg')} />

                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>

                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Contraseña..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
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
}
