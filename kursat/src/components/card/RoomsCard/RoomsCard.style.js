import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: deviceSize.height / 4,
        borderWidth: 1,
        borderColor: colors.bg1,
        borderRadius:10,
        width: deviceSize.width/2-25,
    },
    text: {
        color: colors.bg1,
        fontSize: 18,
        fontWeight: '700',
    },
});
