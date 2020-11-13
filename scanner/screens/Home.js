
import React, { Component } from 'react';

import {
    View,
    FlatList, Text, TouchableOpacity, Image,SafeAreaView ,StyleSheet

} from 'react-native';
import arrow from '../images/arrow.png'
import qqrcode from '../images/qqrcode.png'
class Home extends Component {

    state = {
        show: false
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1 }}>

                <View style={{ alignItems:'center' ,height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#bd1343' }}>
                    {
                        this.state.show ?
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.goBack()
                            }>
                            <Image resizeMode='cover' style={{ height: 30, width: 30, alignSelf: 'center', marginLeft: 10, tintColor: 'white' }}
                                source={arrow}>
                            </Image></TouchableOpacity>
                            :
                            <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center' }}></Text>

                    }


                    <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center',marginRight:-80}}>Scanner App</Text>

                    <TouchableOpacity
                        onPress={() =>

                            this.props.navigation.navigate("Login")

                        }>
                        <Text style={{ fontWeight: 'bold', backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center' }}>Logout</Text>
                    </TouchableOpacity>

                </View>

                <Text style={{ fontWeight: 'bold', marginTop: 30, color: 'bd1343', fontSize: 18, textAlign: 'center', marginLeft: 20 }}>Scan Qr Code</Text>
                <Text style={{ fontWeight: 'normal', marginTop: 30, color: 'bd1343', fontSize: 18, textAlign: 'center', marginLeft: 20 }}>Place qr code inside the frame to scan please avoid shake to get results quickly</Text>

                <Image resizeMode='cover' style={{marginTop:40, height: 200, width: 200,alignSelf: 'center', marginLeft: 10 }}
                            source={qqrcode}>
                        </Image>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("Scan")
                        }>
                        <Text style={{ fontWeight: 'bold', padding: 12, textAlign: 'center', color: 'white', height: 50, width: 200, borderRadius: 8, backgroundColor: '#bd1343', fontSize: 18 }}>Scan Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("ScanList")
                        }>
                        <Text style={{ fontWeight: 'bold',  marginTop: 20,padding: 12, textAlign: 'center', color: 'white', height: 50, width: 200, borderRadius: 8, backgroundColor: '#bd1343', fontSize: 18 }}>Show List</Text>
                    </TouchableOpacity>

                   
                </View>

            </View>
            </SafeAreaView>
        )
    }

}

export default Home