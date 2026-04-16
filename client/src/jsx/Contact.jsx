import React from 'react';

function Contact() {
  return (
    <section style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Contact Me</h2>
      <address style={{ fontStyle: 'normal', lineHeight: '1.6' }}>
        <p>
          <strong>Email:</strong><br />
          <a href="mailto:velagadashivaprasad@gmail.com">
            velagadashivaprasad@gmail.com
          </a>
        </p>
        
        <p>
          <strong>Location:</strong><br />
          Vizianagaram, Andhra Pradesh, India
        </p>
      </address>
    </section>
  );
}

export default Contact;