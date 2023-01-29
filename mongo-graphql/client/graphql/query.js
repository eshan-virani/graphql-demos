import { gql } from '@apollo/client'

export const ALL_QUOTES = gql`
query{
  quotesdata{
    _id
    by{
      email
      firstName
      lastName
    }
    name
  }
}
`