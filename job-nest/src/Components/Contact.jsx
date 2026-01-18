import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import Listing from '../../../api/model/listing'

export default function Contact({listing}) {

    const [owner, setOwner] = useState(null)
    const [message, setMessage] = useState('')

    const onChange = (e) => {
        setMessage(e.target.value)
    }
    useEffect(()=>{
        try {
            const fetchOwner = async () => {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                setOwner(data)
            }
            fetchOwner()
        } catch (error) {
            console.log(error);
        }
    }, [listing])

  return (
    <>
        {owner && (
            <div className="">
                <p>
                    Contact <span className='font-semibold'>{owner.name}</span>{' '}for{' '}
                    <span className='font-semibold'>{listing.jobTitle.toLowerCase()}</span>
                </p>
                <textarea
                    name='message'
                    id='message'
                    rows={2}
                    value={message}
                    onChange={onChange}
                    placeholder='Enter your message here...'
                    className='w-full border p-3 rounded-lg'
                ></textarea>
                <Link to={`mailto:${owner.email}?subject=Regarding ${owner.name}&body=${message}`} className='bg-blue-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                    Send Message
                </Link>
            </div>
        )}
        
    </>
  )
}
