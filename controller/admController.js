const express = require('express');
const router = express.Router()
const adm = require('../Database/adm')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    
})