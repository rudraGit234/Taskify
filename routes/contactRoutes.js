import express from "express";
import { getContacts, createContact, getcontact, updateContact, deleteContact } from "../controllers/contactControlller.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router()
//http get method + route specification 

router.use(validateToken) // This way we can validate token on all the routes 

router.route("/")
    .get(getContacts).post(createContact)

// id is used in data where we need to get a specific thing from the database  
router.route("/:id")
    .get(getcontact).put(updateContact).delete(deleteContact)

export default router;  