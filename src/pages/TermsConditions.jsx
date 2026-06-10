import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  {
    number: '01',
    title: 'Acceso y Cuenta',
    content: `Al aceptar estos Términos del Servicio, usted declara que tiene al menos la mayoría de edad legal en su estado o provincia de residencia. Para utilizar los Servicios, incluyendo la navegación en nuestra tienda o la compra de productos, es posible que se le solicite proporcionar información como su dirección de correo electrónico, información de facturación, pago y envío. Usted declara que toda la información proporcionada es correcta, está actualizada y completa. Usted es el único responsable de mantener la seguridad de las credenciales de su cuenta y de toda la actividad de la misma. No podrá transferir, vender, ceder ni licenciar su cuenta a ninguna otra persona.`,
  },
  {
    number: '02',
    title: 'Nuestros Productos',
    content: `Hemos hecho todo lo posible para que nuestros productos se muestren de forma precisa en nuestra tienda online. Sin embargo, los colores o la apariencia del producto pueden diferir de cómo se muestran en su pantalla debido al tipo de dispositivo que utilice. No garantizamos que la calidad de cualquier producto adquirido cumpla con sus expectativas o sea igual a como se muestra en nuestra tienda. Todas las descripciones de los productos pueden ser modificadas en cualquier momento sin previo aviso. Nos reservamos el derecho de interrumpir la venta de cualquier producto en cualquier momento.`,
  },
  {
    number: '03',
    title: 'Pedidos',
    content: `Cuando realiza un pedido, está haciendo una oferta de compra. ShopTRENDY se reserva el derecho de aceptar o rechazar su pedido por cualquier motivo. No se aceptará su pedido hasta que ShopTRENDY confirme que lo acepta. Debemos recibir y procesar su pago antes de aceptar su pedido. Debe revisar sus pedidos cuidadosamente antes de efectuar la compra, ya que ShopTRENDY podría no poder gestionar la solicitud de cancelación después de que se acepte un pedido. En caso de no aceptar o cancelar un pedido, intentaremos avisarle a través del correo electrónico o número de teléfono proporcionado.`,
  },
  {
    number: '04',
    title: 'Precios y Facturación',
    content: `Los precios, descuentos y promociones están sujetos a cambios sin previo aviso. El precio cobrado por un producto será el precio vigente en el momento en que se realiza el pedido. Salvo que se indique lo contrario, los precios publicados no incluyen impuestos ni gastos de envío. Usted acepta proporcionar información actual, completa y precisa de compra y pago para todas las compras realizadas en nuestra tienda. Usted declara que la información de pago que proporciona es verdadera, correcta y completa, y que está debidamente autorizado para su uso.`,
  },
  {
    number: '05',
    title: 'Envío y Entrega',
    content: `No somos responsables de cualquier retraso en el envío y la entrega. Todos los tiempos de entrega son solo estimaciones y no están garantizados. No seremos responsables por retrasos ocasionados por la empresa de transporte o eventos fuera de nuestro control. Una vez que transferimos productos a la empresa de transportes, el riesgo de pérdida se transfiere a usted.`,
  },
  {
    number: '06',
    title: 'Propiedad Intelectual',
    content: `Nuestros Servicios, incluyendo marcas, textos, imágenes, gráficos, videos y el diseño general, son propiedad de ShopTRENDY y están protegidos por las leyes de propiedad intelectual aplicables. Estos Términos le permiten utilizar los Servicios únicamente para su uso personal y no comercial. No debe reproducir, distribuir, modificar ni transmitir ningún material de los Servicios sin nuestro consentimiento previo por escrito. El uso no autorizado puede constituir una violación de las leyes de propiedad intelectual.`,
  },
  {
    number: '07',
    title: 'Usos Prohibidos',
    content: `Usted podrá acceder y utilizar los Servicios únicamente con fines lícitos. Queda prohibido: utilizar los Servicios para cualquier propósito ilegal o malicioso; infringir derechos de propiedad intelectual; acosar, abusar o dañar a cualquier persona; transmitir información falsa o engañosa; enviar correo no deseado; suplantar la identidad de cualquier persona o entidad; subir virus o código malicioso; o interferir con las funciones de seguridad de los Servicios. Nos reservamos el derecho de suspender o cancelar su cuenta si determinamos que ha infringido alguna parte de estos Términos.`,
  },
  {
    number: '08',
    title: 'Comentarios y Reseñas',
    content: `Si envía comentarios, sugerencias o reseñas, nos otorga una licencia perpetua y libre de regalías para usar, reproducir, modificar y distribuir dicho contenido en cualquier medio. Usted declara que posee todos los derechos necesarios sobre los comentarios enviados y que estos cumplen con estos Términos. No tenemos obligación de mantener la confidencialidad de sus comentarios ni de pagar compensación por ellos. Podemos eliminar comentarios que consideremos ilegales, ofensivos o que violen derechos de terceros.`,
  },
  {
    number: '09',
    title: 'Descargo de Responsabilidad',
    content: `Los Servicios y todos los productos ofrecidos se proporcionan "tal cual" y "según disponibilidad" para su uso, sin ninguna garantía de ningún tipo. No garantizamos que el uso de los Servicios será ininterrumpido, oportuno, seguro o libre de errores. La información presentada en los Servicios se proporciona únicamente con fines informativos generales. Cualquier confianza que deposite en dicha información será estrictamente bajo su propio riesgo.`,
  },
  {
    number: '10',
    title: 'Limitación de Responsabilidad',
    content: `En ningún caso ShopTRENDY, sus directores, empleados, afiliados, agentes o proveedores de servicios serán responsables de cualquier daño directo, indirecto, incidental, punitivo o consecuente de cualquier tipo, incluyendo pérdida de beneficios, pérdida de datos o cualquier daño similar, que surja de su uso de los Servicios o cualquier producto adquirido a través de los mismos.`,
  },
  {
    number: '11',
    title: 'Indemnización',
    content: `Usted acepta indemnizar y eximir de responsabilidad a ShopTRENDY y sus afiliados, ejecutivos, directores, empleados y agentes de cualquier pérdida, daño, responsabilidad o reclamación que surja de su incumplimiento de estos Términos, su violación de cualquier ley o los derechos de un tercero, o su acceso y uso de los Servicios.`,
  },
  {
    number: '12',
    title: 'Cambios a los Términos',
    content: `Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de estos Términos del Servicio en cualquier momento. Es responsabilidad suya revisar nuestro sitio web periódicamente para ver si hay cambios. Su uso continuo de los Servicios después de la publicación de cualquier cambio constituye la aceptación de dichos cambios.`,
  },
  {
    number: '13',
    title: 'Ley Aplicable',
    content: `Estos Términos del Servicio se regirán e interpretarán de conformidad con las leyes aplicables en la jurisdicción donde ShopTRENDY tiene su sede, en Durango, México. Usted y ShopTRENDY aceptan la jurisdicción y competencia personal de dichos tribunales para resolver cualquier disputa relacionada con estos Términos.`,
  },
  {
    number: '14',
    title: 'Información de Contacto',
    content: `Las preguntas sobre los Términos del Servicio pueden enviarse a través de nuestras redes sociales o visitando nuestra tienda en Durango, México. También puede contactarnos a través del formulario disponible en nuestra página de Contacto.`,
  },
];

