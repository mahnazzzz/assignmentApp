import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const allSolutionQuery = gql`
query  { 
    allSolutions { 
        id
        rating 
        url 
    }
}
`

//allUsers(filter: {role: USER})

class FindSolutions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            solutions: undefined,
        }
    }
    // chera nesxt props inja ezafe shode
    componentWillReceiveProps(nextProps) {
        if (!nextProps.allSolutionQuery.loading && !nextProps.allSolutionQuery.error) {

            this.setState({
                solutions: nextProps.allSolutionQuery.allSolutions

            })
        }
    }

    render() {

        if (this.props.allSolutionQuery.loading || this.state.solutions === undefined) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            //flatlist data chi mige inja ba renderitem
            <View style={styles.container}>
                <View>
                    <Text >All solutions:</Text>

                    <FlatList data={
                        this.state.solutions.map((item) => {
                            return { key: item.id, rating: item.rating, url: item.url }
                        })
                    }
                        renderItem={({ item }) => <Text style={styles.title}> (solution rating :{item.rating}) (url :{item.url})</Text>}
                    />

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

export default graphql(allSolutionQuery, { name: 'allSolutionQuery',  
 })(FindSolutions)

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

        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
    },
    cancelButtonText: {
        color: 'goldenrod',
    }
})
