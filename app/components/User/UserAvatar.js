import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'

import ImagePicker from 'react-native-image-picker'
import GLOBALS from '../../../assets/utils/Global'

import { connect } from 'react-redux'
import firebase from 'react-native-firebase'


import Icon from 'react-native-vector-icons/FontAwesome';



 class UserAvatar extends React.Component {

    constructor(props){
        super(props)
        this.ref = firebase.storage().ref('/useravatars/'+this.props.user.uid)
        this.state ={
            pickedImage: { uri: null}
        }
    }
    componentDidMount() {
        
        this.getImage()
    }

    getImage = () => {
        this.ref.getDownloadURL()
        .then( url => {
            console.log(url)
            this.setState({pickedImage: {uri: url}})
        })
        .catch( err => {
            console.log(err)
        })
    }
    


    pickImage = () => {
        if(this.state.pickedImage.uri) {
            this.ref.delete()
            .then( deleted => {
                console.log(deleted)
            })
            .catch( err => {
                console.log(err)
            })
        }
        ImagePicker.showImagePicker({}, res => {
            if(!res.error) {
                this.ref
                .putFile(`${res.path}`)
                .then( img => {
                    console.log('Success !' + img)
                    this.getImage()
                })
                .catch( err => {
                    console.log("SOMETHING WRONG! " + err)
                })
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
