import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'

import ImagePicker from 'react-native-image-picker'
import GLOBALS from '../../assets/utils/Global'
import { Base64 } from 'js-base64'
import { connect } from 'react-redux'
import axios from 'axios'
import async from 'async'

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
        } else {
            console.log("NO IMAGE")
        }
    }
    
    saveImage = async (data) => {
        const res = await axios.put('http://10.0.2.2:8080/public/user', data)
        console.log(res)
    }

    pickImage = () => {
        async.waterfall([
            (callback) => {
                let data = {}
                ImagePicker.showImagePicker({}, res => {
                    if(!res.error) {
                        data = {
                            image: 'data:image/png;base64,'+res.data,
                            uuid: this.props.user.uuid
                        }
                        console.log(Base64.encode(res.data))
                        this.setState({pickedImage: {uri: data.image} })
                        callback(null, data)
                    }             
                })      
            }
        ], (err, res) => {
            if(res) {
                console.log(res)
                this.saveImage(res)
            }
            else {
                console.log(err)
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
