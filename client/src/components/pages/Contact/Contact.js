import React from 'react';
import "./Contact.css";
import { peopleData } from './peopleData';
import People from './People';

const Contact = () => {
  const people = peopleData.map((people) => (
    <People 
      name={people.name} 
      url={people.image} 
      eAddr={people.email} />
  ));
  
  return (
    <div>
      <section>
        <h6 className="contactTitle">Meet us</h6>
        <p className="contactDesc">"Traslation in History" headed by Prof Daniele Monticelli and the research team</p>
        <a href='https://translationinhistory.tlu.ee/en/people/' target="_blank">Learn more</a>
        <div className='peopleContainer'>
          
          <div className='peopleCards'>{people}</div>
        </div>
      </section>
    </div>
  )
};

export default Contact;