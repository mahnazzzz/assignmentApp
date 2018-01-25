import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, Modal} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AllSolutions from './AllSolutions'

const allUsersQuery = gql`
query { 
    allUsers (filter: {role: USER}) { 
        id
        name
        email
        rating
    }
}
`

//allUsers(filter: {role: USER})

class AllStudents extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: undefined,
            users: undefined,
            modalVisible: false,
            
        }
    }
    // chera nesxt props inja ezafe shode
    componentWillReceiveProps(nextProps) {
        if (!nextProps.allUsersQuery.loading && !nextProps.allUsersQuery.error) {

            this.setState({
                users: nextProps.allUsersQuery.allUsers
            })
        }
    }

    render() {

        if (this.props.allUsersQuery.loading || this.state.users === undefined) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            //flatlist data chi mige inja ba renderitem
            <View style={styles.container} >

                <Text style={styles.textDesign}>Choose user for show solutions :</Text>

                <FlatList data={
                    this.state.users.map((item) => {
                        return { key: item.id, name: item.name, email: item.email, rating: item.rating }
                    })
                }
                    renderItem={({ item }) =>
                        <TouchableHighlight style={styles.cancelButton}
                            onPress={
                                () => {
                                    this.setState({ userID:item.key, modalVisible: true })
                                }
                            }
                        >
                        <View style={styles.view}>
                            <Text style={styles.title} >{item.name} (email :{item.email}) (rating :{item.rating})

                                            </Text>
                                            </View>
                                            
                                            
                        </TouchableHighlight>



                    }
                />

                <View>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.setState({ modalVisible: false }) }}

                    >
                        <AllSolutions
                         userId = {this.state.userID}
                            onComplete={() => {
                                this.setState({ modalVisible: false })
                            }} />

                    </Modal>


                    <TouchableHighlight
                        style={styles.cancelButton}
                        onPress={() => this.props.onComplete()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

}

export default graphql(allUsersQuery, { name: 'allUsersQuery', })(AllStudents)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    textDesign:{
        backgroundColor: 'black',
        padding: 22,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
    },
    view:{
        backgroundColor: 'black',
        padding: 32,
        height: 65,
        
    },
    title: {
        backgroundColor: 'goldenrod',
        padding: 12,
        color: 'black',
        
        fontSize: 16,
    },
    cancelButton: {
        
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
    },
    cancelButtonText: {
        color: 'goldenrod',
    }
})
