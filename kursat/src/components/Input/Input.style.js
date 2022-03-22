import { StyleSheet } from 'react-native';
import colors from '../../assets/styles/colors';

export default StyleSheet.create({
    container: {
        margin: 10,
    },
    inner_container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.beyaz,
        borderBottomWidth: 1,
        paddingHorizontal: 10
    },
    text: {
        flex: 1,
        padding: 3,
        color: colors.beyaz,
        fontWeight: '500',
        textDecorationColor: colors.beyaz,
    },
    error: {
        color: '#FF214E',
        width: '100%',
        fontWeight: '300',
        marginLeft: 10,
    },
    icon: {
        color: colors.beyaz,
    }

});
