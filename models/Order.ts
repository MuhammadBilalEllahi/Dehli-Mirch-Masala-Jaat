import mongoose from "mongoose";
import { AddressSubSchema } from "@/models/Address";
import { MODELS, ORDER_PAYMENT_STATUS, ORDER_STATUS, ORDER_TYPE, PAYMENT_TYPE } from "@/models/constants";



const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: MODELS.PRODUCT, required: true },
    variant: { type: mongoose.Schema.Types.ObjectId, ref: MODELS.VARIANT, required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true },
    label: { type: String, default: "" }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: MODELS.USER, default: null },

    contact: {
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        marketingOptIn: { type: Boolean, default: false },
    },

    shippingAddress: { type: AddressSubSchema, required: true },
    billingAddress: { type: AddressSubSchema },

    shippingMethod: {
        type: String, enum: [ORDER_TYPE.HOME_DELIVERY, ORDER_TYPE.PICKUP],
        required: true, default: ORDER_TYPE.HOME_DELIVERY
    },
    payment: {
        method: {
            type: String, enum: [PAYMENT_TYPE.COD, PAYMENT_TYPE.FASTIFY_CARD],
            default: PAYMENT_TYPE.COD
        },
        status: {
            type: String, enum: [ORDER_PAYMENT_STATUS.FAILED, ORDER_PAYMENT_STATUS.PAID,
            ORDER_PAYMENT_STATUS.PENDING], default: ORDER_PAYMENT_STATUS.PENDING
        },
        transactionId: { type: String, default: "" }
    },

    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },

    status: {
        type: String, enum: [ORDER_STATUS.CANCELLED, ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.DELIVERED, ORDER_STATUS.PENDING, ORDER_STATUS.SHIPPED],
        default: ORDER_STATUS.PENDING
    }
}, { timestamps: true });

OrderSchema.index({ "contact.email": 1, createdAt: -1 });

export default (mongoose.models[MODELS.ORDER] as any) || mongoose.model(MODELS.ORDER, OrderSchema);
