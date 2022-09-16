const express=require("express");
const bodyParser=require("body-parser");
const mailchimp= require("@mailchimp/mailchimp_marketing");


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mailchimp.setConfig({
  apiKey:"207264b262b043e350d2104392f629f2-us8",
  server:"us8"
});


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
  const listId="9c7b1f7078";
  const subscribingUser = {
       firstName: req.body.fName,
       lastName: req.body.lName,
       email: req.body.email
  };

  async function run() {
    try{
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
    }


      });

      console.log(response);


      res.sendFile(__dirname + "/success.html");
       } catch (e) {
      res.sendFile(__dirname + "/failure.html");
       }
   }

   run();
 })

 app.post("/failure", function(req, res) {
   res.redirect("/");
 })


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.")
})

//API Key
//207264b262b043e350d2104392f629f2-us8

//List Id
//9c7b1f7078
