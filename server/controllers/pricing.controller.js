exports.calculatePrice = async (req, res) => {
  const { width, height, quantity, material, finishing } = req.body;
  const baseRate = 0.02;
  const area = width * height;
  const price = area * quantity * baseRate;
  res.json({ price });
};