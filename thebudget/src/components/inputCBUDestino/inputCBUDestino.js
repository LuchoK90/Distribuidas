import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const inputCBUDestino = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <TextInput
      style={{ height: 40, borderColor: 'lightblue', borderWidth: 1, width: 200, margin: 20 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}

export default inputCBUDestino;