import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'
import GLOBALS from '../../assets/utils/Global'

import Icon from 'react-native-vector-icons/FontAwesome';


export default class HeaderButton extends React.Component {

    constructor(props){
        super(props)
        this.state ={ 
            pickedImage: { uri: null}
        }
    }
    pickImage = () => {
        ImagePicker.showImagePicker({} , response => {
            console.log(response)
            this.setState({pickedImage: {uri: response.uri}})
            console.log(this.state)
        })
    }

    render() {
        console.log(this.state)
        return (    

           <TouchableOpacity style={styles.userPhoto} onPress={this.pickImage} >
                <Image source={this.state.pickedImage} style={{width: '100%', height: '100%', borderRadius: 50}}/>
           </TouchableOpacity>

        );
    }

}



const styles = StyleSheet.create({
    userPhoto: {
        backgroundColor: '#fff',
        borderRadius: 80,
        borderWidth: 3.5,
        borderColor: GLOBALS.COLOR.PRIMARY,
        height: 100,
        width: 100,
        margin: 20,
        position: 'absolute',
        top: 5,
        left: 15,
        zIndex: 99,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userIcon: {

    }
});
