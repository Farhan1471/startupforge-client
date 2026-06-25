'use server'

const { serverMutation } = require("../core/server")

export const savePaymentInfo = async (paymentInfo) => {
    return serverMutation('api/payments', paymentInfo);
}
