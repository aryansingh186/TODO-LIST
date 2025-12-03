import Subscriber from "../models/subscriberModel.js";

export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    // check if already subscribed
    const exist = await Subscriber.findOne({ email });
    if (exist)
      return res.status(409).json({ message: "Email already subscribed" });

    // create new subscriber
    const newSub = await Subscriber.create({ email });

    res.status(201).json({
      message: "Subscribed successfully",
      subscriber: newSub
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
