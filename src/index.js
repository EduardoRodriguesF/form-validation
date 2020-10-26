// CPF mask
document.querySelector('#cpf input').addEventListener('input', function(e) {
    const num = e.target.value; // Gets input value

    // Reform input value into a regex pattern
    const cpfAdjust = num.replace(/(\d{3})\.*(\d{3})\.*(\d{3})-*(\d{2})/, 
        function(regex, num1, num2, num3, num4) {
            return `${num1}.${num2}.${num3}-${num4}`;
        });
    e.target.value = cpfAdjust
});


// Phone mask
document.querySelector('#phone input').addEventListener('input', function(e) {
    const num = e.target.value; // Gets input value

    // Reform input value into a regex pattern
    const phoneAdjust = num.replace(/\(*(\d{2})\)*(\d{5})-*(\d{4})/, 
        function(regex, DDD, num1, num2) {
            return `(${DDD}) ${num1}-${num2}`;
        });
    e.target.value = phoneAdjust
});

////////////////////////////////// VERIFIERS //////////////////////////////////

// CPF verifier
/**
 * It will compare user's CPF to a regex to make sure it is valid.
 * @return {Boolean} True if valid, false if invalid.
 */
function verifyCPF() {
    // Gets input value
    const cpf = document.querySelector('#cpf input').value;

    // Test input value against regex pattern
    if (/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/.test(cpf)) {
        return setStatus('cpf', true)
    }

    // Return false if it does not match
    return setStatus('cpf', false);
}

// Phone verifier
/**
 * It will compare user's phone to a regex to make sure it is valid.
 * @return {Boolean} True if valid, false if invalid.
 */
function verifyPhone() {
    // Gets input value
    let phone = document.querySelector('#phone input').value;

    // Test input value against regex
    if (/\((\d{2})\)\s(\d{5})-(\d{4})/.test(phone)) {
        return setStatus('phone', true);
    } else {
        // Reforming into an old pattern to see if it matches
        phone = phone.replace(/\(*(\d{2})\)*(\d{4,5})-*(\d{4})/, 
            function(regex, DDD, num1, num2) {
                return `(${DDD}) ${num1}-${num2}`;
            });;
        
        // Substitute reformed pattern in input value
        document.querySelector('#phone input').value = phone; 

        // Check if number really fits in old pattern
        if (/\((\d{2})\)\s(\d{4,5})-(\d{4})/.test(phone)) {
            return setStatus('phone', true);
        }
        return setStatus('phone', false);
    }
}


// Email verifier
/**
 * It will compare user's Email to a regex to make sure it is valid.
 * @return {Boolean} True if valid, false if invalid.
 */
function verifyEmail() {
    // Gets input value
    const email = document.querySelector('#email input').value;

    // Test input value against regex
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return setStatus('email', true);
    }
    return setStatus('email', false);
}

// Password verifier
/**
 * It will compare user's Password to a regex to make sure it is strong enough, and then compares to `confirm-password` to certify user didn't typo his password.
 * @return {Boolean} True if valid, false if invalid.
 */
function verifyPassword() {
    // Get password and confirm password inputs
    const password = document.querySelector('#password input').value;
    const confPassword = document.querySelector('#confirm-password input').value;

    // Checks its strength (8 characters, capitalized letters and numbers)
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) === false) {
        setMessage('password', 'senha fraca');
        return setStatus('password', false)
    }

    // Check if password matches confirmation, avoiding typos
    if (password === confPassword) {
        setStatus('password', true)
        return setStatus('password-confirm', true)
    }
    
    // In case it does not match, user is warned.
    setMessage('password', 'senha inválida')
    setStatus('password', false)
    return setStatus('password-confirm', false)
}

// Validation
/**
 * Uses all previous verifiers, store them into an object and checks if there are False returns, meaning the submition is not valid. 
 * @param {Event} e Event
 */
function validate(e) {
    // Uses all verifiers. It is an object so we can check for everyone and highlight all the fields user 
    // needs to fix before actually checking for false values and cancelling submition.
    const verifiers = {
        cpf: verifyCPF(),
        phone: verifyPhone(),
        email: verifyEmail(),
        password: verifyPassword(),
    }
    
    // Searchs for a False value in the object's keys.
    for (i in verifiers) {
        if (!verifiers[i]) {
            e.preventDefault();
            return;
        }
    }
}

// Setters
/**
 * Set new status, either 'valid' or 'invalid' to a specified field
 * @param {String} field Input-block id (with no hashtag #)
 * @param {Boolean} stat The state of the field, being true for 'valid' and false for 'invalid'
 * @return {Boolean} The same value as status, so you can return it back when using inside functions to avoid repetition
 */
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

/**
 * Set warning message next to field's name to communicate user what is wrong with his submition. This message will only appear once `input-block` has `.invalid` class.
 * @param {String} field Input-block id (with no hashtag #)
 * @param {String} message The message you want to display
 */
function setMessage(field, message) {
    document.querySelector(`#${field} .message`).innerHTML = '* '+message;
}