import Event from '/event.model.js'
import asyncHandler from 'express-async-handler'

const createEvent = asyncHandler(async(data,user)=>{
    if(user.role !== 'admin'){
        throw new Error('User not authorized to create event')
    }

    const event = await Event.create({
        ...data,
        createdBy: user.id
    });

    return event
})

const getAllEvents = asyncHandler(async(filters={})=>{
    const events = await Event.find(filters).populate(
        'createdBy','name email').sort(
            {date:1});

    if(!events)
        throw new Error('No events found')

    return events
})

const getEvent = asyncHandler(async(title)=>{
    const event = await Event.find(title).populate('createdBy','name email')

    if(!event)
        throw new Error('Cannot find event with this title')

    return event
})

const editEvent = asyncHandler(async (title) => {
    const event = await Event.find(title)
    if (!event)
        throw new Error('Cannot find event with this title')
    
})