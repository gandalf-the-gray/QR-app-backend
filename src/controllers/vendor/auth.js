import Vendor from '../../models/vendor.js';
import { getCleanDoc } from '../../utils/mongoose.js';
import signUpBodyValidator from '../../body-validators/vendor/sign-up.js';
import loginBodyValidator from '../../body-validators/vendor/login.js';
import { getToken } from '../../libs/JWT.js';

export async function signUp(req, res) {
  try {
    const errors = await signUpBodyValidator.asyncValidate(req.body);
    if (errors !== null) {
      res.status(422).json(errors);
      return;
    }
    const vendor = await Vendor.create(req.body);
    res.status(200).json(getCleanDoc(vendor, ['password']));
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function login(req, res) {
  try {
    const errors = await loginBodyValidator.asyncValidate(req.body);
    if (errors) {
      res.status(422).json(errors);
      return;
    }
    const vendor = await Vendor.exists({ email: req.body.email });
    const token = await getToken({ id: vendor._id });
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json();
  }
}
