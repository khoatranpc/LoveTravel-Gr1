
export function isRequired(value, message){
    return value.trim() ? undefined : message || "Vui lòng nhập trường này"
}

export function minLength(value, min ,message){
    return value.trim().length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`
}

export function isEmail(value, message){
    const regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : message || 'Email không hợp lệ';
}

export function isEqual(value, modelValue ,message){
    return value.trim() === modelValue ? undefined : message || "Thông tin không hợp lệ"
}