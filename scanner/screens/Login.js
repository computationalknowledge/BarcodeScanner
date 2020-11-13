
import React, { Component } from 'react';

import {
    View,
    Text, TouchableOpacity, StyleSheet, TextInput

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {

    state = {
        email: '',
        pswrd: '',
        loginlist: [],
        alert: false
    }

    getData = async () => {

        const value = await AsyncStorage.getItem('logindetails')
        console.log('list value', 'enter')
        try {
            if (this.state.email !== '' && this.state.pswrd !== '') {
                if (value) {

                    var list = JSON.parse(value);
                    console.log('list value', list)
                    this.searchFromList(list)
                }
                else {
                    alert('You need to sign up first !')
                }
            }
            else {
                alert('Fields can\'t be empty !')
            }

        } catch (e) {
            console.log('AsyncStorage err', e)
        }
    }

    searchFromList = async (list) => {

        console.log('list search ', list.length)
        var showalert = false
        list.forEach((item) => {

            if (item.email === this.state.email && item.password === this.state.pswrd) {
                console.log('list search ', 'email')
                showalert = true
                this.props.navigation.navigate("Home")
            }
            
        });
        if (!showalert) {
            alert('Invalid Email/Password !')
        }

        // for (var i = 0; i <= list.length ; i++) {
        //     var name= list[i].email
        //     console.log('name' , name)


        // }

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#bd1343' }}>

                <View style={styles.shadowStyle}>

                    <Text style={{ fontSize: 25, color: '#bd1343', fontWeight: 'bold', alignSelf: 'center' }}>LOGIN</Text>

                    <TextInput
                        style={{ height: 50, width: 250, marginTop: 20, borderRadius: 5, borderWidth: 1, borderColor: '#bd1343' }}
                        keyboardType='email-address'
                        value={this.state.email}
                        returnKeyType='done'
                        placeholder='  Enter your email '
                        placeholderTextColor='#bd1343'
                        onChangeText={(val) => this.setState({ email: val })}
                    >
                    </TextInput>

                    <TextInput
                        style={{ height: 50, width: 250, marginTop: 20, borderRadius: 5, borderWidth: 1, borderColor: '#bd1343' }}
                        secureTextEntry={true}
                        value={this.state.pswrd}
                        returnKeyType='done'
                        placeholder='  Enter your password'
                        placeholderTextColor='#bd1343'
                        onChangeText={(val) => this.setState({ pswrd: val })}
                    >
                    </TextInput>

                    <TouchableOpacity
                        onPress={() =>
                            
                            this.getData()

                        }>
                        <Text style={{ fontWeight: 'bold', marginTop: 20, padding: 12, textAlign: 'center', color: 'white', height: 50, width: 250, borderRadius: 8, backgroundColor: '#bd1343', fontSize: 18 }}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("SignUp")
                        }>
                        <Text style={{ fontSize: 16, color: '#bd1343', fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}


const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#000', elevation: 3, shadowOffset: {
            width: 0,
            height: 0.5,
            padding: 10,
        }, shadowRadius: 5, shadowOpacity: 0.5,
        borderRadius: 5,
        margin: 20,
        backgroundColor: 'white',
        padding: 10,
        width: '80%',
        alignItems: 'center'


    }
})
export default Login