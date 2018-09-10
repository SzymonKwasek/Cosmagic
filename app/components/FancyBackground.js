import React from 'react'
import { ImageBackground, StyleSheet, Dimensions} from 'react-native'


import bgImage from '../../assets/images/roses.jpg'


export default class FancyBackground extends React.Component {


    renderChildren() {
        let childrens = []
        childrens.push(this.props.children)
        return childrens
    }


    render() {
        return (
            <ImageBackground source={bgImage} style={styles.image}>
                {this.renderChildren()}
            </ImageBackground>
        );
    }

}

const width = Dimensions.get('window').width


const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: null,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
    }
})