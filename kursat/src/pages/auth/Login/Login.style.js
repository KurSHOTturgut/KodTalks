import { StyleSheet, Dimensions, } from 'react-native';
import colors from '../../../assets/styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1
    },
    header_container: {
        height: deviceSize.height / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: colors.beyaz,
        fontSize: 40,
        fontWeight: '100',
        margin: 5,
    },
});