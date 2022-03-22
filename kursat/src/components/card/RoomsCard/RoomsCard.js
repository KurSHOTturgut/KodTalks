import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

//styles 
import styles from './RoomsCard.style';

const RoomsCard = ({ name, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

export default RoomsCard;
