import landscapedata from "../../../../data/landscapeData";

export default function handler(req, res) {
  res.status(200).json(landscapedata);
}
