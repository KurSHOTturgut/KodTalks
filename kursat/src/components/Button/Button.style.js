import { StyleSheet } from 'react-native';
import colors from '../../assets/styles/colors';

const base_style = StyleSheet.create({
    container: {
        padding: 8,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth:1,
    },
    title: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 17,
    },
    loading: {
        color: '#fff',
    }
});

export default {
    primary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: '#ffffff77',
            borderColor: colors.bg1,
        },
        title: {
            ...base_style.title,
            color: 'white'
        },
    }),

    secondary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: colors.beyaz,
            borderColor: colors.bg1,
        },
        title: {
            ...base_style.title,
            color: colors.bg1
        },
    }),
};
