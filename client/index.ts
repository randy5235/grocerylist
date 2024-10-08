import express from 'express';
import path from 'path';


const app = express();
// serve up production assets
app.use(express.static(path.join(__dirname, './build/')));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
// app.get('*', (req, res) => {

// res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });
// if not in production use the port 5000
const PORT = process.env.PORT || 3000;
console.log('server started on port:',PORT);
app.listen(PORT);