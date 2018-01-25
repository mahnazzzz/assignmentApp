import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
    View,
    TextInput,
    Button,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

const createAssignmentMutation = gql`
  mutation ($description: String!, $url: String!, $rating: Float!){
    createAssignment(description: $description, url: $url, rating: $rating) {
      id
    }
  }
`

class CreatePage extends React.Component {

    state = {
        description: '',
        url: '',
        rating: 0.0
    }

    render() {

        return (
            <View style={styles.container} >

                <TextInput
                    style={styles.textInput}
                    placeholder='Type a description...'
                    onChangeText={(text) => this.setState({ description: text })}
                    value={this.state.description}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder='Type an url...'
                    onChangeText={(text) => this.setState({ url: text })}
                    value={this.state.url}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder='Enter a rating...'
                    onChangeText={(text) => this.setState({ rating: Number(text) })}
                    value={this.state.rating}
                />

                <Text style={styles.saveButtonText}>     </Text>

                <View style={styles.buttons}>

                    <TouchableHighlight
                        style={styles.saveButton}
                        onPress={() => this._createAssignment()}
                    >
                        <Text style={styles.saveButtonText}>ADD ASSIGNMENT</Text>
                    </TouchableHighlight>

                    <Text style={styles.saveButtonText}>     </Text>
                    
                    <TouchableHighlight
                    style={styles.cancelButton}
                    onPress={() => this.props.onComplete()}
                >
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableHighlight>

                </View>

            </View>
        )
    }

    _createAssignment = async () => {
        const { description, url, rating } = this.state
        await this.props.createAssignmentMutation({
            variables: { description, url, rating }
        })
        this.props.onCompleteSave()

    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: 22
    },
    textInput: {
        backgroundColor: 'goldenrod',
        paddingHorizontal: 20,
    },
    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
    saveButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'goldenrod',
        height: 65,
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'black',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'goldenrod',
        height: 65,

    },
    cancelButtonText: {
        color: 'black',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        
        paddingHorizontal: 2,
    },

})

export default graphql(createAssignmentMutation, { name: 'createAssignmentMutation' })(CreatePage)