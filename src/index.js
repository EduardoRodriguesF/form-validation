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

// Email verifier
function verifyEmail() {
    const email = document.querySelector('#email input').value;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        document.querySelector('#email').className += ' valid';
        return true;
    }
    document.querySelector('#email').className += ' invalid';
    return false
}

// Password verifier
function verifyPassword() {
    const password = document.querySelector('#password input').value;
    const confPassword = document.querySelector('#confirm-password input').value;

    if (password === confPassword) {
        document.querySelector('#password').className += ' valid';
        document.querySelector('#confirm-password').className += ' valid';
        return true;
    }

    document.querySelector('#password .message').innerHTML = '* senha inválida'
    document.querySelector('#password').className += ' invalid';
    document.querySelector('#confirm-password').className += ' invalid';
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
            return
        }
    }
}

if (document.addEventListener) {
    document.addEventListener('invalid', function(event){
        event.target.className += ' invalid';
    }, true);
}