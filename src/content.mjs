// Textos del sitio. Fuente: diseño «Inicio v3» y src/lib/content.ts del proyecto Next.js original.

export const DRAIN = '/servicios/desatascos-24-horas/';
export const CAM = '/servicios/inspeccion-camara-tuberias/';

export const nav = [
  { href: DRAIN, label: 'Desatascos 24 h', key: 'drain' },
  { href: CAM, label: 'Inspección con cámara', key: 'cam' },
  { href: '/zonas/', label: 'Zonas', key: 'zones' },
  { href: '/contacto/', label: 'Contacto', key: 'contact' },
];

export const callInfo = [
  ['Tu localidad', 'Y la dirección, para confirmar cobertura.'],
  ['Qué desagüe falla', 'WC, fregadero, ducha, arqueta…'],
  ['Qué has probado', 'Sobre todo si usaste productos químicos.'],
];

export const symptoms = [
  ['El agua no baja', 'Fregadero, ducha o lavabo que retiene el agua o tarda cada vez más.', 'Desatasco'],
  ['Gorgoteos', 'Ruidos en otros desagües al vaciar el WC o la lavadora: señal de aire atrapado.', 'Desatasco'],
  ['Malos olores', 'Olor persistente en baño, cocina o patio aunque se limpie a menudo.', 'Valoración'],
  ['El agua retorna', 'Aparece agua en la ducha o en otro seno al usar un desagüe distinto.', 'Desatasco'],
  ['Arqueta que rebosa', 'Agua saliendo por un registro exterior o por el suelo del patio.', 'Urgente'],
  ['El atasco vuelve', 'Se desatascó hace poco y el problema reaparece en el mismo punto.', 'Cámara recomendada'],
];

export const homeServices = [
  { short: 'Urgente 24 h', title: 'Desatascos urgentes 24 h', group: 'Desatasco', cam: false, href: DRAIN, kicker: 'INTERVENCIÓN URGENTE', text: 'Para cuando el agua deja de fluir y no puede esperar: viviendas, comunidades y locales, de día o de noche.', signs: ['El agua no baja o rebosa', 'Varios desagües afectados a la vez', 'Arqueta o registro con agua'], expect: 'te pedimos localidad y punto afectado, confirmamos disponibilidad y presupuesto, y valoramos el método según el acceso.' },
  { short: 'WC', title: 'Desatasco de WC', group: 'Desatasco', cam: false, href: DRAIN, kicker: 'BAÑO', text: 'Inodoros que no evacúan, que rebosan o que tardan cada vez más en vaciar la cisterna.', signs: ['El nivel del agua sube al tirar de la cadena', 'Gorgoteo en ducha o lavabo al usar el WC', 'Malos olores persistentes'], expect: 'no sigas tirando de la cadena. Valoramos si el atasco está en el propio inodoro o más adelante en la conducción.' },
  { short: 'Fregaderos', title: 'Desatasco de fregaderos', group: 'Desatasco', cam: false, href: DRAIN, kicker: 'COCINA', text: 'Fregaderos que no desaguan o lo hacen despacio, a menudo por acumulación de grasa y restos.', signs: ['Desagüe lento que empeora', 'Agua que retorna por el otro seno', 'Olor en la zona del sifón'], expect: 'evita productos químicos. Si ya has usado alguno, dínoslo: condiciona cómo se trabaja.' },
  { short: 'Tuberías y arquetas', title: 'Tuberías y arquetas', group: 'Desatasco', cam: false, href: DRAIN, kicker: 'CONDUCCIONES', text: 'Lavabos, duchas, bajantes, arquetas y conducciones de desagüe en viviendas y comunidades.', signs: ['Varias tomas afectadas a la vez', 'Arqueta que rebosa en el exterior', 'Problema compartido con vecinos'], expect: 'en comunidades conviene avisar al administrador. Indica si hay un registro accesible.' },
  { short: 'Cámara', title: 'Inspección con cámara', group: 'Diagnóstico', cam: true, href: CAM, kicker: 'DIAGNÓSTICO', text: 'Una cámara recorre el tramo accesible de la tubería para observar su interior sin abrir toda la conducción.', signs: ['Atasco que vuelve tras desatascar', 'Vivienda que lleva tiempo cerrada', 'Dudas sobre el estado de la tubería'], expect: 'te explicamos qué tramo se ha podido revisar, lo observado y el siguiente paso recomendado.' },
  { short: 'Localización', title: 'Localización de obstrucciones', group: 'Diagnóstico', cam: true, href: CAM, kicker: 'LOCALIZACIÓN', text: 'Situar dónde está el atasco antes de decidir cómo actuar, sobre todo en tramos largos o con varios registros.', signs: ['No se sabe en qué tramo está el atasco', 'Varios registros o arquetas', 'Intervenciones previas sin resultado'], expect: 'la visibilidad, el agua acumulada y los giros determinan el alcance; lo valoramos antes de empezar.' },
];

