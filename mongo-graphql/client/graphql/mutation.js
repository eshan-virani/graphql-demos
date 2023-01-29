import { gql } from '@apollo/client'

export const SIGN_UP = gql`
mutation SignupUser($newdata:signup){
    newrecord:SignupUser(signupdata:$newdata){
      _id
      email
      firstName
      lastName
    }
  }
`

export const LOGIN = gql`
mutation SigninUser($login:signin){
    SignIn(signindata:$login){
      authtoken
    }
  }
`

export const CREAT_QUOTE = gql`
mutation addQuote($quote: newquotes) {
  addQuote(addQuotes: $quote) {
    by
    name
  }
}
`