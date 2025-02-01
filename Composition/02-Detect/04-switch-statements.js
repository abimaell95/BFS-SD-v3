// Ejemplo 1: Switch statements para calcular precios según tipo de usuario
class PriceCalculator {
    calculatePrice(product, userType) {
        let basePrice = product.price;
        
        // Switch que se repite en varios lugares del código
        switch(userType) {
            case 'regular':
                return basePrice;
            case 'premium':
                return basePrice * 0.9; // 10% descuento
            case 'vip':
                return basePrice * 0.8; // 20% descuento
            case 'wholesale':
                return basePrice * 0.7; // 30% descuento
            default:
                throw new Error('Unknown user type');
        }
    }

    calculateShipping(product, userType) {
        let baseShipping = 10;

        // Mismo switch repetido para shipping
        switch(userType) {
            case 'regular':
                return baseShipping;
            case 'premium':
                return baseShipping * 0.5;
            case 'vip':
                return 0; // envío gratis
            case 'wholesale':
                return product.weight > 10 ? baseShipping : 0;
            default:
                throw new Error('Unknown user type');
        }
    }
}

// Ejemplo 2: Cadena de if-else para procesar diferentes tipos de pagos
class PaymentProcessor {
    processPayment(payment) {
        if (payment.type === 'credit_card') {
            return this.processCreditCard(payment);
        } else if (payment.type === 'paypal') {
            return this.processPayPal(payment);
        } else if (payment.type === 'bank_transfer') {
            return this.processBankTransfer(payment);
        } else if (payment.type === 'crypto') {
            return this.processCrypto(payment);
        } else if (payment.type === 'gift_card') {
            return this.processGiftCard(payment);
        } else {
            throw new Error('Unsupported payment type');
        }
    }

    processCreditCard(payment) {
        return {
            status: 'processed',
            method: 'credit_card',
            amount: payment.amount
        };
    }

    processPayPal(payment) {
        return {
            status: 'processed',
            method: 'paypal',
            amount: payment.amount
        };
    }

    processBankTransfer(payment) {
        return {
            status: 'processed',
            method: 'bank_transfer',
            amount: payment.amount
        };
    }

    processCrypto(payment) {
        return {
            status: 'processed',
            method: 'crypto',
            amount: payment.amount
        };
    }

    processGiftCard(payment) {
        return {
            status: 'processed',
            method: 'gift_card',
            amount: payment.amount
        };
    }
}

// Ejemplo 3: Switch para determinar el formato de exportación
class ReportExporter {
    exportReport(data, format) {
        let result;
        
        // Switch que viola el principio Open/Closed
        switch(format) {
            case 'pdf':
                result = this.formatAsPDF(data);
                this.addPDFHeader(result);
                this.addPDFFooter(result);
                this.optimizePDFSize(result);
                break;
            
            case 'excel':
                result = this.formatAsExcel(data);
                this.addExcelFormulas(result);
                this.addExcelStyling(result);
                break;
            
            case 'csv':
                result = this.formatAsCSV(data);
                this.validateCSVFormat(result);
                break;
            
            case 'json':
                result = this.formatAsJSON(data);
                this.prettifyJSON(result);
                break;
            
            default:
                throw new Error('Unsupported export format');
        }

        return result;
    }

    formatAsPDF(data) { /* ... */ }
    addPDFHeader(pdf) { /* ... */ }
    addPDFFooter(pdf) { /* ... */ }
    optimizePDFSize(pdf) { /* ... */ }
    
    formatAsExcel(data) { /* ... */ }
    addExcelFormulas(excel) { /* ... */ }
    addExcelStyling(excel) { /* ... */ }
    
    formatAsCSV(data) { /* ... */ }
    validateCSVFormat(csv) { /* ... */ }
    
    formatAsJSON(data) { /* ... */ }
    prettifyJSON(json) { /* ... */ }
} 