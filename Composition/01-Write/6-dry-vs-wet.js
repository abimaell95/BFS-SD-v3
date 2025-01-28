// Ejemplo 1: Balance entre DRY y WET

// Muy WET (Write Everything Twice)
class UserValidator {
    validateNewUser(user) {
        if (!user.email) {
            throw new Error('Email is required');
        }
        if (!user.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        if (!user.name) {
            throw new Error('Name is required');
        }
        if (user.name.length < 2) {
            throw new Error('Name too short');
        }
    }

    validateExistingUser(user) {
        if (!user.email) {
            throw new Error('Email is required');
        }
        if (!user.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        if (!user.name) {
            throw new Error('Name is required');
        }
        if (user.name.length < 2) {
            throw new Error('Name too short');
        }
    }
}

// Muy DRY (puede ser sobre-abstracto)
class OverlyDryValidator {
    validate(entity, rules) {
        return Object.entries(rules).every(([field, validations]) => {
            return validations.every(validation => 
                validation.check(entity[field], entity));
        });
    }
}

// Balance adecuado
class BalancedValidator {
    validateUser(user, isNew = false) {
        this.validateEmail(user.email);
        this.validateName(user.name);
        
        if (isNew) {
            this.validatePassword(user.password);
        }
    }

    validateEmail(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        if (!email.includes('@')) {
            throw new Error('Invalid email format');
        }
    }

    validateName(name) {
        if (!name) {
            throw new Error('Name is required');
        }
        if (name.length < 2) {
            throw new Error('Name too short');
        }
    }

    validatePassword(password) {
        if (!password) {
            throw new Error('Password is required');
        }
        if (password.length < 8) {
            throw new Error('Password too short');
        }
    }
}

// Ejemplo 2: Duplicación aceptable por claridad

// Caso donde la duplicación mejora la claridad
class OrderProcessor {
    // Estas validaciones son similares pero representan reglas de negocio diferentes
    validateShippingAddress(address) {
        if (!address.street || !address.city || !address.country) {
            throw new Error('Invalid shipping address');
        }
        // Validaciones específicas para envío
        if (!address.zipCode) {
            throw new Error('Shipping address requires ZIP code');
        }
    }

    validateBillingAddress(address) {
        if (!address.street || !address.city || !address.country) {
            throw new Error('Invalid billing address');
        }
        // Validaciones específicas para facturación
        if (!address.taxId) {
            throw new Error('Billing address requires tax ID');
        }
    }
}

// Ejemplo 3: Abstracción pragmática

class PaymentProcessor {
    // Abstracciones específicas para cada tipo de pago
    // En lugar de una única abstracción genérica
    processCreditCardPayment(payment) {
        this.validateCreditCard(payment);
        return this.executeCreditCardPayment(payment);
    }

    processPayPalPayment(payment) {
        this.validatePayPal(payment);
        return this.executePayPalPayment(payment);
    }

    processCryptoPayment(payment) {
        this.validateCrypto(payment);
        return this.executeCryptoPayment(payment);
    }

    // Métodos de validación específicos
    validateCreditCard(payment) {
        if (!payment.cardNumber || !payment.cvv) {
            throw new Error('Invalid credit card details');
        }
    }

    validatePayPal(payment) {
        if (!payment.email) {
            throw new Error('PayPal email required');
        }
    }

    validateCrypto(payment) {
        if (!payment.walletAddress) {
            throw new Error('Crypto wallet address required');
        }
    }
} 