const toast = ($q, message, color, position) => {
    $q.notify({
        message,
        color,
        position,
    })
}

export {
    toast,
};
