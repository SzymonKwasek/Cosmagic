import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import  InfoTab  from '../components/InfoTab'
import FancyButton from '../components/FancyButton'

import bgImage from '../../assets/images/meduza.jpeg'

class Main extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
    }



render() {
    const data = this.props.navigation.state.params
    return (
        <ImageBackground style={styles.image} source={bgImage}>

                <View style={styles.header}>
                    <Text style={styles.headerText}> {data.name} </Text>
                </View>
                <ScrollView style={{alignSelf: 'stretch'}}>
                    <InfoTab toDisplay={data.applicationDate} tabName='Data aplikacji: '/>
                    <InfoTab toDisplay={data.lashName} tabName='Nazwa rzęs: '/>
                    <InfoTab toDisplay={data.lashType} tabName='Skręt:  '/>
                    <InfoTab toDisplay={data.lashThickness} tabName='Grubość: '/>
                </ScrollView>
                <FancyButton action={() => this.props.navigation.navigate('EditClient', data)} btnText='Edit' />

        </ImageBackground>
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
    header: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#9e79c6'
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center'
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: null,
        height: null,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20
    },
});