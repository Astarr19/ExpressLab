"use strict";
const express = require('express');
const cart = express.Router();

let myCart = [
    {id: 1, product: 'Five Dollar Foot Long', price: 4.99, quantity: 4},
    {id: 2, product: 'Snickers', price: 3.50, quantity: 36},
    {id: 3, product: 'Furniture', price: 99.32, quantity: 1},
    {id: 4, product: 'Bouncy Ball', price: 0.10, quantity: 200},
]

cart.get('/', (req, res)=>{
    let filtered = [...myCart];
    if (req.query.maxPrice){
        filtered = filtered.filter((item)=>item.price <= parseInt(req.query.maxPrice))
    };
    if (req.query.prefix){
        filtered = filtered.filter((item)=>item.product.startsWith(req.query.prefix));
    };
    if (req.query.pageSize){
        let limited = [...filtered];
        while (limited.length > req.query.pageSize) {
            limited.splice(limited.length, 1);
        }
        res.json(limited);
        res.status(200);
        res.end();
    } else {
        res.json(filtered);
        res.status(200);
        res.end();
    }
})
cart.get('/:id', (req, res)=>{
    let item = myCart.find((current)=>{
        if (current.id === parseInt(req.params.id)){;
            return current;
        }
    })
    res.json(item);
    res.status(200);
    res.end();
})
cart.post('/', (req,res)=>{
    console.log(req.body);
    let item = {
        id: myCart.length + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    };
    myCart.push(item);
    res.json(item);
    res.status(201);
    res.end();
})
cart.put('/:id', (req,res)=>{
    if(req.params.id <= myCart.length && req.params.id > 0){
        let item = {
            id: parseInt(req.params.id),
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        };
        myCart.splice((req.params.id-1),1,item);
        res.json(item);
        res.status(200);
        res.end();
    } else {
        res.json({message: "not a valid id"})
        res.status(400);
        res.end();
    }
})
cart.delete('/:id', (req,res)=>{
    if(req.params.id <= myCart.length && req.params.id > 0){
        myCart.splice((req.params.id-1),1);
        res.status(204);
        res.end();
    } else {
        res.json({message: "not a valid id"})
        res.end()
    }
})
module.exports = cart;