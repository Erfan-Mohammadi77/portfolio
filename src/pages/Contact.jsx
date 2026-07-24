import { useLang } from '../context/LanguageContext.jsx';

const CONTACT_LINKS = [
  {
    label: 'Email',
    href: 'mailto:erfan.mohammadi.alv77@gmail.com',
    value: 'erfan.mohammadi.alv77@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Erfan-Mohammadi77',
    value: 'github.com/Erfan-Mohammadi77',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/erfan-mohammadi77/',
    value: 'linkedin.com/in/erfan-mohammadi77',
  },
  {
    label: 'Website',
    href: 'https://erfanmohammadi.ir',
    value: 'erfanmohammadi.ir',
  },
];

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact">
      <div className="eyebrow">
        {t.contact.eyebrow}
      </div>

      <h2 className="section-title">
        {t.contact.title}
      </h2>

      <div className="terminal">
        <div className="tbar">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="contact-links">
          {CONTACT_LINKS.map((link) => (
            <div key={link.label}>
              <strong>{link.label}: </strong>

              {link.href ? (
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.value}
                </a>
              ) : (
                <span>{link.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}