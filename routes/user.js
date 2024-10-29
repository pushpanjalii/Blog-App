const express = require('express')
const router = express.Router();
const User = require('../models/userr.js')
const bcrypt = require('bcrypt')
const post = require('../models/post.js')
const comment = require('../models/comment.js')

