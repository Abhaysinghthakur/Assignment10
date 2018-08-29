const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userSchema = new Schema(
    {
        schemaOf:{
            type:String,
            default:'user'
        },
        userId:{
            type:String,
            unique:true
        },
        name:{
            type:String,
            default:'No name'
        },
        lastName:{
            type:String,
            default:'none'
        }
    }
)

mongoose.model('User',userSchema)