export const camReport = [
  ['Qué tramo se ha revisado', 'Hasta dónde ha podido avanzar la cámara y por qué.'],
  ['Qué se ha observado', 'Si hay una obstrucción visible y en qué punto aproximado.'],
  ['Siguiente paso recomendado', 'Desatasco, nueva revisión o consulta a otro profesional.'],
];

export const camCols = [
  { title: 'Cuándo es útil', items: ['Atascos que se repiten', 'Varios puntos afectados', 'Viviendas cerradas tiempo'] },
  { title: 'Qué puede mostrar', items: ['Obstrucciones visibles', 'Acumulaciones en el tramo', 'Dónde se detiene el avance'] },
  { title: 'Qué condiciona el alcance', items: ['Diámetro y giros', 'Agua acumulada y visibilidad', 'Acceso a registros'] },
];

export const waiting = [
  'Deja de usar los puntos de agua afectados.',
  'Evita productos químicos o desmontar la instalación.',
  'Si hay agua saliendo, aleja objetos y no abras tapas pesadas.',
];

export const steps = [
  ['Llamas o escribes', 'Por teléfono para urgencias; por WhatsApp si prefieres describirlo.'],
  ['Nos cuentas el caso', 'Localidad, desagüe afectado y lo que has probado.'],
  ['Confirmamos condiciones', 'Disponibilidad, desplazamiento y presupuesto antes de autorizar.'],
  ['Intervenimos y explicamos', 'Resultado, observaciones y siguientes pasos.'],
];

export const principles = [
  'Presupuesto antes de autorizar.',
  'Sin tarifas genéricas ni tiempos inventados.',
  'Solo desatascos e inspección con cámara.',
];

export const waMsg = ['Localidad y dirección', 'Qué desagüe falla', 'Desde cuándo ocurre', 'Si has usado algún producto'];

export const homeFaqs = [
  ['¿Puedo contactar de noche o en fin de semana?', 'El servicio está orientado a desatascos 24 horas, incluidos fines de semana. Al contactar, confirmamos la disponibilidad para tu ubicación y las condiciones antes del desplazamiento.'],
  ['¿En cuánto tiempo podéis llegar?', 'Depende de la ubicación y de la disponibilidad en ese momento. Consulta una estimación al contactar; no prometemos un tiempo fijo que no podamos confirmar.'],
  ['¿Cuánto cuesta un desatasco?', 'El importe depende del acceso, la localización del atasco, los medios necesarios y el horario. Solicita las condiciones y el presupuesto antes de autorizar la intervención. No publicamos una tarifa genérica que pueda no ajustarse a tu caso.'],
  ['¿Cuándo conviene una inspección con cámara?', 'Cuando el atasco se repite, afecta a varios puntos o no se sabe dónde está. Permite observar el tramo accesible y orientar la intervención antes de repetirla.'],
  ['¿La cámara permite ver cualquier tubería?', 'No siempre. El diámetro, los giros, el agua acumulada y las obstrucciones pueden limitar la inspección. Se valora el acceso y se explica qué tramo puede revisarse.'],
  ['¿Qué zonas cubrís?', 'Alicante, Benidorm, Torrevieja, Elche, Altea y localidades del entorno en la provincia de Alicante. Indica tu dirección para confirmar cobertura.'],
  ['¿Ofrecéis otros servicios de fontanería?', 'Nos centramos exclusivamente en desatascos y en inspección de tuberías con cámara.'],
];

