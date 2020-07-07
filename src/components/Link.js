import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/es'    
import { AUTH_TOKEN, AUTH_USER } from '../constants'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
       id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`
class Link extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        const authUser =  localStorage.getItem(AUTH_USER);
        return ( 
            <div className="flex mt2 items-start"> 
                <div className="flex item-center">
                    <span className="gray">{this.props.index + 1}.</span>
                    { authToken && (    
                        <Mutation
                            mutation={VOTE_MUTATION}
                            variables={{ linkId: this.props.link.id }}
                            update={(store, { data: {vote} })=>{
                                this.props.updateStoreAfterVote( store, vote, this.props.link.id )
                            }}
                        >
                            {voteMutation => (
                                <div className="ml1 gray f11" onClick={ voteMutation }>
                                    ▲ {'  '}
                                </div>
                            )}
                            {/* ( this.props.link.votes.findIndex( v => v.id === authUser.id ) >-1 )  ?  : 'ok' */}
                            
                        </Mutation>
                        
                    )}
                </div> 
                <div className="ml1">
                    <div>
                        {this.props.link.description} ( {this.props.link.url} )
                    </div>
                    <div className="f6 lh-copy gray">
                        {this.props.link.votes.length}{'  '} votes | by {'  '}
                        {this.props.link.postBy
                            ? this.props.link.postBy.name
                            : 'Unknown'}{' '}
                        { moment( this.props.link.createdAt ).fromNow() }
                    </div>
                </div>
            </div> 
        )
    }
}

export default Link;