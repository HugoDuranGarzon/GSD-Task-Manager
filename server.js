//Express import and port definition
const express = require('express');
const app = express();
const PORT = 3000;

//Main route definition
app.get('/', (req, res) => {
    res.send('Hello world from express!');
});


//Server initialization on port 3000
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});

//Greeting function
app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    const language = req.query.language || 'en';

    if(language === 'en'){
        res.send(`Hello, ${name}!`);
    } else if (language === 'es'){
        res.send(`¡Hola ${name}!`);
    } else {
        res.send(`language not supported`);
    }
});

//Even or odd function

app.get('/evenorodd/:num', (req,res) => {
    const num = req.params.num;
    const isEven = num % 2 === 0;

    res.json({number: num, isTheNumberEven: isEven});
})