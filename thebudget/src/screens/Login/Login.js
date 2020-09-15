import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';

export default class CategoriesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        headerLeft: () => <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    });

    constructor(props) {
        super(props);
    }

    state = {
        email: "",
        password: ""
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.logo}>My budget App</Text>

                <Image style={styles.infoPhoto} source={require('../../../assets/images/dolar.jpg')} />

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
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

            </View>

        );
    }
}
