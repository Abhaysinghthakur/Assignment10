const mongoose = require('mongoose')

const Schema = mongoose.Schema

let cartSchema = new Schema(
    {
        schemaOf:{
            type:String,
            default:'cart'
        },
        productId:{
            type:String,
            default:''
        },
        userId:{
            type:String,
            default:''
        }
    }
)

mongoose.model('Cart',cartSchema)