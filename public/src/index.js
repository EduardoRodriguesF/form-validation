// Phone mask
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
