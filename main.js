class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) { 
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let result
        let prev = parseFloat(this.previousOperand)
        let curr = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                result = prev + curr
                break

            case '-':
                result = prev - curr
                break

            case 'x':
                result = prev * curr
                break

            case '÷':
                result = prev / curr
                break

            case '%':
                result = prev % curr
                break
            default:
                return
        }

        this.currentOperand = result
        this.previousOperand = ''
        this.operation = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimelNumber = stringNumber.split('.')[1]

        let integerDisplay
        if (isNaN(integerNumber)) { 
            integerDisplay = ''
        }else{
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimelNumber != null) {
            return `${integerDisplay}.${decimelNumber}`
        }else{
            return integerDisplay
        }
        
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand)
        if(this.operation !=null){
            this.previousOperandTextElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerHTML = ''
        }
    }
}






// ===Variables ===

// start
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
// end



// Call the calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)



// number button 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})


// operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

// equal button

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})



// all clear button
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


// delete button
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})






