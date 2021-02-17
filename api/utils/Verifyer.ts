exports.isEmailValid = (email:string):boolean => {
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/;
    return regex.test(email);
}