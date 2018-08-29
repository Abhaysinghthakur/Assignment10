const mongoose = require('mongoose')

const Schema = mongoose.Schema

let productSchema = new Schema(
    {
        schemaOf:{
            type:String,
            default:'product'
        },
        productId:{
            type:String,
            unique:true
        },
        name:{
            type:String,
            default:'No name'
        },
        description:{
            type:String,
            default:'none'
        },
        price:{
            type:Number,
            default:0
        }
    }
)

mongoose.model('Product',productSchema)