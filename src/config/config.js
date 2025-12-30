

export const Constants = {
    INTERNAL_SERVER_ERROR : "Internal Server Error",
    USER_REGISTERED_SUCCESS : "User registered successfully",
    LOGIN_SUCESS : "Login successful",
    RESET_LINK_SEND       : "Reset link sent successfully",
    EMAILREGISTERED : "Email already registered",
    USER_NOTFOUND   : "User not found",
    INVALID_PASSWORD: "Invalid password",
    RESET_SUCCESS   : "Password reset successfully",
    PRODUCT_EXIST   : "Product with this SKU already exists",
    PRODUCT_NOTFOUND: "Product not found",
    PRODUCT_DELETE  : "Product deleted successfully",
    INVALID_PRODUCT : "Invalid product ID",
    PRODUCT_UPDATE  : "Product updated successfully",
    CUSTOMER_NOTFOUND : "Customer not found",
    CUSTOMER_DELETE : "Customer deleted successfully",
    CUSTOMER_EXIST : "Customer email already exists",
    ID_STATUS_REQUIRED : "ID and Status are required",
    INVALID_STATUS : "Invalid status. Allowed: Active, Blocked",
    STATUS_CHANGED : "Status updated successfully",
    INVALID_CUSTOMER : "Invalid customer ID",
    CUSTOMER_UPDATED : "Customer updated successfully",
    EMAILREGISTERED : "Email already registered",
    VALIDATION_FAILED : "Validation Failed",
    TOKEN_MISSING : "Unauthorized. Token missing",
    CUSTOMER_ADD : 'Customer added successfully',
    CUSTOMER_DATA_FETCHED : "Customer data fetched successfully",
    CUSTOMER_DELETED : "Customer deleted successfully",
    PRODUCT_ADD : "Product added successfully",
    PRODUCT_DATA_FETCHED : "Product data fetched successfully",
    PRODUCT_UPDATED : "Product updated successfully",
    ROUTE_NOT_FOUND :"Route not found"

    
}

export const Codes = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};


export const Validation_Msg = {

    PASSWORD_MUST : "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    NAME_STRING : "Name must be a string",
    NAME_REQ : "Name is required",
    NAME_ATLEAST : "Name must be at least 3 characters",
    NAME_MAXLENGHT : "Name must not exceed 30 characters",
    EMAIL_VALID : "Please enter a valid email",
    EMAIL_REQ : "Email is required",
    VALID_ROLE : "Please select a valid role",
    ROLE_REQ : "Role is required",
    PROD_NAME_REQ : "Product name is required",
    PROD_ATLEAST : "Product name must be at least 2 characters",
    PROD_MAXLENGTH : "Product name must not exceed 40 characters",
    SKU_REQ : "SKU is required",
    SKU_MUST : "SKU must contain only letters and numbers",
    SKU_ATLEAST : "SKU must be at least 2 characters",
    SKU_MAXLENGTH : "SKU must not exceed 20 characters",
    PRICE_NUMBER : "Price must be a number",
    PRICE_POSITIVE : "Price must be a positive number",
    PRICE_REQ : "Price is required",
    STOCK_NUMBER : "Stock must be a number",
    STOCK_INT : "Stock must be an integer",
    STOCK_NOT_NEG : "Stock cannot be negative",
    STOCK_REQ : "Stock is required"
}
