const FAQItem = ({ faq, toggleQuestion }) => {
  return (
    <div className={faq.isEnabled ? "faq-item is-open" : "faq-item"}>
      <button
        className="faq-question"
        aria-expanded={faq.isEnabled}
        onClick={() => {
          toggleQuestion(faq.id);
        }}
      >
        <span className="faq-icon">{faq.isEnabled ? "-" : "+"}</span>
        <span>{faq.question}</span>
      </button>
      {faq.isEnabled && <div className="faq-answer">{faq.answer}</div>}
    </div>
  );
};

export default FAQItem;