// Orden norte → sur para el mapa de zonas.
export const cities = [
  {
    slug: 'altea', name: 'Altea', zone: 'Marina Baixa', region: 'Altea · Marina Baixa',
    headline: 'La tranquilidad empieza por un desagüe que funciona.',
    intro: 'Desatascos 24 horas y diagnóstico con cámara en Altea. Consulta la disponibilidad para una vivienda, comunidad o negocio en Altea y su entorno.',
    context: 'En calles con accesos limitados o viviendas en urbanizaciones, los detalles de ubicación ayudan a preparar la visita. Al contactar, describe el acceso y el punto donde has detectado la incidencia.',
    areas: ['Altea', 'Altea la Vella', 'L’Albir', 'Callosa d’en Sarrià'],
    question: '¿Qué datos necesitáis para acudir a una urbanización de Altea?',
    answer: 'La dirección completa, una referencia de acceso y una descripción del atasco. Confirmamos la disponibilidad y las condiciones del desplazamiento antes de organizar la visita.',
    scenario: 'Casas, comunidades y negocios',
    tip: 'Comparte una referencia de acceso si la dirección está en una urbanización o una calle de acceso restringido.',
    image: 'hero',
  },
  {
    slug: 'benidorm', name: 'Benidorm', zone: 'Marina Baixa', region: 'Benidorm · Marina Baixa',
    headline: 'Tu actividad sigue. El atasco, no.',
    intro: 'Atención de desatascos 24 horas en Benidorm y diagnóstico con cámara. Una vía directa para consultar incidencias en apartamentos, comunidades y negocios.',
    context: 'En apartamentos y establecimientos con mucho uso, conviene distinguir un atasco puntual de una incidencia en una conducción compartida. Explica qué desagües están afectados y facilita las indicaciones de acceso al edificio.',
    areas: ['Benidorm', 'Finestrat', 'La Nucía', 'L’Alfàs del Pi'],
    question: '¿Puedo solicitar un desatasco para un apartamento en Benidorm?',
    answer: 'Sí. Indica la dirección, el punto afectado y quién facilitará el acceso. Si la incidencia parece comunitaria, es útil coordinar la visita con la persona responsable del edificio.',
    scenario: 'Apartamentos y establecimientos',
    tip: 'Ten a mano las instrucciones de acceso y el contacto de la persona que pueda recibir al técnico.',
    image: 'desatascos',
  },
  {
    slug: 'alicante', name: 'Alicante', zone: 'Entorno metropolitano', region: 'Alicante y entorno metropolitano',
    headline: 'Que un atasco no pare tu día en Alicante.',
    intro: 'Desatascos 24 horas y revisión de tuberías con cámara para viviendas, comunidades y locales en Alicante. Cuéntanos qué ocurre y dónde estás para consultar la disponibilidad.',
    context: 'En una vivienda, un local o una comunidad, un desagüe que rebosa necesita una respuesta adaptada a la instalación. Indica si el problema afecta a un único punto o a varios y si hay agua saliendo por una arqueta.',
    areas: ['Alicante', 'Sant Vicent del Raspeig', 'Sant Joan d’Alacant', 'El Campello'],
    question: '¿Atendéis también el entorno de Alicante?',
    answer: 'Puedes consultar el servicio en Alicante, Sant Vicent del Raspeig, Sant Joan d’Alacant y El Campello. Confirmamos la cobertura y disponibilidad para tu dirección antes del desplazamiento.',
    scenario: 'Viviendas, comunidades y locales',
    tip: 'Si se trata de una comunidad, avisa al administrador e indica si otros vecinos tienen el mismo problema.',
    image: 'hero',
  },
  {
    slug: 'elche', name: 'Elche', zone: 'Baix Vinalopó', region: 'Elche · Baix Vinalopó',
    headline: 'Una solución clara para tu atasco en Elche.',
    intro: 'Servicio de desatascos 24 horas e inspección de tuberías con cámara en Elche y alrededores. Contacto directo para explicar la incidencia y acordar los siguientes pasos.',
    context: 'El acceso a la instalación cambia entre un piso, un local y una vivienda con arqueta exterior. Facilita la ubicación exacta y explica si hay un registro accesible para valorar cómo abordar el atasco.',
    areas: ['Elche', 'El Altet', 'Torrellano', 'Santa Pola'],
    question: '¿Se puede revisar una tubería con atasco recurrente en Elche?',
    answer: 'La inspección con cámara permite observar el tramo accesible y buscar posibles obstrucciones o anomalías. La visibilidad y el acceso determinan qué parte de la tubería se puede revisar.',
    scenario: 'Pisos, locales y viviendas',
    tip: 'Indica si hay una arqueta o registro accesible y evita abrir tapas pesadas por tu cuenta.',
    image: 'desatascos',
  },
  {
    slug: 'torrevieja', name: 'Torrevieja', zone: 'Vega Baja', region: 'Torrevieja · Vega Baja',
    headline: 'Vuelve a disfrutar de tu casa en Torrevieja.',
    intro: 'Desatascos urgentes y cámara de inspección de tuberías en Torrevieja. Consulta la atención disponible para tu vivienda, urbanización o local, de día o de noche.',
    context: 'Al volver a una segunda residencia puedes encontrar un desagüe lento o un atasco que no se había detectado. Si ocurre en varios puntos, una inspección puede ayudar a localizar la causa antes de repetir una intervención.',
    areas: ['Torrevieja', 'Guardamar del Segura', 'Rojales', 'Orihuela Costa'],
    question: '¿Podéis revisar una vivienda que lleva tiempo cerrada?',
    answer: 'Puedes solicitar el desatasco y consultar si procede una inspección con cámara. Describe lo que observas al utilizar los desagües y si el problema afecta a cocina, baño o a ambos.',
    scenario: 'Viviendas y urbanizaciones',
    tip: 'Anota cuándo aparece el problema y qué puntos están afectados; esa información ayuda a orientar la revisión.',
    image: 'inspeccion',
  },
];

