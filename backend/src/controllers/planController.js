import { store } from '../data/store.js';

export const getPricingPlans = (req, res, next) => {
  try {
    const plans = store.getPricingPlans();
    res.json({
      success: true,
      data: plans,
    });
  } catch (err) {
    next(err);
  }
};

export const getFaqs = (req, res, next) => {
  try {
    const faqs = store.getFaqs();
    res.json({
      success: true,
      data: faqs,
    });
  } catch (err) {
    next(err);
  }
};
