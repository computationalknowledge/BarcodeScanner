
import React, { Component } from 'react';
import {
    View,
    Text, TouchableOpacity, StyleSheet, TextInput

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class SignUp extends Component {

    state = {
        email: '',
        pswrd: '',
        firstname:''
    }

    storeData = async (data) => {
        try {
            await AsyncStorage.setItem('logindetails', JSON.stringify(data))
        } catch (e) {

        }
    }

    getData = async (data) => {

        const value = await AsyncStorage.getItem('logindetails')

        try {

            if (value) {

                var list = JSON.parse(value);
                console.log('list value', list)

                list.push(data)
                console.log('AsyncStorage list value', list)
                this.storeData(list)
                // return item;
            }
            else {
                console.log('arrlist blank', JSON.stringify(data))
                this.storeData([data])
            }
        } catch (e) {
            console.log('AsyncStorage err', e)
        }
    }

    onSignUpClick = () => {

        if (this.state.email !== '' && this.state.pswrd !== ''&& this.state.firstname !== '') {
            const data = {
                email: this.state.email,
                password: this.state.pswrd,
                firstname: this.state.firstname
            }

            this.getData(data)

            this.props.navigation.navigate("Login")
        }
        else {
            alert('Fields can\'t be empty !')
        }

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#bd1343' }}>

                <View style={styles.shadowStyle}>

                    <Text style={{ fontSize: 25, color: '#bd1343', fontWeight: 'bold', alignSelf: 'center' }}>SIGN UP</Text>

                    <TextInput
                        style={{ height: 50, width: 250, marginTop: 20, borderRadius: 5, borderWidth: 1, borderColor: '#bd1343' }}
                        value={this.state.firstname}
                        returnKeyType='done'
                        placeholder='  Enter your Name '
                        placeholderTextColor='#bd1343'
                        onChangeText={(val) => this.setState({ firstname: val })}
                    >
                    </TextInput>

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
                            this.onSignUpClick()
                        }>
                        <Text style={{ fontWeight: 'bold', marginTop: 20, padding: 12, textAlign: 'center', color: 'white', height: 50, width: 250, borderRadius: 8, backgroundColor: '#bd1343', fontSize: 18 }}>SIGN UP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("Login")
                        }>
                        <Text style={{ fontSize: 20, color: '#bd1343', fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>LOGIN</Text>
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

export default SignUp