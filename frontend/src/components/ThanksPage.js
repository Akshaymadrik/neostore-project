import React from 'react'
import { Button, Container } from 'react-bootstrap'

export default function ThanksPage() {
    return (
        <Container className='mt-5'style={{marginBottom:'267px'}}>
            <h2>Thank You for contacting us<br/> {sessionStorage.getItem('subscriber')}</h2>
            <Button variant='primary' size='lg' href="/" className='m-3' >Click here to continue Shopping</Button>
        </Container>
    )
}
