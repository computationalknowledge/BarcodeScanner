'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Alert, Platform  , Image , TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import arrow from '../images/arrow.png'


class Scan extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focusedScreen: true,
      list: []
    }
  }

  willFocusListener = null

  handleBackPress = () => {

    this.camera.pausePreview();
    this.props.navigation.goBack();

    return true;
  }

  storeData = async (data) => {
    try {
      await AsyncStorage.setItem('scanlist', JSON.stringify(data))
    } catch (e) {

    }
  }

  getData = async (data) => {

    const value = await AsyncStorage.getItem('scanlist')

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

  onSuccess = async (e) => {

    console.log("scan result" + JSON.stringify(e))
    this.getData(e[0])

    try {

      if (Platform.OS === 'ios') {

        if (e.data) {
          Alert.alert(
            'Data',
            e.data,
            [{ text: 'OK', }],
            { cancelable: false })
          this.camera.pausePreview();
          this.props.navigation.navigate('EavList')
        }
        else {

          Alert.alert(
            'Invalid',
            'Invalid QR Code.',
            [{ text: 'OK', }],
            { cancelable: false })

        }

      }
      else {

        if (e[0].data) {
          Alert.alert(
            'Data',
            e[0].data,
            [{ text: 'OK', }],
            { cancelable: false })
          this.camera.pausePreview();
          this.props.navigation.navigate('Home')
        }
        else {
          Alert.alert(
            'Invalid',
            'Invalid QR Code.',
            [{ text: 'OK', }],
            { cancelable: false })
        }

      }

    }
    catch (error) {

    }

  }

  componentDidMount() {
    let { navigation } = this.props
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }

  componentWillUnmount() {

  }

  loadWillFocus = () => {

  }

  onBarCodeRead = e => {
    console.log("scanScreen--9090>>" + e + "-->>");
    // this.setState({ qrcode: e.data });
  };

  render() {

    const { hasCameraPermission, focusedScreen } = this.state;
    console.log("scanScreen--00>>" + hasCameraPermission + "-->>" + focusedScreen);

    const { height, width } = Dimensions.get('window');
    const maskRowHeight = Math.round((height - 300) / 20);
    const maskColWidth = (width - 300) / 2;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (focusedScreen) {
      return (
        //  <SafeAreaView >
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>

          <SafeAreaView style={{ }} />

          <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#bd1343', alignItems: 'center' }}>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.goBack()
              }>
              <Image resizeMode='cover' style={{ height: 30, width: 30, alignSelf: 'center', marginLeft: 10, tintColor: 'white' }}
                source={arrow}>
              </Image></TouchableOpacity>



            <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center', marginLeft: 20 }}>Scan Code</Text>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Login")
              }>
              <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#bd1343', color: 'white', fontSize: 18, padding: 10, textAlign: 'center' }}>Logout</Text>
            </TouchableOpacity>

          </View>

          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onBarCodeRead={(value) => {
              //  console.log("onBarCodeRead--00>>" + JSON.stringify(value));
              Platform.OS === 'ios' ? this.onSuccess(value) : null
            }}

            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              // console.log("onGoogleVisionBarcodesDetected--00>>" + JSON.stringify(barcodes));
              { Platform.OS === 'android' ? this.onSuccess(barcodes) : null };
            }}
          >

            <View style={styles.maskOutter}>

              <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />

              <View style={[{ flex: 30 }, styles.maskCenter]}>

                <View style={[{ width: maskColWidth }, styles.maskFrame]} />

                <View style={styles.maskInner} />

                <View style={[{ width: maskColWidth }, styles.maskFrame]} />

              </View>

              <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />

            </View>

          </RNCamera>
          <SafeAreaView style={{ backgroundColor: 'white' }} />
        </View>

      );
    }
    else {
      return <View />;
    }

  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  buttonstyle:
  {
    width: 250,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 20,
    textAlignVertical: "center"
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: '#BD9881',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});

export default Scan;