// Ejemplo 1: Clase que está más interesada en los datos de otra clase
class OrderReport {
    generateReport(order) {
        // Esta clase está más interesada en los datos de Order que en sus propios datos
        let report = 'Order Report\n';
        report += '=============\n';
        
        // Accede excesivamente a los datos de Order
        report += `Order ID: ${order.id}\n`;
        report += `Date: ${order.date}\n`;
        report += `Customer: ${order.customer.firstName} ${order.customer.lastName}\n`;
        report += `Email: ${order.customer.email}\n`;
        
        // Cálculos que deberían estar en la clase Order
        let subtotal = 0;
        order.items.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        const tax = subtotal * order.taxRate;
        const discount = order.customer.isVIP ? subtotal * 0.1 : 0;
        const total = subtotal + tax - discount;
        
        report += `\nSubtotal: $${subtotal.toFixed(2)}\n`;
        report += `Tax: $${tax.toFixed(2)}\n`;
        report += `Discount: $${discount.toFixed(2)}\n`;
        report += `Total: $${total.toFixed(2)}\n`;
        
        return report;
    }
}

// Ejemplo 2: Clase que realiza cálculos que deberían estar en otra clase
class ShippingCalculator {
    calculateShippingCost(address, package) {
        // Esta clase está demasiado interesada en los detalles de Address
        let baseCost = 0;
        
        // Lógica que debería estar en la clase Address
        if (address.country === 'Spain') {
            if (address.region === 'Canary Islands') {
                baseCost = 15;
            } else {
                baseCost = 5;
            }
        } else if (address.continent === 'Europe') {
            if (address.isEU) {
                baseCost = 10;
            } else {
                baseCost = 20;
            }
        } else {
            baseCost = 30;
        }

        // Más lógica que debería estar en Address
        if (address.isRemoteArea) {
            baseCost *= 1.5;
        }

        // Cálculos basados en el paquete
        return baseCost * package.weight;
    }
}

// Ejemplo 3: Método que debería estar en otra clase
class PaymentProcessor {
    processRefund(order, customer) {
        // Este método está más interesado en Customer que en Payment
        if (!customer.hasActiveAccount) {
            throw new Error('Customer account is inactive');
        }

        // Validaciones que deberían estar en Customer
        if (customer.hasPendingPayments) {
            throw new Error('Customer has pending payments');
        }

        if (customer.refundCount > customer.maxRefundsAllowed) {
            throw new Error('Customer has exceeded refund limit');
        }

        // Lógica que debería estar en Customer
        const refundAmount = order.total;
        customer.balance += refundAmount;
        customer.refundCount++;
        customer.lastRefundDate = new Date();
        
        // Actualización que debería estar en Customer
        if (customer.refundCount > 3) {
            customer.status = 'under-review';
        }

        return {
            refundId: this.generateRefundId(),
            amount: refundAmount,
            date: new Date()
        };
    }
} 