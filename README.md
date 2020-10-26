<h1 align="center">Form Validation</h1>
<p align="center">Form validation using RegEx</p>

<p align="center">
    <a href="#-about">About</a> •
    <a href="#-technologies">Technologies</a> •
    <a href="#-regex-patterns">RegEx patterns</a> •
    <a href="#-usage">Usage</a> •  
    <a href="#-license">License</a>
</p>

## 🤔 About
Idea taken from [app-ideas repository](https://github.com/florinpop17/app-ideas). Form validation on front-end using only JavaScript and RegEx.

## 🛠️ Technologies
- HTML
- CSS
- JavaScript
    - RegEx

## ⚙️ RegEx patterns
CPF - `/(\d{3})\.*(\d{3})\.*(\d{3})-*(\d{2})/`

Phone - `/\(*(\d{2})\)*(\d{4,5})-*(\d{4})/`

Email - ```/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/```

Password - `/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/`

## 📋 Usage
There is no server running, so in order to use it you just need to open `index.html` and test it!

Or, you can quickly open it on [Codepen](https://codepen.io/eduaaado/pen/YzWZGjb).

## 📜 License
This project is under [MIT License](https://github.com/EduardoRodriguesF/form-validation/blob/main/LICENSE).