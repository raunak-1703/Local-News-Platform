import mongoose from 'mongoose';

const reportedSchema = new mongoose.Schema({
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    reason:{
        type:String,
        required:true,
    }
},{timestamps:true}
)

const Report = mongoose.model('Report',reportedSchema);

export default Report;