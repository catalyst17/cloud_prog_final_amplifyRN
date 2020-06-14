import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Alert, Button, BackHandler } from 'react-native'
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Auth } from 'aws-amplify'
import PlantDoctor from './PlantDoctor'
import WateringPage from './WateringPage'
import PlantDetail from './PlantDetail'

class PlantPage extends Component {    
  state = {
    currentView: 'plantPage',
    plantSelected: true
  }

  updateView = (currentView) => {
    this.setState({ currentView })
  }

  changeView = () => {
    const { plantSelected } = this.state
    this.setState({plantSelected: !plantSelected})
  }

  componentDidMount() {
    this.setState({ plantSelected: false })
  }
  
  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick = () => {
      this.props.changeView();
      return true;
  }
    
  render() {
    console.log('props: ', this.props)
    // alert(this.props.plantId);
    const { currentView } = this.state
    console.log('currentView: ', currentView)
    return (
      <>
    
      { currentView === 'plantPage' && 
      <View style={styles.container}>
        <Image
          style={styles.plantImage}
          source={{
            uri: 'https://www.provenwinners.com/sites/provenwinners.com/files/imagecache/500x500/ifa_upload/lycopersicon_garden_treasure_mono.jpg'
          }}
        />
        <Text style={styles.subtitle}>Tomato</Text>
        <View style={styles.btnGroup}>
          <View style={styles.btn}>
            <Button
              onPress={() => {
                this.setState({plantId: "tmt1"});
                this.setState({ currentView: 'plantDetail'})
              }}
              title="Plant Detail"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button
              onPress={() => {
                this.setState({plantId: "tmt1"});
                this.setState({ currentView: 'plantDoctor' })
              }}
              title="Plant Doctor"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button 
              onPress={() => {
                this.setState({plantId: "tmt1"});
                this.setState({ currentView: 'plantWatering'})
              }}
              title="Watering"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button 
              onPress={() => Alert.alert('History pressed')}
              title="History"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button 
              onPress={() => Alert.alert('Album pressed')}
              title="Album"
              color="#3294e5"
            />
          </View>
        </View>
      </View>
      }
      { currentView === 'plantDoctor' && <PlantDoctor updateView={this.updateView} />}
      { currentView === 'plantWatering' && <WateringPage updateView={this.updateView} />}
      { currentView === 'plantDetail' && <PlantDetail updateView={this.updateView} />}
      </>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0
  },
  subtitle: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginTop: 10,
    marginBottom: 10
  },
  plantImage: {
    width: '100%',
    height: '45%',
  },
  btnGroup: {
    width: '100%',
    alignItems: 'center'
  },
  btn:{
    marginTop: 20,
    width: '80%',
    textAlign: 'center',
  }
})

export default PlantPage