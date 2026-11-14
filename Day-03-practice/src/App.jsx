import Counter from "./Components/Counter";
import FAQItem from "./Components/FAQItem";
import React from 'react';

const App = () => {

  const [faqs,setFaqs] = React.useState([
    {
      id: crypto.randomUUID(),
      question: "What is useState?",
      answer:
        "useState is a React hook that lets a component remember a value between renders. It returns the current value and a setter function.",
      isEnabled: false
    },
    {
      id: crypto.randomUUID(),
      question: "Why does the UI update when state changes?",
      answer:
        "Calling the setter tells React the value has changed, so React re-renders the component and shows the new value on screen.",
      isEnabled: false
    },
    {
      id: crypto.randomUUID(),
      question:
        "Why use setCount((prev) => prev + 1) instead of setCount(count + 1)?",
      answer:
        "The function form always receives the latest state value, so it stays correct when several updates are queued together.",
      isEnabled: false
    },
  ]);

  function handleQuestionEnable(id){
    setFaqs((prev)=>
      prev.map((p)=> p.id===id ? {...p,isEnabled:!p.isEnabled} : {...p,isEnabled:false})
    )
  }

  return (
    <main className="page">
      <Counter />
      <section className="faq">
        <p className="faq-title">Good to know</p>
        {faqs.map((faq) => {
          return <FAQItem key={faq.id} faq={faq} toggleQuestion={handleQuestionEnable}/>;
        })}
      </section>
    </main>
  );
};

export default App;
