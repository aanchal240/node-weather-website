const path=require('path')//core node module it is inbuilt
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))
const app=express()
const port=process.env.PORT || 3000

//Define paths for express config
const publicdirpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)
//setup static directory to serve
app.use(express.static(publicdirpath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'aanchal soni'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Aanchal soni'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
return res.send({
    error:'You must provide an address!'
})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastdata)=>{
          if(error){
              return res.send({error})
          }
          res.send({
              forecast:forecastdata,
              location,
              address:req.query.address
          })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
         error:'You must provide search term'
     })
    }
    console.log(req.query)
   res.send({
       products:[]
   })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Get help',
        name:'Aanchal ',
        helptext:'This is some helpful text'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'aanchal soni',
        errormessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'aanchal soni',
        errormessage:'Page not found'
    })
})
//challenge3
// app.get('/help',(req,res)=>{
//   res.send([{
//       name:'Aanchal'
//   },{
//   name:'amu'
//   }])
// }) 
//challenge2
//challenge1
// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })
app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})