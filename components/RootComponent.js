import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'

import Login from './Login'
import User from './User'
import UserOverView from './UserOverview'
import AssignmentSolvers from './AssignmentSolvers'
import Admin from './Admin'
import NewSolution from './NewSolution'
import PersonalizedAssignments from './PersonalizedAssignments'


export default class RootComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      modalVisible: false,
      user: undefined,
    }
  }


  render() {


    if (this.state.user !== undefined) {
      if (this.state.user.role === 'USER') {
        return (
          <View style={styles.container}>

            <User user={this.state.user} />

            <TouchableHighlight
              style={styles.loginButtonContainer}
              onPress={this._logout}
            >
              <Text style={styles.loginButton}>Logout</Text>
            </TouchableHighlight>
          </View>
        )
      }
      if (this.state.user.role === 'ADMIN') {
        return (
          <View style={styles.adminContainer}>
            <Admin />
            <TouchableHighlight
              style={styles.loginButtonContainer}
              onPress={this._logout}
            >
              <Text style={styles.loginButton}>Logout</Text>
            </TouchableHighlight>
          </View>
        )
      }
      return (
        <Text>This is the page for users without a role, you should never see this</Text>
      )
    }

    return (

      <View style={styles.container}>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}

        >

          <Login
            onComplete={(loggedInUser) => {
              this.setState({ modalVisible: false, user: loggedInUser })
            }} />
        </Modal>


        <TouchableHighlight
          style={styles.loginButtonContainer}
          onPress={this._login}
        >

          <Text style={styles.loginButton}>Login</Text>
        </TouchableHighlight>

      </View>
    )
  }

  _login = () => {

    this.setState({ modalVisible: true })

  }


  _logout = async () => {
    await AsyncStorage.removeItem('graphcoolToken').then(this.setState({ user: undefined }))
    console.log(this.state.user)
  }

}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 22,
  },
  adminContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 22,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'goldenrod',
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  },

})



