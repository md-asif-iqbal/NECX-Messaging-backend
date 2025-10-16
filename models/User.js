import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true },
avatar: { type: String },
},
{ timestamps: true }
)


export const User = mongoose.model('User', UserSchema)
