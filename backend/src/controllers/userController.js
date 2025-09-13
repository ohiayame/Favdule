export const getUser = async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;

  res.json({ id: userId, name: "name", picture_url: "url" });
};
