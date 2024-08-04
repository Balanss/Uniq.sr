import express, { urlencoded } from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import axios from 'axios'
import fileUpload from 'express-fileupload'
import FormData from 'form-data'
import dotenv from "dotenv";


dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload())


app.post("/api/resume", async (req, res) => {
  if (!req.body) {
      return res.status(400).json({ message: "Invalid request" });
  }

  try {
      const { name,  lastName, email, phone, message,Adres,DateOfBirth,Question1,Question2,Question3,Question4,message2 } = req.body;

       // Check if all required fields are present
       if (!name || !lastName || !email || !phone || !message || !Adres || !DateOfBirth || !Question1 || !Question2 || !Question3 || !Question4 || !message2) {
        return res.status(400).json({ message: "Missing required fields" });
    }
      
      const formData = new FormData();
      formData.append('name', name);
        formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('message', message);
        formData.append('Adres', Adres);
        formData.append('DateOfBirth', DateOfBirth);
        formData.append('Question1', Question1);
        formData.append('Question2', Question2);
        formData.append('Question3', Question3);
        formData.append('Question4', Question4);
        formData.append('message2', message2);


      if (req.files && req.files.file) {
          const file = req.files.file;
          formData.append('file', file.data, {
              filename: file.name,
              contentType: file.mimetype
          });
      }

      const response = await axios.post(process.env.WEBHOOK_URL, formData, {
          headers: {
              ...formData.getHeaders()
          }
      });
        console.log(res.status)
      res.status(200).send(response.data);
  } catch (err) {
      console.error('Error processing resume:', err);
      res.status(500).send(err.message);
  }
});


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
