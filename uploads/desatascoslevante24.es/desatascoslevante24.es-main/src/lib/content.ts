export const cities = [
  {
    slug: 'alicante',
    name: 'Alicante',
    region: 'Alicante y entorno metropolitano',
    headline: 'Que un atasco no pare tu día en Alicante.',
    intro:
      'Desatascos 24 horas y revisión de tuberías con cámara para viviendas, comunidades y locales en Alicante. Cuéntanos qué ocurre y dónde estás para consultar la disponibilidad.',
    context:
      'En una vivienda, un local o una comunidad, un desagüe que rebosa necesita una respuesta adaptada a la instalación. Indica si el problema afecta a un único punto o a varios y si hay agua saliendo por una arqueta.',
    areas: ['Alicante', 'Sant Vicent del Raspeig', 'Sant Joan d’Alacant', 'El Campello'],
    question: '¿Atendéis también el entorno de Alicante?',
    answer:
      'Puedes consultar el servicio en Alicante, Sant Vicent del Raspeig, Sant Joan d’Alacant y El Campello. Confirmamos la cobertura y disponibilidad para tu dirección antes del desplazamiento.',
    scenario: 'Viviendas, comunidades y locales',
    tip: 'Si se trata de una comunidad, avisa al administrador e indica si otros vecinos tienen el mismo problema.',
  },
  {
    slug: 'benidorm',
    name: 'Benidorm',
    region: 'Benidorm · Marina Baixa',
    headline: 'Tu actividad sigue. El atasco, no.',
    intro:
      'Atención de desatascos 24 horas en Benidorm y diagnóstico con cámara. Una vía directa para consultar incidencias en apartamentos, comunidades y negocios.',
    context:
      'En apartamentos y establecimientos con mucho uso, conviene distinguir un atasco puntual de una incidencia en una conducción compartida. Explica qué desagües están afectados y facilita las indicaciones de acceso al edificio.',
    areas: ['Benidorm', 'Finestrat', 'La Nucía', 'L’Alfàs del Pi'],
    question: '¿Puedo solicitar un desatasco para un apartamento en Benidorm?',
    answer:
      'Sí. Indica la dirección, el punto afectado y quién facilitará el acceso. Si la incidencia parece comunitaria, es útil coordinar la visita con la persona responsable del edificio.',
    scenario: 'Apartamentos y establecimientos',
    tip: 'Ten a mano las instrucciones de acceso y el contacto de la persona que pueda recibir al técnico.',
  },
  {
    slug: 'torrevieja',
    name: 'Torrevieja',
    region: 'Torrevieja · Vega Baja',
    headline: 'Vuelve a disfrutar de tu casa en Torrevieja.',
    intro:
      'Desatascos urgentes y cámara de inspección de tuberías en Torrevieja. Consulta la atención disponible para tu vivienda, urbanización o local, de día o de noche.',
    context:
      'Al volver a una segunda residencia puedes encontrar un desagüe lento o un atasco que no se había detectado. Si ocurre en varios puntos, una inspección puede ayudar a localizar la causa antes de repetir una intervención.',
    areas: ['Torrevieja', 'Guardamar del Segura', 'Rojales', 'Orihuela Costa'],
    question: '¿Podéis revisar una vivienda que lleva tiempo cerrada?',
    answer:
      'Puedes solicitar el desatasco y consultar si procede una inspección con cámara. Describe lo que observas al utilizar los desagües y si el problema afecta a cocina, baño o a ambos.',
    scenario: 'Viviendas y urbanizaciones',
    tip: 'Anota cuándo aparece el problema y qué puntos están afectados; esa información ayuda a orientar la revisión.',
  },
  {
    slug: 'elche',
    name: 'Elche',
    region: 'Elche · Baix Vinalopó',
    headline: 'Una solución clara para tu atasco en Elche.',
    intro:
      'Servicio de desatascos 24 horas e inspección de tuberías con cámara en Elche y alrededores. Contacto directo para explicar la incidencia y acordar los siguientes pasos.',
    context:
      'El acceso a la instalación cambia entre un piso, un local y una vivienda con arqueta exterior. Facilita la ubicación exacta y explica si hay un registro accesible para valorar cómo abordar el atasco.',
    areas: ['Elche', 'El Altet', 'Torrellano', 'Santa Pola'],
    question: '¿Se puede revisar una tubería con atasco recurrente en Elche?',
    answer:
      'La inspección con cámara permite observar el tramo accesible y buscar posibles obstrucciones o anomalías. La visibilidad y el acceso determinan qué parte de la tubería se puede revisar.',
    scenario: 'Pisos, locales y viviendas',
    tip: 'Indica si hay una arqueta o registro accesible y evita abrir tapas pesadas por tu cuenta.',
  },
  {
    slug: 'altea',
    name: 'Altea',
    region: 'Altea · Marina Baixa',
    headline: 'La tranquilidad empieza por un desagüe que funciona.',
    intro:
      'Desatascos 24 horas y diagnóstico con cámara en Altea. Consulta la disponibilidad para una vivienda, comunidad o negocio en Altea y su entorno.',
    context:
      'En calles con accesos limitados o viviendas en urbanizaciones, los detalles de ubicación ayudan a preparar la visita. Al contactar, describe el acceso y el punto donde has detectado la incidencia.',
    areas: ['Altea', 'Altea la Vella', 'L’Albir', 'Callosa d’en Sarrià'],
    question: '¿Qué datos necesitáis para acudir a una urbanización de Altea?',
    answer:
      'La dirección completa, una referencia de acceso y una descripción del atasco. Confirmamos la disponibilidad y las condiciones del desplazamiento antes de organizar la visita.',
    scenario: 'Casas, comunidades y negocios',
    tip: 'Comparte una referencia de acceso si la dirección está en una urbanización o una calle de acceso restringido.',
  },
] as const;
export const services = [
  {
    slug: 'desatascos-24-horas',
    title: 'Desatascos 24 horas',
    eyebrow: 'Cuando el agua no puede esperar',
    intro:
      'Un fregadero que no desagua. Un inodoro atascado. Una arqueta que rebosa. Explica la incidencia y consulta la atención disponible, a cualquier hora.',
    image: '/images/desatascos.webp',
    alt: 'Imagen ilustrativa de un equipo de desatasco junto a una arqueta',
    points: [
      'Fregaderos, lavabos, duchas e inodoros',
      'Arquetas y conducciones de desagüe',
      'Viviendas, comunidades y locales',
    ],
    body: 'El primer paso es conocer dónde se produce el atasco y cómo afecta al uso de la instalación. El método de desatasco se valora según el acceso, el estado de la tubería y la naturaleza de la obstrucción. Antes de intervenir, se explican el alcance y las condiciones del trabajo.',
    question: '¿Cuánto cuesta un desatasco?',
    answer:
      'El importe depende del acceso, la localización del atasco, los medios necesarios y el horario. Solicita las condiciones y el presupuesto antes de autorizar la intervención. No publicamos una tarifa genérica que pueda no ajustarse a tu caso.',
  },
  {
    slug: 'inspeccion-camara-tuberias',
    title: 'Inspección de tuberías con cámara',
    eyebrow: 'Ver el problema. Entender la causa.',
    intro:
      'Cuando un atasco vuelve, conviene mirar dentro. La inspección con cámara ayuda a observar el estado del tramo accesible y orientar el siguiente paso.',
    image: '/images/inspeccion.webp',
    alt: 'Imagen ilustrativa de una cámara de inspección de tuberías y su monitor',
    points: [
      'Localización visual de obstrucciones',
      'Revisión de tramos accesibles',
      'Diagnóstico de atascos recurrentes',
    ],
    body: 'La cámara permite observar el interior de una conducción sin abrir toda su longitud. Su alcance depende del diámetro, los codos, el acceso y la visibilidad. En ocasiones es necesario realizar un desatasco previo. Consulta si tu caso requiere imágenes o un informe y confirma su disponibilidad y alcance antes de contratar.',
    question: '¿La cámara permite ver cualquier tubería?',
    answer:
      'No siempre. El diámetro, los giros, el agua acumulada y las obstrucciones pueden limitar la inspección. Se valora el acceso y se explica qué tramo puede revisarse. La inspección no incluye por sí misma una reparación.',
  },
] as const;
export const faqs = [
  [
    '¿Puedo contactar de noche o en fin de semana?',
    'El servicio está orientado a desatascos 24 horas, incluidos fines de semana. Al contactar, confirmamos la disponibilidad para tu ubicación y las condiciones antes del desplazamiento.',
  ],
  [
    '¿En cuánto tiempo podéis llegar?',
    'Depende de la ubicación y de la disponibilidad en ese momento. Consulta una estimación al contactar; no prometemos un tiempo fijo que no podamos confirmar.',
  ],
  [
    '¿Qué zonas cubrís?',
    'Alicante, Benidorm, Torrevieja, Elche, Altea y localidades del entorno en la provincia de Alicante. Indica tu dirección para confirmar cobertura.',
  ],
  [
    '¿Qué hago mientras espero?',
    'Deja de utilizar los puntos de agua afectados y evita añadir productos químicos o desmontar la instalación. Si ya has utilizado algún producto, indícalo al contactar.',
  ],
  [
    '¿Ofrecéis otros servicios de fontanería?',
    'Nos centramos exclusivamente en desatascos y en inspección de tuberías con cámara. Consulta el alcance de la intervención para tu caso.',
  ],
] as const;
