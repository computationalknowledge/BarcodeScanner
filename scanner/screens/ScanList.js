
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import {
    View,
    FlatList, Text, TouchableOpacity, Alert, Image

} from 'react-native';
import ScanListItem from '../components/ScanListItem'
import AsyncStorage from '@react-native-community/async-storage';
import arrow from '../images/arrow.png'
import nodatasad from '../images/nodatasad.png'

class ScanList extends Component {


    state = {
        list: []
    }

    componentDidMount() {
        this.getData()
    }

    storeData = async (data) => {
        try {
            await AsyncStorage.setItem('scanlist', JSON.stringify(data))
        } catch (e) {

        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('scanlist')
            if (value !== null) {
                const item = JSON.parse(value);
                console.log('AsyncStorage value', item)
                this.setState({
                    list: item
                })
                console.log('data', this.state.list)
                return item;
            }
        } catch (e) {
            console.log('AsyncStorage err', e)
        }
    }

    deleteItem = (index) => {
        let { list } = this.state

        var newList = [...list]

        Alert.alert(
            'Do you want to delete this item ?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        newList.splice(index, 1)
                        this.setState({
                            list: newList
                        })
                        this.storeData(newList)
                    }

                },
            ]
        );


    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1 }}>
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#bd1343', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.goBack()
                        }>
                        <Image resizeMode='cover' style={{ height: 30, width: 30, alignSelf: 'center', marginLeft: 10, tintColor: 'white' }}
                            source={arrow}>
                        </Image></TouchableOpacity>

                    <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center', marginLeft: 20 }}>Scan List</Text>

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("Login")
                        }>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center' }}>Logout</Text>
                    </TouchableOpacity>

                </View>
                {
                    this.state.list && this.state.list.length > 0?
                        <FlatList
                            data={this.state.list}
                            renderItem={
                                ({ item, index }) =>

                                    <ScanListItem
                                        item={item.data}
                                        type={item.type}
                                        onDeleteItem={() => this.deleteItem(index)}

                                    />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>

                            <Image resizeMode='cover' style={{ alignSelf: 'center', height: 40, width: 40, borderRadius: 5 }}
                                source={nodatasad}>
                            </Image>

                            <Text style={{ fontWeight: 'bold', fontSize: 18,color: 'black', fontSize: 22, padding: 10, textAlign: 'center' }}>No Record Found</Text>

                        </View>}

            </View>
            </SafeAreaView>

        )
    }

}

export default ScanList