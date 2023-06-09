import { BaseValidator, StringField } from 'anubis-inspect';
import Vendor from '../../models/vendor.js';

const rules = {
  email: StringField.email('email')
    .required()
    .test(async (email) => {
      const vendor = await Vendor.findOne({ email });
      return !vendor;
    }, 'this email is already taken'),
  password: new StringField('password').required().min(8),
};

export class LoginValidator extends BaseValidator {
  constructor() {
    super();
    super.init(rules);
  }
}

export default new LoginValidator();
