import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class ViewIngredientsButton extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor='lightblue' onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>Realizar Transferencia</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
