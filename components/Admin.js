import React from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList, Modal, TouchableHighlight, TextInput } from 'react-native'
import AssignmentByRating from './AssignmentByRating'
import AllAssignment from './AllAssignments'
import NewAssignment from './NewAssignment'
import AllStudent from './AllStudents'
import AllSolutions from './AllSolutions'
import RatingTextfield from './RatingTextfield'


export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
            modalVisible1: false,
            modalVisible2: false,
            modalVisible3: false,
            modalVisible4: false,
            
        };
    }
    render() {

        
            return (
                <View style={styles.container}>
                    <View >
                   

                        <TouchableHighlight style={styles.saveButton}
                            onPress={
                                () => {
                                    this.setState({ modalVisible4: true })
                                }
                            }
                        >
                            <Text style={styles.saveButtonText}>FIND ASSIGNMENT BY RATING </Text>

                        </TouchableHighlight>

                        <Text >             </Text>

                        <TouchableHighlight style={styles.saveButton}
                            onPress={
                                () => {
                                    this.setState({ modalVisible1: true })
                                }
                            }
                        >
                            <Text style={styles.saveButtonText}>ALL ASSIGNMENT</Text>

                        </TouchableHighlight>

                        <Text >             </Text>

                        <TouchableHighlight style={styles.saveButton}
                            onPress={
                                () => {
                                    this.setState({ modalVisible2: true })
                                }
                            }
                        >
                            <Text style={styles.saveButtonText}>ALL STUDENTS </Text>

                        </TouchableHighlight>

                        <Text >             </Text>

                        <TouchableHighlight style={styles.saveButton}
                            onPress={
                                () => {
                                    this.setState({ modalVisible3: true })
                                }
                            }
                        >
                            <Text style={styles.saveButtonText}>ADD ASSIGNMENT </Text>

                        </TouchableHighlight>

                        <Text >             </Text>



                    </View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modalVisible1}
                        onRequestClose={() => { this.setState({ modalVisible1: false }) }}

                    >
                        <AllAssignment
                            onComplete={() => {
                                this.setState({ modalVisible1: false })
                            }} />

                    </Modal>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modalVisible2}
                        onRequestClose={() => { this.setState({ modalVisible2: false }) }}

                    >
                        <AllStudent
                            onComplete={() => {
                                this.setState({ modalVisible2: false })
                            }} />

                    </Modal>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modalVisible3}
                        onRequestClose={() => { this.setState({ modalVisible3: false }) }}

                    >
                        <NewAssignment onCompleteSave={() => alert("ASSIGNMENT ADDED")}
                            onComplete={() => {
                                this.setState({ modalVisible3: false })
                            }} />

                    </Modal>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modalVisible4}
                        onRequestClose={() => { this.setState({ modalVisible4: false }) }}

                    >

                        <RatingTextfield 
                            onComplete={() => {
                                this.setState({ modalVisible4: false })
                            }} />

                    </Modal>

                </View>
            )
        


    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: 22
    },

    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {

        backgroundColor: 'goldenrod',
        borderRadius: 1,
        padding: 5

    },
    okButton: {
        backgroundColor: 'goldenrod',
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        height: 60,
        width: 480,
        paddingTop: 18,
    },
})