function isValidIsraeliID(id) {
    return /^\d{9}$/.test(id);
}

function isValidPhone(phone) {
    return /^05\d-\d{7}$/.test(phone) || /^05\d{8}$/.test(phone);
}

module.exports = { isValidIsraeliID, isValidPhone };
