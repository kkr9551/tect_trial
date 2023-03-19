import React from 'react';
import "./Contact.css";
import { peopleData } from './peopleData';
import People from './People';

const Contact = () => {
  const people = peopleData.map((people) => (
    <People
      key={people.id} 
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
        <div className='contactTech'>
          <p className='issueDesc'>If you meet any technical trouble, please fill in this <a className='contactLink' href='https://docs.google.com/forms/d/e/1FAIpQLSfnjejt68eCsEPMfvOVgVDX0jsHHLW07_GkRwPss_TzGAwU8Q/viewform?usp=sf_link' target="_blank">form</a>. We will address it as quickly as possible.</p>
        </div>
      </section>
    </div>
  )
};

export default Contact;