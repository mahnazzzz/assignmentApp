import React from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList, Modal, TouchableHighlight, TextInput } from 'react-native'
import AssignmentByRating from './AssignmentByRating'
import AllAssignment from './AllAssignments'
import NewAssignment from './NewAssignment'

export default class Admin extends React.Component {


    state = {
        text: undefined

    }
    render() {

        if (this.state.text === undefined) {
            return (
                <View style={styles.container}>
                <Text style={styles.title}> INPUT YOUR RATING FOR ASSIGNMENT </Text>
                    <TextInput
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20, height: 70, borderColor: 'gray', borderWidth: 1
                        }}
                        
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                </View>
            )
        }

        return (
            <View style={styles.container}>


                <TextInput
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20, height: 70, borderColor: 'gray', borderWidth: 1
                    }}
                    
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                
               
                 <AssignmentByRating rating={Number(this.state.text)} />
                <TouchableHighlight
                    style={styles.cancelButtonText}
                    onPress={() => this.props.onComplete()}

                >
                    <Text style={styles.cancelButton}>BACK</Text>
                </TouchableHighlight>


            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: 'goldenrod',
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        height: 60,
        width: 480,
        paddingTop: 18,

    },

    cancelButtonText: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
