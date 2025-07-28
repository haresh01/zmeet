export async function signup(req, res)  {
   const {email, password, fullName} = req.body;

   try {
    if (!email || !password || !fullName){
        return res.status(400).json({message: "All fields are required" });
    }
    if(password.length < 6) {
        return res.status(400).json({message: })
    }
   } catch (error) {
    
   }
}

export async function login(req, res)  {
    res.send("Login Route")
}

export async function logout(req, res)  {
    res.send("Logout Route")
}