// Orden de presentación en menús y pie (como en el sitio original).
export const cityMenuOrder = ['alicante', 'benidorm', 'torrevieja', 'elche', 'altea'];

const numbered = (rows) => rows.map(([title, text]) => ({ title, text }));

export const services = [
  {
    slug: 'desatascos-24-horas', key: 'drain', cam: false,
    title: 'Desatascos 24 horas', eyebrow: 'Cuando el agua no puede esperar',
    metaTitle: 'Desatascos 24 horas en Alicante',
    metaDescription: 'Desatascos urgentes de WC, fregaderos, tuberías y arquetas en la provincia de Alicante, a cualquier hora. Presupuesto antes de intervenir.',
    intro: 'Un fregadero que no desagua. Un inodoro atascado. Una arqueta que rebosa. Explica la incidencia y consulta la atención disponible, a cualquier hora.',
    image: 'desatascos', alt: 'Imagen ilustrativa de un equipo de desatasco junto a una arqueta',
    points: ['Fregaderos, lavabos, duchas e inodoros', 'Arquetas y conducciones de desagüe', 'Viviendas, comunidades y locales'],
    scopeKicker: 'QUÉ ATENDEMOS', scopeTitle: 'Cada punto de agua, su método.',
    scopeIntro: 'Indica qué desagüe falla al llamar: nos ayuda a valorar el acceso y los medios antes del desplazamiento.',
    scope: numbered([['WC', 'Inodoros que no evacúan, rebosan o tardan en vaciar.'], ['Fregaderos', 'Cocinas que no desaguan o lo hacen cada vez más despacio.'], ['Lavabos y duchas', 'Desagües lentos, retornos de agua y malos olores.'], ['Arquetas y tuberías', 'Conducciones de desagüe y registros que rebosan.']]),
    bodyTitle: 'Cada atasco necesita una valoración.',
    body: 'El primer paso es conocer dónde se produce el atasco y cómo afecta al uso de la instalación. El método de desatasco se valora según el acceso, el estado de la tubería y la naturaleza de la obstrucción. Antes de intervenir, se explican el alcance y las condiciones del trabajo.',
    question: '¿Cuánto cuesta un desatasco?',
    answer: 'El importe depende del acceso, la localización del atasco, los medios necesarios y el horario. Solicita las condiciones y el presupuesto antes de autorizar la intervención. No publicamos una tarifa genérica que pueda no ajustarse a tu caso.',
    cta: 'Que el agua vuelva a su sitio.',
  },
  {
    slug: 'inspeccion-camara-tuberias', key: 'cam', cam: true,
    title: 'Inspección de tuberías con cámara', eyebrow: 'Ver el problema. Entender la causa.',
    metaTitle: 'Inspección de tuberías con cámara en Alicante',
    metaDescription: 'Inspección con cámara para localizar obstrucciones y diagnosticar atascos recurrentes en Alicante, Benidorm, Torrevieja, Elche y Altea.',
    intro: 'Cuando un atasco vuelve, conviene mirar dentro. La inspección con cámara ayuda a observar el estado del tramo accesible y orientar el siguiente paso.',
    image: 'inspeccion', alt: 'Imagen ilustrativa de una cámara de inspección de tuberías y su monitor',
    points: ['Localización visual de obstrucciones', 'Revisión de tramos accesibles', 'Diagnóstico de atascos recurrentes'],
    scopeKicker: 'CUÁNDO TIENE SENTIDO', scopeTitle: 'Mirar dentro antes de repetir.',
    scopeIntro: 'La cámara no sustituye al desatasco: lo orienta. Estos son los casos en los que suele aportar más.',
    scope: numbered([['Atascos recurrentes', 'El mismo desagüe vuelve a fallar tras un desatasco.'], ['Varios puntos afectados', 'Cocina y baño a la vez: puede haber una causa común.'], ['Viviendas cerradas', 'Segundas residencias con desagües lentos al volver.'], ['Localizar el punto', 'Situar la obstrucción antes de decidir cómo actuar.']]),
    bodyTitle: 'Un diagnóstico que empieza mirando dentro.',
    body: 'La cámara permite observar el interior de una conducción sin abrir toda su longitud. Su alcance depende del diámetro, los codos, el acceso y la visibilidad. En ocasiones es necesario realizar un desatasco previo. Consulta si tu caso requiere imágenes o un informe y confirma su disponibilidad y alcance antes de contratar.',
    question: '¿La cámara permite ver cualquier tubería?',
    answer: 'No siempre. El diámetro, los giros, el agua acumulada y las obstrucciones pueden limitar la inspección. Se valora el acceso y se explica qué tramo puede revisarse. La inspección no incluye por sí misma una reparación.',
    cta: '¿El atasco vuelve? Miremos dentro.',
  },
];

export const serviceSteps = [
  ['Cuéntanos qué pasa', 'Localidad y desagüe afectado.'],
  ['Acordamos la intervención', 'Disponibilidad y presupuesto antes de autorizar.'],
  ['Actuamos', 'Resultados y siguientes pasos, explicados.'],
];

export const faqNight = ['¿Puedo contactar de noche o en fin de semana?', 'El servicio está orientado a desatascos 24 horas, incluidos fines de semana. Confirmamos la disponibilidad para tu ubicación antes del desplazamiento.'];
export const faqWaiting = ['¿Qué hago mientras espero?', 'Deja de utilizar los puntos de agua afectados y evita añadir productos químicos o desmontar la instalación. Si ya has utilizado algún producto, indícalo al contactar.'];
export const faqArrival = homeFaqs[1];
export const faqPrice = ['¿Cuánto cuesta un desatasco?', 'Depende del acceso, la localización del atasco, los medios necesarios y el horario. Conoces el presupuesto antes de autorizar.'];
