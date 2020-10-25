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
    const phoneAdjust = num.replace(/\(*(\d{2})\)*(\d{5})-*(\d{4})/, 
        function(regex, DDD, num1, num2) {
            return `(${DDD}) ${num1}-${num2}`;
        });

    e.target.value = phoneAdjust
});

////////////////////////////////// VERIFIERS //////////////////////////////////

// CPF verifier
function verifyCPF() {
    const cpf = document.querySelector('#cpf input').value;
    if (/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/.test(cpf)) {
        return setStatus('cpf', true)
    }
    return setStatus('cpf', false);
}

// Phone verifier
function verifyPhone() {
    let phone = document.querySelector('#phone input').value;
    if (/\((\d{2})\)\s(\d{5})-(\d{4})/.test(phone)) {
        return setStatus('phone', true);
    } else {
        phone = phone.replace(/\(*(\d{2})\)*(\d{4,5})-*(\d{4})/, 
            function(regex, DDD, num1, num2) {
                return `(${DDD}) ${num1}-${num2}`;
            });;
        
        document.querySelector('#phone input').value= phone;

        if (/\((\d{2})\)\s(\d{4,5})-(\d{4})/.test(phone)) {
            return setStatus('phone', true);
        }
        return setStatus('phone', false);
    }
}


// Email verifier
function verifyEmail() {
    const email = document.querySelector('#email input').value;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return setStatus('email', true);
    }
    return setStatus('email', false);
}

// Password verifier
function verifyPassword() {
    const password = document.querySelector('#password input').value;
    const confPassword = document.querySelector('#confirm-password input').value;

    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) === false) {
        setMessage('password', 'senha fraca');
        return setStatus('password', false)
    }

    if (password === confPassword) {
        setStatus('password', true)
        return setStatus('password-confirm', true)
    }

    setMessage('password', 'senha inválida')
    setStatus('password', false)
    return setStatus('password-confirm', false)
}

// Validation
function validate(e) {
    const verifiers = {
        cpf: verifyCPF(),
        phone: verifyPhone(),
        email: verifyEmail(),
        password: verifyPassword(),
    }
    console.log(verifiers)
    e.preventDefault();
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
    return stat;
}

function setMessage(field, message) {
    document.querySelector(`#${field} .message`).innerHTML = '* '+message;
}

if (document.addEventListener) {
    document.addEventListener('invalid', function(event){
        event.target.className += ' invalid';
    }, true);
}