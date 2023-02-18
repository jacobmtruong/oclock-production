import photography from "../../../data/data";

export default function handler(req, res) {
  res.status(200).json(photography);
}
