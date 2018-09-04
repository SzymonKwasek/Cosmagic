import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import  InfoTabEdit  from '../components/InfoTabEdit'
import FancyButton from '../components/FancyButton'
import axios from 'axios'

import bgImage from '../../assets/images/meduza.jpeg'

class EditClient extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        const data = this.props.navigation.state.params
        this.state = {
            applicationDate: data.applicationDate,
            lashName: data.lashName,
            lashType: data.lashType,
            lashThickness: data.lashThickness,
            userUUID: this.props.user.uuid
        }
    }

    edit = async () => {
        const response = await axios.put('http://10.0.2.2:8080/public/client',
            this.state)
        if(response.data.response) {
            alert('Client edited successfully !')
            console.log(response)
            console.log(this.state)
            this.props.navigation.push('Main')
        } else {
            alert('Something went wrong !')
        }
    }



render() {
    const data = this.props.navigation.state.params
    return (
        <ImageBackground style={styles.image} source={bgImage}>

                <View style={styles.header}>
                    <Text style={styles.headerText}> {data.name} </Text>
                </View>
                <ScrollView style={{alignSelf: 'stretch'}}>
                    <InfoTabEdit toDisplay={data.applicationDate} tabName='Data aplikacji: ' onChange={ (applicationDate) => this.setState({applicationDate}) } />
                    <InfoTabEdit toDisplay={data.lashName} tabName='Nazwa rzęs: ' onChange={ (lashName) => this.setState({lashName}) } />
                    <InfoTabEdit toDisplay={data.lashType} tabName='Skręt:  ' onChange={ (lashType) => this.setState({lashType}) } />
                    <InfoTabEdit toDisplay={data.lashThickness} tabName='Grubość: ' onChange={ (lashThickness) => this.setState({lashThickness}) } />
                </ScrollView>
                <FancyButton action={this.edit} btnText='Apply' />

        </ImageBackground>
    );
}

}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}



export default connect(mapStateToProps)(EditClient)

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
