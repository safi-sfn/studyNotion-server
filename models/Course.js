const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseNmae:{
        type:String,
        trim:true,
        required:true
    },
    courseDescriptiopn:{
        type:String,
        trim:true,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[
        {
            types:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }
    ]

})

module.exports = mongoose.model("Course",courseSchema)