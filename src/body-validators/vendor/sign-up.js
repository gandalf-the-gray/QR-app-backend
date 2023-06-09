import { StringField, IntegerField, BaseValidator } from 'anubis-inspect';
import Vendor from '../../models/vendor/vendor.js';

const rules = {
  email: StringField.email('email')
    .required()
    .test(async (email) => {
      const vendor = await Vendor.exists({ email });
      return vendor === null;
    }, 'this email is already taken'),
  name: {
    first: new StringField('first name').required(),
    last: new StringField('last name'),
  },
  mobile: {
    country: {
      code: new IntegerField('country code').required().min(1).max(300),
      name: new StringField('country name').required().match(/^[a-z\s]*$/i),
    },
    number: new IntegerField('mobile number')
      .required()
      .test(
        (number) => String(number).length === 10,
        'mobile number must have 10 digits',
      )
      .test(async (number) => {
        const vendor = await Vendor.findOne({ 'mobile.number': number });
        return !vendor;
      }, 'this mobile number is already taken'),
  },
  store: {
    name: new StringField('store name').required().max(100),
    description: new StringField('store description'),
  },
  password: new StringField('password').required().min(8),
};

class SignUpValidator extends BaseValidator {
  constructor() {
    super();
    super.init(rules);
  }
}

export default new SignUpValidator();
