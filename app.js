const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app =express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
   
   res.sendFile(__dirname + "/signup.html")

})

app.post("/", function(req, res){
    const firstName = req.body.FirstName
    const lastName = req.body.LastName
    const emailAddress = req.body.EmailAddress

    const data = {
        members: [
            {
            email_address: emailAddress,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
            }
            }
        ]
    }

    var jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/18fcc6197b "
    const option = {
      method: "POST",
      auth:"sohaib11:32c53fcc6765e6b59928c05d06bceb87-us21"
    }
    const request = https.request(url, option , function(response){

        console.log(res.statusCode)
        if(response.statusCode === 200){
           res.sendFile(__dirname + "/seccuss.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
       res.on("data", function(data){
        // console.log(JSON.parse(data))
       })
    })


    request.write(jsonData)
    request.end()

})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.evn.PORT || 3000, function(){
    console.log("Server is running on 3000")
})


// apiKey
// 32c53fcc6765e6b59928c05d06bceb87-us21

// audience
// 18fcc6197b

