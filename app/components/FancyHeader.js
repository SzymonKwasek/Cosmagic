import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GLOBALS from '../../assets/utils/Global'

export default class FancyHeader extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}> {this.props.headerText} </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderColor: GLOBALS.COLOR.PRIMARY,
        marginBottom: 30
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
