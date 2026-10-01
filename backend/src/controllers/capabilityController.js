import { store } from '../data/store.js';

export const getCapabilities = (req, res, next) => {
  try {
    const capabilities = store.getCapabilities();
    res.json({
      success: true,
      data: capabilities,
    });
  } catch (err) {
    next(err);
  }
};
