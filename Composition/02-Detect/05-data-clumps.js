// Ejemplo 1: Datos de dirección que aparecen juntos en múltiples lugares
class OrderService {
    createOrder(
        // Data clump: Información de dirección
        street,
        city,
        state,
        zipCode,
        country,
        // Otros parámetros
        items,
        userId
    ) {
        return {
            items,
            userId,
            shippingAddress: {
                street,
                city,
                state,
                zipCode,
                country
            }
        };
    }
}

class UserService {
    updateUserAddress(
        userId,
        // El mismo data clump de dirección
        street,
        city,
        state,
        zipCode,
        country
    ) {
        const user = database.findUser(userId);
        user.address = {
            street,
            city,
            state,
            zipCode,
            country
        };
        database.save(user);
    }
}

// Ejemplo 2: Datos personales que siempre van juntos
class EmployeeService {
    createEmployee(
        // Data clump: Información personal
        firstName,
        lastName,
        dateOfBirth,
        ssn,
        // Data clump: Información de contacto
        email,
        phone,
        mobile,
        // Otros datos
        position,
        salary
    ) {
        validatePersonalInfo(firstName, lastName, dateOfBirth, ssn);
        validateContactInfo(email, phone, mobile);

        return {
            personalInfo: {
                firstName,
                lastName,
                dateOfBirth,
                ssn
            },
            contactInfo: {
                email,
                phone,
                mobile
            },
            position,
            salary
        };
    }

    updatePersonalInfo(
        employeeId,
        // El mismo data clump de información personal
        firstName,
        lastName,
        dateOfBirth,
        ssn
    ) {
        validatePersonalInfo(firstName, lastName, dateOfBirth, ssn);
        // Actualizar información...
    }

    updateContactInfo(
        employeeId,
        // El mismo data clump de información de contacto
        email,
        phone,
        mobile
    ) {
        validateContactInfo(email, phone, mobile);
        // Actualizar información...
    }
}

// Ejemplo 3: Datos de producto que siempre aparecen juntos
class InventorySystem {
    addProduct(
        // Data clump: Información básica del producto
        name,
        description,
        category,
        brand,
        // Data clump: Información de precio
        basePrice,
        taxRate,
        discount,
        // Data clump: Información de stock
        quantity,
        minStock,
        maxStock,
        warehouseId
    ) {
        // Validaciones dispersas de los grupos de datos
        if (!name || !description || !category || !brand) {
            throw new Error('Invalid product information');
        }

        if (basePrice <= 0 || taxRate < 0 || discount < 0) {
            throw new Error('Invalid price information');
        }

        if (quantity < 0 || minStock < 0 || maxStock <= minStock) {
            throw new Error('Invalid stock information');
        }

        return {
            productInfo: {
                name,
                description,
                category,
                brand
            },
            pricing: {
                basePrice,
                taxRate,
                discount
            },
            stock: {
                quantity,
                minStock,
                maxStock,
                warehouseId
            }
        };
    }

    updateStock(
        productId,
        // El mismo data clump de stock
        quantity,
        minStock,
        maxStock,
        warehouseId
    ) {
        // Más validaciones repetidas...
        if (quantity < 0 || minStock < 0 || maxStock <= minStock) {
            throw new Error('Invalid stock information');
        }
        // Actualizar stock...
    }
}

// Funciones de validación que se repiten
function validatePersonalInfo(firstName, lastName, dateOfBirth, ssn) {
    // Validaciones...
}

function validateContactInfo(email, phone, mobile) {
    // Validaciones...
} 