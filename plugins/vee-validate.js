import { extend, validate } from "vee-validate";
import { required, email, min, max, numeric, password, digits, alpha } from "vee-validate/dist/rules";
extend('required', {
    ...required,
    message: 'The {_field_} is required.'
});
extend('email', {
    ...email,
    message: 'The {_field_} field should be correct.'
});
extend("min", min);
extend("numeric", numeric);
extend("alpha", alpha);
extend("max", max);
extend("digits", {
    ...digits,
    message: "The {_field_} should be 10 digits long. "
});


extend('digits_between', {
    async validate(value, { min, max }) {
        const res = await validate(value, `numeric|min:${min}|max:${max}`,)
        return res.valid;
    },
    params: ['min', 'max'],
    message: 'The {_field_} must be between {min} and {max} digits'
});
