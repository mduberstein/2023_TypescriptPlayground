// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = "Hello World"
console.log(anExampleVariable)

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
export enum MinorErrorCode {
    CouponExpired = 221,
    // CouponAlreadyUsed = 222,
    // CouponNotFound = 223,
    // CouponInapplicable = 224,
    // CouponValidNotApplied = 225,
    // CouponvoidInapplicable = 226,
    // CouponInvalid = 227,
    // CouponPeriodAlreadyUsed = 228,
    // CreditTierInvalid = 233,
    // PaymentTypeInvalid = 230,
    // MerchantIdInvalid = 231,
    // MerchantCategoryCodeInvalid = 232,
}
export enum MajorErrorCode {
    // WrapperMissing = 100,
    // WrapperInvalid = 101,
    // TokenMissing = 110,
    RestaurantMissing = 112,
    RestaurantInvalid = 113,
    // TerminalMissing = 114,
    // OperatorMissing = 115,
    // TransidMissing = 116,
    // TimestampMissing = 117
}

export const ErrorCode = { ...MinorErrorCode, ...MajorErrorCode };
export type ErrorCode = MinorErrorCode | MajorErrorCode;
interface ErrorMessages {
    msg_en: string;
    msg_fr: string;
    msg_es: string;
    msg_us: string;
}
interface ProcessingErrors extends ErrorMessages {
    error: ErrorCode;
}

const errorMessages: { [key in ErrorCode]: ErrorMessages } = {
    [ErrorCode.CouponExpired]: {
        msg_en: 'The coupon is no longer valid. Coupon expired.',
        msg_fr: 'The coupon is no longer valid. Coupon expired.',
        msg_es: 'The coupon is no longer valid. Coupon expired.',
        msg_us: 'The coupon is no longer valid. Coupon expired.',
    },
    [ErrorCode.RestaurantMissing]: {
        msg_en: 'Cannot process - restaurant number is missing.',
        msg_fr: 'Cannot process - restaurant number is missing.',
        msg_es: 'Cannot process - restaurant number is missing.',
        msg_us: 'Cannot process - restaurant number is missing.',
    },
    [ErrorCode.RestaurantInvalid]: {
        msg_en: 'Cannot process - restaurant number is invalid.',
        msg_fr: 'Cannot process - restaurant number is invalid.',
        msg_es: 'Cannot process - restaurant number is invalid.',
        msg_us: 'Cannot process - restaurant number is invalid.',
    },
}

console.log(errorMessages[ErrorCode.RestaurantInvalid]);

// 
console.log(MinorErrorCode);

console.log(ErrorCode[ErrorCode.CouponExpired]);
console.log(MinorErrorCode.CouponExpired);
console.log(MinorErrorCode.CouponExpired);
console.log(MinorErrorCode[221]);

// let h:string = null;
// // if(h != null ) {
// //     console.log();
// // }

export default class ProcessingError extends Error {
    public ErrorCode: ErrorCode;
    public Code: string;
    public Target: string | null;
    public InnerError: Error | null;

    public constructor(errorCode: ErrorCode, target?: string, innerError?: Error) {
        super(errorMessages[errorCode].msg_en);
        this.ErrorCode = errorCode;
        this.Code = ErrorCode[errorCode];
        this.Target = target || null;
        this.InnerError = innerError || null;
    }

    /**
     * Returns elements for <errors>
     */
    public getErrors(): ProcessingErrors {
        return {
            error: this.ErrorCode,
            ...errorMessages[this.ErrorCode],
        };
    }
}

const error = new ProcessingError(ErrorCode.RestaurantInvalid, undefined, new Error())
