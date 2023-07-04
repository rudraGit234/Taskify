import mongoose from "mongoose";

//inside this we will have the field we want in our contact object, this will have all the values we want in our contact resource with database name taskify
const contactSchema = mongoose.Schema({
    user_id: { // id for the user who is creating the contact
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },

    phone: {
        type: String,
        required: [true, "Please add the contact phone number"]
    },

}, {
    timestamps: true
})

export default mongoose.model("Contact", contactSchema)