function TermsConditions() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  return (
    <div style={styles.page}>
      <main style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Términos y Condiciones</h1>
          <p style={styles.lastUpdated}>Última actualización: 09 de junio de 2026</p>
        </div>

        {/* Intro */}
        <div style={styles.card}>
          <p style={styles.introText}>
            Bienvenido a <strong>ShopTRENDY</strong>. Los siguientes términos y condiciones describen sus derechos
            y responsabilidades cuando utiliza nuestros servicios. Lea atentamente estos Términos del Servicio,
            ya que incluyen información importante sobre sus derechos legales.
          </p>
          <p style={styles.introText}>
            Al visitar, interactuar con o utilizar nuestros Servicios, usted acepta estar sujeto a estos
            Términos del Servicio y nuestra Política de Privacidad. Si no está de acuerdo con estos términos,
            no debe utilizar ni acceder a nuestros Servicios.
          </p>
        </div>

        {/* Accordion Sections */}
        <div style={styles.accordionContainer}>
          {sections.map((section, i) => (
            <div key={i} style={styles.accordionItem}>
              <button
                style={styles.accordionHeader}
                onClick={() => toggle(i)}
              >
                <div style={styles.accordionLeft}>
                  <span style={styles.sectionNumber}>{section.number}</span>
                  <span style={styles.sectionTitle}>Sección {section.number} — {section.title}</span>
                </div>
                {openSection === i
                  ? <ChevronUp size={18} color="#888" />
                  : <ChevronDown size={18} color="#888" />
                }
              </button>
              {openSection === i && (
                <div style={styles.accordionBody}>
                  <p style={styles.sectionContent}>{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

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
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  accordionItem: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    overflow: 'hidden',
  },
  accordionHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  accordionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  sectionNumber: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#fff',
    background: '#e08c00',
    borderRadius: '6px',
    padding: '3px 8px',
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111',
  },
  accordionBody: {
    padding: '0 24px 20px',
    borderTop: '1px solid #f0f0f0',
  },
  sectionContent: {
    fontSize: '14px',
    color: '#555',
    lineHeight: 1.7,
    margin: '16px 0 0',
  },
};

export default TermsConditions;