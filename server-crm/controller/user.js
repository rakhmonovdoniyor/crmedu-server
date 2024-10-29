const jwt = require("jsonwebtoken")
const User = require("../models/auth.models");


const generateToken = (id) =>{
    return jwt.sign({id}, "SSHHHH", {
        expiresIn: "30d"
    })
}

const registerUser = async(req, res) => {
    const {name,surName, country, number,email,password} =req.body;

    try {
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "User already exist"});
        }

        const user = User.create({
            name ,
            surName,
            country,
            number,
            email,
            password,

        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
        
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "error register", error})
    }
};


const Login = async (req, res) =>{
    const {email,password} = req.body;
    console.log("Working");
     try {
        const user = await User.findOne({email});
        console.log("Working 2");
        if (user && (await user.matchPassword(password))){
            console.log("Working 3");
            res.json({
                _id: user._id,
                // name: user.name,
                email: user.email,
                // password: user.password,
                token: generateToken(user._id)

            });
            console.log("Working 4");
        }  
        else{
            console.log("Error login1");

            res.status(400).json({message: "email or password invalid!"})
            console.log("Error login2");
        }
    } catch (error) {
        res.status(400).json({message: "error login", error})
        console.log("Error login3");

    }
}


module.exports = {registerUser, Login}