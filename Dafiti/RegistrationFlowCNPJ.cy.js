import dafiti from "../../fixtures/RegisterDafiti.json"

const getModulo = (dividendo, divisor) => {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
}

const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getNumerosRandomicos = (total) => {
    let numbers = [];
    for (let i = 0; i < total; i++) {
        numbers[i] = getRandomNumberBetween(1, 9);
    }
    return numbers;
}


const getDigitoVerificadorCpf = (numeros = []) => {
    let digito = 0;
    let arraySize = numeros.length + 1;

    numeros.map((numero, index) => {
        digito += numero * (arraySize - index);
    });

    digito = 11 - (getModulo(digito, 11));
    return digito >= 10 ? 0 : digito;
}

const gerarCpfFake = () => {
    let numeros = getNumerosRandomicos(9);
    numeros.push(getDigitoVerificadorCpf(numeros));
    numeros.push(getDigitoVerificadorCpf(numeros));

    return numeros.join('');
}

const CpfConcat = "SreQAGuardians" + gerarCpfFake() + "@hotmail.com"

const cnpjGerar = cnpj()
// Função para gerar números randômicos
function gera_random(n) {
    var ranNum = Math.round(Math.random() * n);
    return ranNum;
}

// Função para retornar o resto da divisao entre números (mod)
function mod(dividendo, divisor) {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
}

function cnpj() {
    var n = 9;
    var n1 = gera_random(n);
    var n2 = gera_random(n);
    var n3 = gera_random(n);
    var n4 = gera_random(n);
    var n5 = gera_random(n);
    var n6 = gera_random(n);
    var n7 = gera_random(n);
    var n8 = gera_random(n);
    var n9 = 0;//gera_random(n);
    var n10 = 0;//gera_random(n);
    var n11 = 0;//gera_random(n);
    var n12 = 1;//gera_random(n);
    var d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    var d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;
    return '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2;
}

describe('Must perform the user registration flow', () => {


    it('Visit the website Dafiti', () => {
        cy.clearCookies()
        cy.wait(500)
        cy.visit('https://www.dafiti.com.br')
    })
    it('Access the login modal', () => {

        cy.get('.header-login-link').click({ force: true })
    })

    it('Access the option: I want to register', () => {
        cy.get(':nth-child(2) > .accordion-link').click({ force: true })
    })

    it('Choose option: Legal Entity ', () => {
        cy.get('#RegistrationForm_customer_personality_1').click()
    })
    it('Fill in the registration fields', () => {
        cy.get('#RegistrationForm_first_name').type('Empresa Teste')
        cy.get('#RegistrationForm_state_registration_exempt').click()
        cy.get('#RegistrationForm_state_registration_exempt').click()
        cy.get('#RegistrationForm_state_registration').type('388108598269')
        cy.get('#RegistrationForm_email').type(CpfConcat)
        cy.get('#RegistrationForm_tax_identification').type(cnpjGerar)
    })
    it('Inserting password', () => {
        cy.get('#form-customer-account-password').type(dafiti.senha)
        cy.get('#RegistrationForm_password2').type(dafiti.senha)
    })

    it('Triggering Create Account option', () => {
        cy.get('#customer-account-create').click({ force: true })
        cy.wait(2000)
    })
    it('Validate account creation message', () => {
        cy.wait(2000)
        cy.get('.disclaimer > strong').should('be.visible', 'Importante')
    })

})
