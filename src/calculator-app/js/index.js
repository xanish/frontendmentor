class Calculator {
    constructor(screen) {
        this.screen = screen;
        this.register = '0';
        this.result = null;
        this.previousOperator = null;
        this.currentOperator = null;
    }

    display(result) {
        this.screen.innerText = (+result).toLocaleString();
    }

    append(number) {
        if (number === '.' && this.register.toString().includes('.')) {
            return;
        }
        this.register = this.register === '0' ? (number === '.' ? '0.' : number) : this.register + number;
        this.display(this.register);
    }

    operate(operator) {
        [this.currentOperator, this.previousOperator] = [operator, this.currentOperator];
        if (this.previousOperator == null) {
            this.result = +this.register;
        }
        else {
            this.result = this.compute();
        }
        this.register = '0';
    }

    equals() {
        [this.currentOperator, this.previousOperator] = ['equals', this.currentOperator];
        if (this.previousOperator == null) {
            this.result = +this.register;
        }
        else {
            this.result = this.compute();
        }
        this.display(this.result.toString());
        this.register = '0';
    }

    compute() {
        switch(this.previousOperator) {
            case 'add':
                this.result += +this.register;
                break;
            case 'subtract':
                this.result -= +this.register;
                break;
            case 'multiply':
                this.result *= +this.register;
                break;
            case 'divide':
                this.result /= +this.register;
                break;
        }
        this.display(this.result.toString());

        return this.result;
    }

    delete() {
        if (this.register === '0') {
            return;
        }
        this.register = this.register.slice(0, -1);
        if (this.register === '') {
            this.register = '0';
        }
        this.display(this.register);
    }

    reset() {
        this.register = '0';
        this.result = null;
        this.previousOperator = null;
        this.currentOperator = null;
        this.display('0');
    }
}

const themeBtns = document.querySelectorAll('input[type="radio"]');
const numberBtns = document.querySelectorAll('[data-number]');
const addBtn = document.querySelector('[data-operator="add"]');
const subtractBtn = document.querySelector('[data-operator="subtract"]');
const multiplyBtn = document.querySelector('[data-operator="multiply"]');
const divideBtn = document.querySelector('[data-operator="divide"]');
const resetBtn = document.querySelector('[data-operator="reset"]');
const equalsBtn = document.querySelector('[data-operator="equals"]');
const deleteBtn = document.querySelector('[data-operator="delete"]');

const screen = document.querySelector('.calculator-screen');
const calculator = new Calculator(screen);

themeBtns.forEach(themeBtn => {
    themeBtn.addEventListener('click', () => {
        document.body.className = 'theme-' + themeBtn.value;
        document.getElementById('toggle-slider').className = 'slider slider--theme-' + themeBtn.value;
        setPreferredTheme('theme-' + themeBtn.value);
    });
});

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', () => {
        calculator.append(numberBtn.getAttribute('data-number'));
    });
});

addBtn.addEventListener('click', () => {
    calculator.operate('add');
});

subtractBtn.addEventListener('click', () => {
    calculator.operate('subtract');
});

multiplyBtn.addEventListener('click', () => {
    calculator.operate('multiply');
});

divideBtn.addEventListener('click', () => {
    calculator.operate('divide');
});

equalsBtn.addEventListener('click', () => {
    calculator.equals();
});

resetBtn.addEventListener('click', () => {
    calculator.reset();
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
});

window.addEventListener('load', () => {
    const theme = getPreferredTheme();
    document.body.className = theme;
    document.getElementById('toggle-slider').className = 'slider slider--' + theme;
});

function getPreferredTheme() {
    let defaultTheme = 'theme-1';
    let preferredTheme = null;
    let savedTheme = null;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        preferredTheme = 'theme-3';
    }
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        preferredTheme = 'theme-2';
    }

    try {
        savedTheme = localStorage.getItem('prefersTheme');
    } catch(e) {
        console.log('localStorage not available.');
    }

    return savedTheme == null ? preferredTheme == null ? defaultTheme : preferredTheme : savedTheme;
}

function setPreferredTheme(theme) {
    try {
        localStorage.setItem('prefersTheme', theme);
    } catch(e) {
        console.log('localStorage not available.');
    }
}
