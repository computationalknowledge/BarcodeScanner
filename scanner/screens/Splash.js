import React, { Component } from 'react';
import {
    View,
    FlatList, Text, TouchableOpacity, Image

} from 'react-native';
import qrcode from '../images/qrcode.png'

class Splash extends Component {

    componentWillMount() {

        var navigator = this.props.navigation;
        setTimeout(() => {
            navigator.replace("Routes");
        }, 2000);

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#BD9881', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>

                <View>
                    <Image resizeMode='cover' style={{ alignSelf: 'center', height: 40, width: 40, borderRadius:5 }}
                        source={qrcode}>
                    </Image>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, width: '100%', height: 50, backgroundColor: '#BD9881', color: 'black', fontSize: 22, padding: 10, textAlign: 'center' }}>Scanner App</Text>

                </View>

            </View>
        )
    }
}

export default Splash