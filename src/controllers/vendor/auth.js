import Store from '../../models/vendor/store.js';
import Vendor from '../../models/vendor/vendor.js';
import loginBodyValidator from '../../body-validators/vendor/login.js';
import signUpBodyValidator from '../../body-validators/vendor/sign-up.js';
import { getToken } from '../../libs/JWT.js';
import { cleanDoc } from '../../utils/mongoose.js';

export async function signUp(req, res) {
  try {
    const errors = await signUpBodyValidator.asyncValidate(req.body);
    if (errors !== null) {
      res.status(422).json(errors);
      return;
    }
    const store = await Store.create(req.body.store);
    req.body.store = store._id;
    const vendor = await Vendor.create(req.body);
    res.status(200).json(cleanDoc(vendor));
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
