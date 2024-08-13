const express = require('express')
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;
const card = [];
const config = require("./config/config.json");
const { Sequelize, QueryTypes} = require("sequelize");
const sequelize = new Sequelize(config.development);
const bcrypt = require('bcrypt');
const session = require("express-session");
const flash = require("express-flash");



// set up storage and file filter
const storage =
    multer ({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/'); // Untuk menyimpan upload file
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            }
    })
});



app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "./view"))

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")))
app.use(express.urlencoded({ extended: true }))
// app.use(express.json()) 

app.use(
    session({
        name: "mysession",
        secret: "rahasia",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, //1 hari
        },
    })
);

app.use((req, res, next) =>{
    res.locals.isLogin = req.session.isLogin
    next()
})

app.use(flash());

//route
app.get('/', renderIndex)
app.get('/contact', renderContact)
app.get('/project', renderProject)
app.get('/testimonials', renderTestimonials)
app.get("/project-detail/:blog_id", renderProjectDetail);
app.get("/edit/:blog_id", renderEditProject); //buat di project-edit.hbs
app.get("/delete/:blog_id", renderDeleteProject);
app.get("/login", loginView);
app.get("/register", registerView);

app.post("/project", storage.single('image'), addProject)
app.post("/edit/:blog_id", storage.single('image'), editProject)// buat di project.hbs
app.post("/login", login);
app.post("/register", register);
app.get("/logout", logout);

// ========== LOGIN ========== //
function loginView(req, res) {
    res.render("login");
}

async function login(req, res) {
    const { email, password } = req.body;
    
    const query = `SELECT * FROM users WHERE email = $1`
    console.log("ini data server", email, password);
    

    const user = await sequelize.query( query, {
        type: QueryTypes.SELECT,
        bind: [email]
    });

    if (!user) {
        req.flash("danger", "Email is not found!");
        return res.redirect("/login");
    }
    const users = user[0]

    const isPasswordValid = await bcrypt.compare(password, users.password);

    if (!isPasswordValid) {
        req.flash("danger", "Password is wrong!");
        return res.redirect("/login");
    }

    req.session.user = user[0]
    req.session.isLogin = true;
    req.session.save((err) => {
        if(err) {
            console.log(err)
            return res.redirect("/login")
        }
        req.flash("success", "Login berhasil!");
        res.redirect("/");
        
    })
    

}
//==============================//
//========== REGISTER ==========//
function registerView (req, res) {
    res.render("register")
}

async function register(req, res) {
    const {email, name, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const query = `INSERT INTO public.users(
	name, email, password)
	VALUES ('${name}', '${email}', '${hashedPassword}');`

    try {
        await sequelize.query(query, {type: QueryTypes.INSERT})
        res.redirect("/login");
    }catch(error){
        console.log(error)
    }

}
//==============================//

async function logout(req, res) {
    req.session.destroy(function(err) {
        if (err) return console.error("Logout failed!");

        console.log("Logout success!");
        res.redirect("/");
    });
}


function renderProject(req, res) {
    const isLogin = req.session.isLogin
    if (!isLogin) {
        return res.redirect("/register")
    }

    const renderCard = card
    res.render("project", {
        data: renderCard
    })
}

function addProject(req, res) {
    const php = '<img src="../assets/php.svg">'
    const javascript = '<img src="../assets/js.svg">'
    const java = '<img src="../assets/java.svg">'
    const python = '<img src="../assets/python.svg">'

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Uploaded Image Path:', image);

    console.log(req.body)
    const blog = {
        id: card.length + 1,
        titles: req.body.titles,
        start: req.body.start,
        end: req.body.end,
        content: req.body.content,
        php: req.body.php ? php : null,
        javascript: req.body.javascript ? javascript : null,
        java: req.body.java ? java : null,
        python: req.body.python ? python : null,
        image: image
    }

    card.push(blog)
    res.redirect("/project")
}

function renderIndex(req, res) {
    const isLogin = req.session.isLogin
    console.log(req.session)
    if (!isLogin) {
        return res.redirect("/register")
    }
    res.render("index")
}

function renderContact(req, res) {
    const isLogin = req.session.isLogin
    if (!isLogin) {
        return res.redirect("/register")
    }
    res.render("contact")
}


function renderTestimonials(req, res) {
    const isLogin = req.session.isLogin
    if (!isLogin) {
        return res.redirect("/register")
    }
    res.render("testimonials")
}

function renderProjectDetail(req, res) {
    const id = req.params.blog_id;
    const blogs = card.find(blogs => blogs.id == id);
    console.log(blogs);

    res.render("project-detail", {
        data: blogs
    });
};

function editProject(req, res) {
    const php = '<img src="../assets/php.svg">'
    const javascript = '<img src="../assets/js.svg">'
    const java = '<img src="../assets/java.svg">'
    const python = '<img src="../assets/python.svg">'

    const id = req.params.blog_id
    const newProject = {
        id: id,
        titles: req.body.titles,
        start: req.body.start,
        end: req.body.end,
        content: req.body.content,
        php: req.body.php ? php : null,
        javascript: req.body.javascript ? javascript : null,
        java: req.body.java ? java : null,
        python: req.body.python ? python : null,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };
    const index = card.findIndex(blogs => blogs.id == id);

    card[index] = newProject;
    res.redirect("/project")
}
function renderEditProject(req, res) {
    const id = req.params.blog_id;
    const blogs = card.find(blogs => blogs.id == id);
    console.log(blogs);

    res.render("project-edit", {
        data: blogs
    })
}


function renderDeleteProject(req, res) {
    const id = req.params.blog_id;
    const index = card.findIndex(blogs => blogs.id == id);

    card.splice(index, 1);
    res.redirect("/project");
}


app.listen(port, async () => {
    await sequelize.sync()
    console.log(`server berjalan di port ${port}`)
})