import React from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'


class ClientTab extends React.Component {


    constructor(props) {
        super(props)
    }


render() {
    return (
            <TouchableOpacity
                style={styles.clientTab}
                onPress={this.props.onPress}>
                <View style={styles.photo}>

                </View>
                <View style={styles.basicInfo}>
                    <Text style={styles.infoText}>
                        {this.props.data.name}
                    </Text>
                    <Text style={styles.infoText}>
                        {this.props.data.lashType}
                    </Text>
                </View>
            </TouchableOpacity>
    );
}

}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}



export default connect(mapStateToProps)(ClientTab)

const styles = StyleSheet.create({
    clientTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    photo: {
        backgroundColor: '#e8e5b7',
        borderRadius: 2,
        borderWidth: .5,
        borderColor:'#b2947b',
        height: 80,
        width: 80
    },
    basicInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 'bold'
    }
});
