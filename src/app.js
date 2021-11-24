const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const multer = require("multer");
const uuid = require("uuid").v4;


require("./db/conn");
const Register = require("./models/uregisters");
const File = require("./models/ufiles");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file,cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filePath = `images/${id}${ext}`;
        File.create({ filePath})
        .then(() => {
            cb(null, filePath);
        });
        
    }
});

const upload = multer({ storage: storage });
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
res.render("index")
 })
app.get("/registration", (req, res) => {
res.render("registration")
})
app.post("/registration", async (req, res) => {
    try {
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname :  req.body.lastname,
                gender : req.body.gender,
                email : req.body.email,
                phone : req.body.phone,
                city : req.body.city,
                address : req.body.address,
                password : password,
                confirmpassword : cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).send("Register successfully");
        }else{
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error);        
    }
})


app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", async(req, res) => {
    
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).send("Login successfully");
        }else{
            res.send("email or password are not match");
        }
        
    } catch (error) {
        res.status(400).send("invalid detail")
        
    }
})

app.get("/noticeb", (req, res) => {
    res.render("noticeb")
})
app.get("/noticeb1", (req, res) => {
    res.render("noticeb1")
})
app.get("/noticeb2", (req, res) => {
    res.render("noticeb2")
})
app.get("/noticeb3", (req, res) => {
    res.render("noticeb3")
})
app.get("/noticebnext", (req, res) => {
    res.render("noticebnext")
})
app.get("/q&a", (req, res) => {
    res.render("q&a")
})
app.get("/q&a1", (req, res) => {
    res.render("q&a1")
})
app.get("/q&a2", (req, res) => {
    res.render("q&a2")
})
app.get("/q&a3", (req, res) => {
    res.render("q&a3")
})
app.get("/q&anext", (req, res) => {
    res.render("q&anext")
})
app.get("/userfile", (req, res) => {
    res.render("userfile")
})
app.get("/update", (req, res) => {
    res.render("update")
})
app.get("/delete", (req, res) => {
    res.render("delete")
})
app.get("/upload", (req, res) => {
    res.render("upload")
})

app.post("/upload", upload.array('fileup'),(req, res) => {
   return res.send("file upload successfuly");
});

  
app.listen(port, () => {
     console.log(`server is running at port no ${port}`);
 })

