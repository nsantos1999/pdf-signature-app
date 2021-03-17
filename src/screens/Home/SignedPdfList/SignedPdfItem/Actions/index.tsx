import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function SignedPdfItemActions() {
  return (
    <>
      <TouchableOpacity onPress={() => console.log('Click here')}>
        <Icon name="share-alt" color="#fff" size={18} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Click here')}>
        <Icon name="file-pdf" color="#fff" size={18} />
      </TouchableOpacity>
    </>
  );
}
