const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");



const mongoUrl = "mongodb+srv://admin:<admin>@atlascluster.clkighc.mongodb.net/"