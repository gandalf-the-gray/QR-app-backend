import Vendor from '../../models/vendor.js';
import { getCleanDoc } from '../../utils/mongoose.js';
import signUpBodyValidator from '../../body-validators/vendor/sign-up.js';

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
