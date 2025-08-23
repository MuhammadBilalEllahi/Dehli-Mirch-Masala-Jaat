import mongoose from "mongoose";

export const AddressSubSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  address:     { type: String, required: true },
  // line2:     { type: String, default: "" },
  city:      { type: String, required: true },
  postalCode:{ type: String, default: "" },
  phone:     { type: String, required: true },
  country:   { type: String, default: "PK" },
}, { _id: false });
