import { errorMessage, formData } from ".."

export const validateData = (formData: formData) => {
    const error: errorMessage = {}
    if (formData.password.length === 0) {
        error['pwdError'] = '密码不能为空'
    }
    if (formData.username.length === 0) {
        error['nameError'] = '用户名不能为空'
    }
    return error
}