import cards from "../../../../data/portfolioCardsData";

export default function handler(req, res) {
  res.status(200).json(cards);
}
