function calculate(event){

    event.preventDefault();

    const op1 = parseFloat(document.getElementById("operand1").value); 
    const oper = document.getElementById("operator").value; 
    const op2 = parseFloat(document.getElementById("operand2").value);
    let result;

    if(isNaN(op1) || isNaN(op2) ){
        alert("Enter a valid number");
        return;
    }

    switch (oper){
        case '+':
            result = op1 + op2;
            break;
        case '-':
            result = op1 - op2;
            break;
        case '*':
            result = op1 * op2;
            break;
        case '/':
            if(op2 === 0){
                alert("Division by zero is not possible!")
                return;
            }
            result = op1 / op2;
            break;
        case '%':
            if(op2 === 0){
                alert("Division by zero is not possible!")
                return;
            }
            result = op1 % op2;
            break;
        case '^':
            result = op1 ** op2;
            break;
        default:
            alert("Enter a valid operator");
            return;
    }
    document.getElementById("result").textContent = `Result: ${result}`;
}
