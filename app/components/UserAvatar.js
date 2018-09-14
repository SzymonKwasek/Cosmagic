import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import ImagePicker from 'react-native-image-picker'
import GLOBALS from '../../assets/utils/Global'
import { Base64 } from 'js-base64'
import { connect } from 'react-redux'
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome';



 class UserAvatar extends React.Component {

    constructor(props){
        super(props)
        this.state ={ 
            pickedImage: { uri: null}
        }
    }
    componentDidMount() {
        if(this.props.user.image) {
            this.setState({pickedImage: {uri: this.props.user.image}})
        }
    }
    pickImage = () => {
        // async waterfall ??
        let data = {}
        ImagePicker.showImagePicker({} , response => {
            const image = 'data:image/png;base64,'+response.data
            data = { 
                image: image,
                uuid: this.props.user.uuid
            }
            const res = axios.put('http://10.0.2.2:8080/public/user', data)
            console.log(res)
            if(res) {
                this.setState({pickedImage: {uri: image} })
            } else {
                console.log("NOPE")
            }
           
        })

        
    }

    render() {
        return (    

           <TouchableOpacity style={styles.userPhoto} onPress={this.pickImage} >
                <Image source={this.state.pickedImage} style={{width: '100%', height: '100%', borderRadius: 50}}/>
           </TouchableOpacity>

        );
    }

}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserAvatar)



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
