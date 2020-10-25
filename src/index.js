// CPF mask
document.querySelector('#cpf input').addEventListener('input', function(e) {
    const num = e.target.value;
    const cpfAdjust = num.replace(/(\d{3})\.*(\d{3})\.*(\d{3})-*(\d{2})/, 
        function(regex, num1, num2, num3, num4) {
            return `${num1}.${num2}.${num3}-${num4}`;
        });

    e.target.value = cpfAdjust
});


// Phone mask
document.querySelector('#phone input').addEventListener('input', function(e) {
    const num = e.target.value;
    const phoneAdjust = num.replace(/\(*(\d{2})\)*(\d{4,5})-*(\d{4})/, 
        function(regex, DDD, num1, num2) {
            return `(${DDD}) ${num1}-${num2}`;
        });

    e.target.value = phoneAdjust
});

////////////////////////////////// VERIFIERS //////////////////////////////////

// Email verifier
function verifyEmail() {
    const email = document.querySelector('#email input').value;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        setStatus('email', true);
        return true;
    }
    setStatus('email', false);
    return false
}

// Password verifier
function verifyPassword() {
    const password = document.querySelector('#password input').value;
    const confPassword = document.querySelector('#confirm-password input').value;

    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) === false) {
        setStatus('password', false)
        setMessage('password', 'senha fraca');
        return false;
    }

    if (password === confPassword) {
        setStatus('password', true)
        setStatus('password-confirm', true)
        return true;
    }

    setMessage('password', 'senha inválida')
    setStatus('password', false)
    setStatus('password-confirm', false)
    return false;
}

// Validation
function validate(e) {
    const verifiers = {
        email: verifyEmail(),
        password: verifyPassword(),
    }
    for (i in verifiers) {
        if (!verifiers[i]) {
            e.preventDefault();
            return;
        }
    }
}

// Setters
function setStatus(field, stat) {
    const element = document.querySelector(`#${field}`);
    if (stat) {
        element.className += ' valid'
        element.classList.remove('invalid');
    }
    else {
        element.className += ' invalid'
        element.classList.remove('valid');
    }
}

function setMessage(field, message) {
    document.querySelector(`#${field} .message`).innerHTML = '* '+message;
}

if (document.addEventListener) {
    document.addEventListener('invalid', function(event){
        event.target.className += ' invalid';
    }, true);
}