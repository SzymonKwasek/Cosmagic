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
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    photo: {
        backgroundColor: '#e8e5b7',
        borderRadius: 50,
        borderWidth: .5,
        borderColor:'#b2947b',
        height: 80,
        width: 80
    },
    basicInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .1)',
        borderRadius: 20,
        height: 70,
        marginLeft: 15,
        padding: 15
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
});
