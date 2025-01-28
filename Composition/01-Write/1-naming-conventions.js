// Ejemplo 1: Evolución de nombres genéricos a semánticos
// Malo
const d = new Date();
const n = 'John';
const arr = ['apple', 'banana'];
const fn = (x) => x * 2;

// Mejor
const currentDate = new Date();
const userName = 'John';
const fruits = ['apple', 'banana'];
const doubleNumber = (number) => number * 2;

// Ejemplo 2: Convenciones según tipo
// Variables: camelCase para valores mutables, UPPER_CASE para constantes
let activeUserCount = 0;
const MAX_LOGIN_ATTEMPTS = 3;
const DEFAULT_SETTINGS = Object.freeze({
    theme: 'light',
    notifications: true
});

// Funciones: verbos que describen acción
function validateUserInput(input) {
    // ...
}

function calculateTotalPrice(items) {
    // ...
}

// Clases: PascalCase y sustantivos
class UserRepository {
    // ...
}

class PaymentProcessor {
    // ...
}

// Ejemplo 3: Contextos de aplicación
class OrderProcessor {
    // Contexto claro: 'order' es redundante aquí
    calculateTotal(items) { // No: calculateOrderTotal
        return items.reduce((sum, item) => sum + item.price, 0);
    }

    // Contexto específico necesario
    async processPayment(orderId, paymentDetails) {
        // El contexto 'order' es necesario aquí
        const order = await this.findOrder(orderId);
        // ...
    }
} 