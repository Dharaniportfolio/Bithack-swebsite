import { useState } from "react";

export function Faq() {
  const faqs = [
    {
      title: "What is BitHack's?",
      text: "BitHack's is a 36-hour hackathon with the goal of uniting talented developers and designers under one roof and encouraging healthy competition among them. With the help of a committed and knowledgeable technical staff and a panel of equally stimulating and creative subjects, participants can put their talents to the test and use the results to create projects that address real-world issues.",
    },
    {
      title: "How many members are allowed in a team?",
      text: "A team can have a minimum of 4 and a maximum of 6 members.",
    },
    {
      title:
        "I am interested in participating? but i cannot able to build team?",
      text: "This is an opportunity for you to explore! Join our discord server and we have specifically dedicated a channel for team building.",
    },
  ];
  const [open, setopen] = useState(null);
  return (
    <div className="accortion">
      <h2>Faq's</h2>
      {faqs.map((el, i) => (
        <Accortionitem
          open={open}
          setopen={setopen}
          num={i}
          title={el.title}
          text={el.text}
          key={el.title}
        />
      ))}
    </div>
  );
}
function Accortionitem({ num, title, text, open, setopen }) {
  const isopen = num === open;
  function handletoggle() {
    setopen(isopen ? null : num);
  }
  return (
    <div className={`item ${isopen ? "open" : ""}`} onClick={handletoggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : { num }}</p>
      <p className="title">{title}</p>
      <p className="icon">{isopen ? "-" : "+"}</p>
      {isopen && <div className="content">{text}</div>}
    </div>
  );
}
export default Faq;
