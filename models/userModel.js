    import mongoose from "mongoose"
    import bcrypt from "bcrypt"



    const userSchema =  new mongoose.Schema({
        firstName: {
            type:String,
            required:true,
            minLength:[2,"firstname must be greater than 2 letter"],
            maxLength:50
        },

        lastName:{
            type:String,
            required:true,
            minLength:2,
            maxLength:50
        },

        email:{
            type:String,
            required:true,
            match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
            unique:true
        },
        
        password:{
            type:String,
            required:true,
            minLength:2,
            maxLength:50
        },

        role:{
            type:String,
            enum:["user", "admin"],
            default:"user"
            
        }




    }, {timestamps:true} )

    userSchema.pre("save", async function(next){

        if(!this.isModified("password")){
            return next();

        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();



    })

    userSchema.methods.comparePassword = async function(passedPassword){

        return await bcrypt.compare(passedPassword, this.password)
        
    }



    export const userModel = mongoose.model("Users", userSchema);
