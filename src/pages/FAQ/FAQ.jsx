import { useState } from "react";
import "./FAQ.css";

function FAQ() {

  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "How can I place an order?",
      answer: "Select a product, click Buy Now, and complete the checkout process."
    },
    {
      question: "What payment methods are available?",
      answer: "UPI, Debit Card, Credit Card and Net Banking."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery usually takes 3-7 business days."
    },
    {
      question: "Can I return a product?",
      answer: "Yes, within 7 days according to our return policy."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact us through the Contact Us page."
    }
  ];

  return (
    <div className="faq-container">

      <h1>Frequently Asked Questions</h1>

      {faqs.map((faq, index) => (

        <div className="faq-box" key={index}>

          <div
            className="question"
            onClick={() => setOpen(open === index ? null : index)}
          >
            {faq.question}
          </div>

          {open === index && (
            <div className="answer">
              {faq.answer}
            </div>
          )}

        </div>

      ))}

    </div>
  );
}

export default FAQ;