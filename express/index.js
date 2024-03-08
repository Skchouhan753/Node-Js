const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 8080;

const userdata = JSON.parse(fs.readFileSync('./db.json','utf-8'))

// console.log(userdata)

const data = JSON.parse(fs.readFileSync('./data.json','utf-8'))
const products = data.products;
// console.log(products)

//middleware

app.use(express.json())  // for post req sending json data

const {logger} = require('./middleware');


// app.use((req,res,next)=>{
//     console.log(req.ip,req.url)
//     next()
// })
// const logger = ()=>[

// ]


app.get('/',logger,(req,res)=>{
    // console.log(req);
    // res.send(`<h1>hello</h1>`);  // to send html
    // res.sendFile('')  // to send file
    // res.status(200); // to send status
    // res.json(data); // to send json
    // res.set()  // to set headers
})


app.get('/products',(req,res)=>{
    // const id = +req.params.id
    // console.log(req.params)
    
    res.json(products)
})

app.get('/products/:id',(req,res)=>{
    const id = +req.params.id
    // console.log(req.params)
    const produ = products.find((prod)=>{
        return prod.id === id
    })
    res.json(produ)
})


app.get('/products/:id',(req,res)=>{
    const id = +req.params.id
})

app.post('/add',(req,res)=>{  
    console.log(req.body);
    products.push(req.body)
    res.json(req.body)
})

app.put('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const prodIdx = products.findIndex(prod=>prod.id===id)
    products.splice(prodIdx,1,{...req.body,id:id})
    res.json(products);
})

// app.patch('/products/:id',(req,res)=>{
//     const id = +req.params.id;
//     const prodIdx = products.findIndex(prod=>prod.id==id)
//     const product = products[prodIdx];
//     products.splice(prodIdx,1,{...product,...req.body})
//     res.json({"msg":"success"});
// })


app.patch('/products/:id', (req, res) => {
    const id = +req.params.id;
    const prodIdx = products.findIndex(prod => prod.id === id);

    if (prodIdx === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    const currentProduct = products[prodIdx];

    // Create a new object for the updated product, merging with the request body
    const updatedProduct = {
        ...currentProduct,
        ...req.body
    };

    // Update the product in the products array
    products[prodIdx] = updatedProduct;

    res.json({ msg: "Product updated successfully", product: updatedProduct });
});

app.delete('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const prodIdx = products.findIndex(prod=>prod.id===id)
    
    products.splice(prodIdx,1)
    res.json({ msg: "Product updated successfully" });
})


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})