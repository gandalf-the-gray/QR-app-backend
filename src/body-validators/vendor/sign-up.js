import { StringField, IntegerField } from 'anubis-inspect';
import { LoginValidator } from './login.js';
import Vendor from '../../models/vendor.js';

const rules = {
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
};

class SignUpValidator extends LoginValidator {
  constructor() {
    super();
    super.init(rules);
  }
}

export default new SignUpValidator();
