import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

const main = {
  backgroundColor: '#ffffff'
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto'
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0'
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline'
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0'
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px'
}


export default function MagicLinkEmail({host, url}) {
  return (
    <Html>
      <Head/>
      <Preview>Click the link to reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Reset your password for {host}
          </Heading>
          <Link href={url}
          target='_blank'
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px'
          }}>
            Click here to reset your password
          </Link>
          <Text style={{...text,
          color: '#ababab',
          marginTop: '14px',
          marginBottom: '16px'
        }}>
          If you didn&apos;t try to reset your password, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          <Link style={{ ...link, color: '#898989'}} href='studenthealthyconversations.com' target='_blank'>
            {host}
          </Link>
        </Text>
        </Container>
      </Body>
    </Html>
  )
}