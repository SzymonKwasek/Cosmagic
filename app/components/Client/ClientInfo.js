import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'

import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome';

import { ClientAvatar }   from '../'
import GLOBALS from '../../../assets/utils/Global'

class ClientInfo extends React.Component {


    constructor(props) {
        super(props)
    }
    
    calendarPress = () => {
        ToastAndroid.showWithGravity(`Last application was on: ${this.props.data.lastApplication} \n Next application on: ${this.props.data.nextApplication}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
        )
    }

    checkIfFirst = (n) =>{
        return n === 0;
    }

    render() {
        return (
                <View  style={[styles.clientTab, {marginTop: this.checkIfFirst(this.props.index) ? 5 : 25}]}>

                    <ClientAvatar />

                    <TouchableOpacity style={styles.basicInfo} onPress={this.props.onPress}>

                        <View>
                            <Text style={styles.infoText}>
                                {this.props.data.name}
                            </Text>
                            <Text style={styles.infoTextDate}>
                                {this.props.data.nextApplication}
                            </Text>
                        </View>
                        
                        <TouchableOpacity onPress={this.calendarPress}>
                            <Icon name='calendar' size={25} color='#f7b736' ></Icon>                    
                        </TouchableOpacity>

                    </TouchableOpacity>
                </View>
        );
    }

}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}



export default connect(mapStateToProps)(ClientInfo)

const styles = StyleSheet.create({
    clientTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    basicInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .3)',
        borderRadius: 40,
        height: 70,
        marginLeft: 15,
        padding: 15,
        paddingHorizontal: 40,
        borderColor: GLOBALS.COLOR.PRIMARY,
        borderBottomWidth: 1
    },
    infoText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: GLOBALS.COLOR.TEXT
    },
    infoTextDate: {
        fontSize: 17,
        color: GLOBALS.COLOR.TEXT
    }
});
