import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../assets/styles/colors';

export default StyleSheet.create({
    container: {
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: colors.lightBg1,

        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    inner_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    user: {
        color: colors.beyaz,
        fontSize: 11,
    },
    date: {
        color: colors.beyaz,
        fontSize: 11,
    },
    title: {
        color: colors.beyaz,
        fontWeight: '700',
        marginTop: 5
    },
 
})