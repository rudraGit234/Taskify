//FOR LOGIC api methods 
import asyncHandler from "express-async-handler" // to handle the async function promises and defaults the try catch errror way without using them everytime 
import Contact from "../models/contactModel.js"; //contains the schema model


//@desc Get all contacts
//@route GET /api/contacts
//@access private 
export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts)
    //req for requesting and res for responding the client with what we want 
})


//@Create new contact 
//@ POST route/api/contacts
//@access private 
export const createContact = asyncHandler(async (req, res) => {
    console.log(`The request body is : ${JSON.stringify(req.body)}`);
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are manadatory");
    }

    const contact = await Contact.create({
        name, // Since the key and the value are same just mention the key due to ES 6
        email,
        phone,
        user_id: req.user.id // id will come from the user property which is inside the middle ware validate token
    })
    res.status(201).json(contact)
});



//@ Get single contact
//@ GET route/api/contacts:id
//@access private 
export const getcontact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    res.status(200).json(contact)
    console.log(contact);
    //req for requesting and res for responding the client with what we want 
})


//@ Update contact
//@ PUT route/api/contacts:id  
//@access private 
export const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    //warning for different uswe trying to update another users contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You dont have permission to update other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
    //req for requesting and res for responding the client with what we want 
})


// Delete contact
//@ Delete route/api/contacts:id
//@access private 
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    //warning for different uswe trying to update another users contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You dont have permission to update other user contacts")
    }

    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
    //req for requesting and res for responding the client with what we want 
})

