import React from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import ClientTab from './ClientTab'


class Main extends React.Component {

    static navigationOptions = {
        title: 'Client',
      };

    constructor(props) {
        super(props)
    }



  render() {
    return (
      <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}> Shadow Of Lashess </Text>
            </View>
            <View> 
                <Text>
                    {this.props.navigation.state.params.name}
                </Text>
            </View>

            <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('AddClient')}>
                        <Text> Edit </Text>
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



export default connect(mapStateToProps)(Main)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#ddcc85',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#d6bf5e'
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        padding: 26,
        fontWeight: 'bold'
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center'
        }
});
