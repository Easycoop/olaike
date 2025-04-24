// Utility function to get the original word from a compound word
const getOriginalWordFromCompoundWord = (compoundWord) => {
    return compoundWord?.replace('_', ' ');
};

// Validation function
const validateField = async (input, constraints, alias = null, fields) => {
    if (input == null) {
        return { status: "fail", error: `${input} cannot be null` };
    }

    const matchFinder = fields.find(field => constraints?.must_match === field.input?.field);

    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const specialCharsRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numberPattern = /[0-9]/g;

    const rules = {
        required: {
            pass: constraints?.required ? (input?.type !== 'file' ? (input?.type === 'number' ? !!input?.value : !!input?.value?.length) : !!input?.files?.length) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} is required`
        },
        min_length: {
            pass: constraints?.min_length ? (input?.value?.length >= constraints?.min_length) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} must have at least ${constraints?.min_length} characters`
        },
        max_length: {
            pass: constraints?.max_length ? (input?.value?.length <= constraints?.max_length) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} must not exceed ${constraints?.max_length} characters`
        },
        email: {
            pass: constraints?.email && input?.value?.length ? emailPattern.test(input?.value) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} must be a valid email`
        },
        has_special_character: {
            pass: constraints?.has_special_character && input?.value?.length ? specialCharsRegex.test(input?.value) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} must contain a special character`
        },
        must_have_number: {
            pass: constraints?.must_have_number && input?.value?.length ? numberPattern.test(input?.value) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} must contain a number`
        },
        must_match: {
            pass: constraints?.must_match && input?.value?.length ? (matchFinder ? input?.value === matchFinder.input?.value : false) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} does not match ${getOriginalWordFromCompoundWord(constraints?.must_match)}`
        },
        array: {
            pass: constraints?.array ? Array.isArray(input) : true,
            message: `${alias ?? getOriginalWordFromCompoundWord(input?.field)} must be an array`
        }
    };

    const feedback = Object.keys(constraints)
        .filter(constraint => rules[constraint] && !rules[constraint].pass)
        .map(constraint => ({ target: input?.field, message: rules[constraint].message }));

    return feedback.length ? { status: "fail", feedback } : { status: "success" };
};

// Function to validate multiple fields
export const runValidation = async (fields) => {
    const errors = [];
    const negatives = await Promise.all(fields.map(async (field) => {
        const result = await validateField(field.input, field.rules, field.alias, fields);
        if (result.error) return false;
        if (result.status === 'fail') {
            errors.push(...result.feedback);
            return false;
        }
        return true;
    }));

    if (negatives.includes(false)) {
        const groupedErrors = errors.reduce((acc, { target, message }) => {
            acc[target] = acc[target] ? [...acc[target], message] : [message];
            return acc;
        }, {});
        return { status: false, errors: groupedErrors };
    }

    return { status: true };
};
