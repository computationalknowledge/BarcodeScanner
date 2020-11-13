
import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet, TouchableOpacity, Image

} from 'react-native';

class ScanListItem extends Component {
    render() {

        const {item , type , onDeleteItem}=this.props

        return (
            <View style={[styles.shadowStyle, { flex: 1, flexDirection: 'column', padding: 5, marginVertical: 10, marginHorizontal: 10}]}>
               
               <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={{ fontSize: 14, color :'black' , textAlign:'center', padding:5}}>Data : </Text>
                <Text style={{ fontSize: 14, color :'#BD9881' ,padding:10}}>{item}</Text>
                </View>

                <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={{ fontSize: 14, color :'black' , textAlign:'center', padding:5}}>Type : </Text>
                <Text style={{ fontSize: 14, color :'#BD9881' ,padding:10 }}>{type}</Text>
                </View>

                <TouchableOpacity style={{alignSelf:'flex-end'}}
                onPress={() => onDeleteItem()}>
                        <Image style={{ tintColor: "#BD9881", width: 30, height: 30 }} source={require("../images/delete.png")}></Image>
                    </TouchableOpacity>
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
        backgroundColor: '#FFFFFF',
        padding: 10,
    }
})

export default ScanListItem