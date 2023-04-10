import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './mongodb/connect.js'
import Product from './mongodb/models/product.js';

// Routes
import loginRoute from './routes/loginRoute.js'
import signUpRoute from './routes/signUpRoute.js'
import addProduct from './routes/addProduct.js'
import fetchUser from './routes/fetchUser.js';
import fetchAllUserProducts from './routes/fetchAllUserProducts.js';
import fetchAllProducts from './routes/fetchAllProducts.js'

const app = express();
app.use(cors());


const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origins:["*"],
    handlePreflightRequest: (req,res)=>{
      res.writeHead(200, {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,POST",
        "Access-Control-Allow-Headers":"my-custom-header",
        "Access-Control-Allow-Credentials": true
      });
      res.end();
    }
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('bidproduct',(data)=>{
    findProduct(data._id, data.last_bidder, data.biddedPrice)
    socket.broadcast.emit('fetchData',()=>console.log('line 45'))
    console.log(data);
  })
  socket.on('productAdded',()=>{
    socket.broadcast.emit('newProductAdded')
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

dotenv.config();

//function to find a product and update its current price
const findProduct = async (_id, last_bidder, new_price)=> {
  const filter = {_id:_id}
  const update = {
    last_bidder:last_bidder,
    current_price:new_price
  }
  const productsArray = await Product.findOneAndUpdate(filter, update, {
    new: true
  });
  console.log(productsArray); 
}

// app.use(cors());
app.use(bodyParser.json())
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/login', loginRoute)
app.use('/api/v1/signup', signUpRoute)
app.use('/api/v1/getuser', fetchUser)
app.use('/api/v1/addproduct', addProduct)
app.use('/api/v1/fetchAllUserProducts', fetchAllUserProducts)
app.use('/api/v1/fetchAllProducts', fetchAllProducts)

app.get('/', async(req,res)=>{
    res.status(201).send('hello from auction hub')
})

const startServer = async ()=>{

    try {
        connectDB(process.env.MONGODB_URL)
    } catch (error) {
        
    }

    server.listen(8080, ()=>{
        console.log('server started')
    })
}
startServer();