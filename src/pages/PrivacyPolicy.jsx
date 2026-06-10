import React from 'react';

const sections = [
  {
    title: 'Información personal que recopilamos o tratamos',
    content: `Cuando utilizamos el término "información personal", nos referimos a cualquier dato que le identifique o que pueda vincularse razonablemente con usted. Podemos recopilar las siguientes categorías:`,
    list: [
      'Detalles de contacto: nombre, dirección, teléfono y correo electrónico.',
      'Información financiera: datos de tarjetas de pago y detalles de transacciones.',
      'Información de cuenta: nombre de usuario, contraseña y preferencias.',
      'Información sobre transacciones: artículos consultados, añadidos al carrito o comprados.',
      'Comunicaciones con nosotros: información proporcionada al contactar soporte.',
      'Información del dispositivo: dirección IP e identificadores únicos.',
      'Información sobre el uso: cómo y cuándo utiliza nuestros servicios.',
    ],
  },
  {
    title: 'Fuentes de información personal',
    content: 'Podemos recopilar información personal de las siguientes fuentes:',
    list: [
      'Directamente de usted al crear una cuenta o realizar una compra.',
      'Automáticamente a través de cookies y tecnologías similares.',
      'De nuestros proveedores de servicios contratados.',
      'De partners u otros terceros.',
    ],
  },
  {
    title: 'Cómo utilizamos su información personal',
    content: 'Utilizamos su información personal para los siguientes fines:',
    list: [
      'Prestar, personalizar y mejorar nuestros servicios.',
      'Procesar pagos y gestionar pedidos.',
      'Enviarle comunicaciones de marketing y promociones.',
      'Detectar y prevenir actividades fraudulentas.',
      'Brindarle atención al cliente.',
      'Cumplir con obligaciones legales aplicables.',
    ],
  },
  {
    title: 'Cómo divulgamos la información personal',
    content: 'En determinadas circunstancias podemos divulgar su información personal a:',
    list: [
      'Proveedores de servicios que actúan en nuestro nombre.',
      'Partners comerciales y de marketing.',
      'Terceros cuando usted lo solicite o consienta.',
      'Autoridades legales cuando así lo exija la ley.',
    ],
  },
  {
    title: 'Sitios web y enlaces de terceros',
    content: 'Nuestros servicios pueden incluir enlaces a sitios web de terceros. No garantizamos ni nos hacemos responsables de la privacidad o seguridad de dichos sitios. Le recomendamos revisar sus políticas de privacidad antes de proporcionar cualquier información personal.',
  },
  {
    title: 'Datos de menores',
    content: 'Nuestros servicios no están destinados a menores de edad. No recopilamos conscientemente información personal de menores. Si usted es padre, madre o tutor legal de un menor que nos haya facilitado su información, puede contactarnos para solicitar su eliminación.',
  },
  {
    title: 'Seguridad y retención de su información',
    content: 'Implementamos medidas de seguridad razonables para proteger su información personal. Sin embargo, ninguna medida es completamente infalible. El tiempo de retención de sus datos depende de factores como la necesidad de mantener su cuenta, cumplir obligaciones legales o resolver conflictos.',
  },
  {
    title: 'Sus derechos y opciones',
    content: 'Según su lugar de residencia, puede tener los siguientes derechos:',
    list: [
      'Derecho de acceso a la información personal que conservamos sobre usted.',
      'Derecho de supresión de sus datos personales.',
      'Derecho de rectificación de información inexacta.',
      'Derecho a la portabilidad de sus datos.',
      'Gestión de preferencias de comunicaciones comerciales.',
    ],
  },
  {
    title: 'Cambios en esta Política de privacidad',
    content: 'Podemos actualizar esta Política de privacidad ocasionalmente. Publicaremos la versión actualizada en este sitio web y actualizaremos la fecha de última actualización. Le notificaremos los cambios conforme a lo exigido por la legislación aplicable.',
  },
  {
    title: 'Contacto',
    content: 'Si tiene alguna pregunta sobre esta Política de privacidad o desea ejercer sus derechos, puede contactarnos a través de nuestras redes sociales o visitando nuestra tienda en Durango, México.',
  },
];

function PrivacyPolicy() {
  return (
    <div style={styles.page}>
      <main style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Política de Privacidad</h1>
          <p style={styles.lastUpdated}>Última actualización: 09 de junio de 2026</p>
        </div>

        {/* Intro */}
        <div style={styles.card}>
          <p style={styles.introText}>
            ShopTRENDY gestiona esta tienda y sitio web para ofrecerle una experiencia de compra de moda premium.
            Esta Política de privacidad describe cómo recopilamos, utilizamos y divulgamos su información personal
            cuando visita, utiliza o realiza una compra a través de nuestros servicios o cuando se comunica con
            nosotros por cualquier otro medio.
          </p>
          <p style={styles.introText}>
            Le rogamos que lea atentamente esta Política de privacidad. Al utilizar y acceder a cualquiera de
            nuestros servicios, usted reconoce haber leído y entendido la forma en que se recopila, utiliza y
            divulga su información personal.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div key={i} style={styles.card}>
            <h2 style={styles.sectionTitle}>{section.title}</h2>
            <p style={styles.sectionText}>{section.content}</p>
            {section.list && (
              <ul style={styles.list}>
                {section.list.map((item, j) => (
                  <li key={j} style={styles.listItem}>
                    <span style={styles.bullet}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#fafafa',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    marginBottom: '8px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111',
    margin: '0 0 8px',
  },
  lastUpdated: {
    fontSize: '14px',
    color: '#888',
    margin: 0,
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
  },
  introText: {
    fontSize: '15px',
    color: '#444',
    lineHeight: 1.7,
    margin: '0 0 12px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111',
    margin: '0 0 12px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e08c00',
    display: 'inline-block',
  },
  sectionText: {
    fontSize: '14px',
    color: '#555',
    lineHeight: 1.7,
    margin: '0 0 12px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    color: '#555',
    lineHeight: 1.6,
  },
  bullet: {
    color: '#e08c00',
    fontWeight: '700',
    flexShrink: 0,
  },
};

export default PrivacyPolicy;