/* ============================================================
   ElectroPostre v3 - script.js
   Eye tracking · Drag libre · Typewriter dialog
   ============================================================ */
'use strict';

// ============================================================
// DATOS: Ingredientes
// ============================================================
const INGREDIENTS = {
  campo:    { label: 'Campo Magnetico',           shortLabel: 'Campo',     color: '#6ee7f7' },
  corriente:{ label: 'Corriente Electrica',        shortLabel: 'Corriente', color: '#fbbf24' },
  cargas:   { label: 'Cargas Electricas',          shortLabel: 'Cargas',    color: '#f472b6' },
  bobina:   { label: 'Bobina',                     shortLabel: 'Bobina',    color: '#34d399' },
  induccion:{ label: 'Induccion Electromagnetica', shortLabel: 'Induccion', color: '#fb923c' },
};

// ============================================================
// DATOS: Combinaciones educativas
// Cada combinacion tiene:
//   dialog[]: array de mensajes para el typewriter (hasta 3 paginas)
//   formulas[]: tarjetas de teoria
// ============================================================
const COMBINATIONS = [
  {
    required: ['campo', 'corriente'], excluded: ['bobina', 'induccion'],
    title: 'Electromagnetismo', subtitle: 'Fenomeno electrico-magnetico fundamental',
    state: 'electromagnetismo', badgeColor: '#6ee7f7',
    mascotState: 'happy',
    hintText: 'Electricidad y magnetismo podrian relacionarse aqui...',
    dialog: [
      'Preparaste Electromagnetismo. Una corriente electrica genera un campo magnetico alrededor del conductor. Este principio fue descubierto por Oersted en 1820 y cambio la fisica para siempre.',
      'Dato curioso: Oersted noto por accidente que una brujula se desviaba al encender un circuito electrico. Hoy este principio es la base de los motores, generadores y resonancias magneticas (MRI).',
      'Formula clave:  B = (mu_0 * I) / (2 * pi * r)  donde B es el campo [Tesla], I la corriente [Ampere] y r la distancia al conductor [metro].',
    ],
    explanation:
      'Una corriente electrica produce un campo magnetico alrededor del conductor. ' +
      'Cuanto mayor sea la corriente, mas intenso sera el campo generado.',
    formulas: [
      { name: 'Campo de un conductor recto (Biot-Savart)', eq: 'B = (mu_0 * I) / (2 * pi * r)', vars: 'B = campo magnetico [Tesla, T]\nmu_0 = 4pi x 10^-7 T·m/A\nI = corriente [Ampere, A]\nr = distancia al conductor [metro, m]', color: '#6ee7f7' },
      { name: 'Fuerza sobre conductor con corriente', eq: 'F = B * I * L * sin(theta)', vars: 'F = fuerza magnetica [Newton, N]\nB = campo magnetico [Tesla, T]\nI = corriente [Ampere, A]\nL = longitud conductor [metro, m]', color: '#a78bfa' },
    ],
    application: 'Los electroimanes de hospital (MRI) usan corrientes enormes en bobinas superconductoras, generando campos miles de veces mas potentes que un iman ordinario.',
    fact: 'Oersted descubrio por accidente en 1820 que la corriente electrica desvia una brujula.',
  },
  {
    required: ['corriente', 'bobina'], excluded: ['induccion'],
    title: 'Electroiman', subtitle: 'Campo magnetico amplificado por solenoide',
    state: 'electroiman', badgeColor: '#34d399',
    mascotState: 'happy',
    hintText: 'Una bobina con corriente podria atraer metales...',
    dialog: [
      'Preparaste un Electroiman. Al hacer pasar corriente por una bobina, el campo de cada vuelta se suma, creando un campo total mucho mas intenso. Puede encenderse y apagarse controlando la corriente.',
      'Dato curioso: Un electroiman industrial puede levantar mas de 10 toneladas de chatarra. Al cortar la corriente, el campo desaparece al instante, algo imposible con imanes permanentes.',
      'Formula clave:  B = mu_0 * n * I  donde n es el numero de vueltas por metro y I la corriente en Ampere.',
    ],
    explanation:
      'Al enrollar un conductor en espiral y hacer pasar corriente, los campos de cada vuelta se ' +
      'superponen, generando un campo mucho mas intenso que el de un conductor recto.',
    formulas: [
      { name: 'Campo en solenoide (Ley de Ampere)', eq: 'B = mu_0 * n * I', vars: 'B = campo magnetico [Tesla, T]\nmu_0 = 4pi x 10^-7 T·m/A\nn = vueltas por metro [m^-1]\nI = corriente [Ampere, A]', color: '#34d399' },
      { name: 'Flujo magnetico', eq: 'Phi = B * A * cos(theta)', vars: 'Phi = flujo magnetico [Weber, Wb]\nB = campo [Tesla, T]\nA = area [m2]\ntheta = angulo entre B y la normal', color: '#6ee7f7' },
    ],
    application: 'Los trenes maglev y los resonadores MRI usan solenoides superconductores con campos de 1 a 7 Tesla para funcionar.',
    fact: 'Cortar la corriente en un electroiman hace que el campo desaparezca instantaneamente.',
  },
  {
    required: ['campo', 'induccion'], excluded: ['bobina'],
    title: 'Generacion de Electricidad', subtitle: 'Induccion electromagnetica - Ley de Faraday',
    state: 'generacion', badgeColor: '#fb923c',
    mascotState: 'wow',
    hintText: 'Cuando el campo cambia, algo especial sucede con las cargas...',
    dialog: [
      'Preparaste Generacion de Electricidad. Un campo magnetico variable induce una fuerza electromotriz en un conductor cercano, generando corriente electrica. Este es el principio de la Ley de Faraday.',
      'Dato curioso: Michael Faraday demostro la induccion en 1831 moviendo un iman dentro de una bobina. Hoy, mas del 99% de la electricidad mundial se genera con este mismo principio.',
      'Formula clave:  epsilon = -dPhi/dt  La f.e.m. inducida es igual al negativo de la variacion del flujo magnetico en el tiempo (Ley de Lenz incluida).',
    ],
    explanation:
      'Un campo magnetico que cambia con el tiempo induce una corriente electrica en un conductor cercano. ' +
      'Cuanto mas rapido cambie el flujo magnetico, mayor sera la corriente inducida.',
    formulas: [
      { name: 'Ley de Faraday', eq: 'epsilon = - dPhi / dt', vars: 'epsilon = f.e.m. inducida [Volt, V]\nPhi = flujo magnetico [Weber, Wb]\ndPhi/dt = variacion del flujo\n"−" = Ley de Lenz (se opone al cambio)', color: '#fb923c' },
      { name: 'Flujo magnetico', eq: 'Phi = B * A * cos(theta)', vars: 'B = campo magnetico [Tesla, T]\nA = area del conductor [m2]\ntheta = angulo entre B y la normal', color: '#fbbf24' },
    ],
    application: 'Hidroelectricas, termoelectricas y eolicas hacen girar turbinas con imanes frente a bobinas, induciendo corriente alterna que alimenta ciudades enteras.',
    fact: 'Faraday no tenia formacion matematica avanzada, pero sus experimentos fueron tan precisos que Maxwell los formalizo en ecuaciones decadas despues.',
  },
  {
    required: ['campo', 'corriente', 'bobina'], excluded: ['induccion'],
    title: 'Motor Electrico', subtitle: 'Conversion de energia electrica en mecanica',
    state: 'complejo', badgeColor: '#a78bfa',
    mascotState: 'wow',
    hintText: 'Con tres ingredientes electromagneticos se puede generar movimiento...',
    dialog: [
      'Preparaste un Motor Electrico. La fuerza magnetica sobre una bobina con corriente dentro de un campo genera un par de giro (torque) que hace rotar la bobina. Energia electrica se convierte en movimiento.',
      'Dato curioso: Los motores electricos representan mas del 45% del consumo mundial de electricidad. Los autos electricos alcanzan eficiencias del 95%, muy superiores al 30% de los motores de combustion.',
      'Formula clave:  tau = N * B * I * A * sin(theta)  El torque depende del campo, la corriente, el area de la bobina y el numero de vueltas.',
    ],
    explanation:
      'Una bobina con corriente dentro de un campo magnetico experimenta un torque que la hace girar. ' +
      'Un conmutador mantiene la rotacion continua, convirtiendo energia electrica en mecanica.',
    formulas: [
      { name: 'Fuerza sobre conductor', eq: 'F = B * I * L * sin(theta)', vars: 'F = fuerza [N], B = campo [T]\nI = corriente [A], L = longitud [m]\ntheta = angulo entre conductor y B', color: '#a78bfa' },
      { name: 'Torque en bobina rectangular', eq: 'tau = N * B * I * A * sin(theta)', vars: 'tau = torque [N·m]\nN = vueltas, B = campo [T]\nI = corriente [A], A = area [m2]', color: '#6ee7f7' },
    ],
    application: 'Vehiculos electricos, ascensores, robots industriales y trenes de alta velocidad usan este principio de conversion electromagnetica.',
    fact: 'El primer motor electrico fue construido por Faraday en 1821 usando un iman permanente y un conductor con corriente sumergido en mercurio.',
  },
  {
    required: ['campo', 'corriente', 'induccion'], excluded: ['bobina'],
    title: 'Generador Electrico', subtitle: 'Conversion de energia mecanica en electrica',
    state: 'complejo', badgeColor: '#fb923c',
    mascotState: 'wow',
    hintText: 'Induccion + corriente + campo podria mover energia al reves...',
    dialog: [
      'Preparaste un Generador Electrico. Es el proceso inverso al motor: energia mecanica de rotacion se convierte en energia electrica mediante induccion. Al mover un conductor en un campo magnetico se induce corriente.',
      'Dato curioso: El mismo dispositivo puede funcionar como motor o como generador. Los autos hibridos recuperan energia cinetica al frenar (frenado regenerativo), usando el motor como generador.',
      'Formula clave:  epsilon(t) = epsilon_max * sin(omega * t)  La f.e.m. alternante del generador varia sinusoidalmente con el tiempo.',
    ],
    explanation:
      'Al mover un conductor en un campo magnetico, se induce una corriente electrica. ' +
      'Es el principio inverso al motor: convierte energia mecanica en energia electrica.',
    formulas: [
      { name: 'F.E.M. inducida (Faraday)', eq: 'epsilon = - N * dPhi / dt', vars: 'epsilon = f.e.m. [Volt, V]\nN = numero de vueltas\ndPhi/dt = variacion del flujo', color: '#fb923c' },
      { name: 'F.E.M. en generador de CA', eq: 'epsilon(t) = Emax * sin(omega * t)', vars: 'Emax = amplitud de la f.e.m. [V]\nomega = velocidad angular [rad/s]\nt = tiempo [segundo, s]', color: '#fbbf24' },
    ],
    application: 'Todas las centrales electricas del mundo (hidro, termica, eolica, nuclear) usan generadores que convierten rotacion mecanica en corriente alterna.',
    fact: 'Un generador eolico de 3 MW puede abastecer a mas de 600 hogares con energia limpia de forma continua.',
  },
  {
    required: ['cargas', 'corriente'], excluded: ['campo', 'bobina', 'induccion'],
    title: 'Flujo de Cargas Electricas', subtitle: 'Naturaleza microscopica de la corriente',
    state: 'electromagnetismo', badgeColor: '#6ee7f7',
    mascotState: 'happy',
    hintText: 'Las cargas en movimiento tienen un nombre conocido en fisica...',
    dialog: [
      'Preparaste el Flujo de Cargas. La corriente electrica es el movimiento ordenado de electrones a traves de un conductor. Sin cargas en movimiento, no existe corriente electrica.',
      'Dato curioso: En cobre, los electrones se mueven a solo 0.01 mm/s en promedio, pero la senal electrica viaja al 99.9% de la velocidad de la luz porque afecta a todos los electrones al mismo tiempo.',
      'Formula clave:  I = Q / t  La corriente es la carga que pasa por una seccion del conductor por unidad de tiempo.',
    ],
    explanation:
      'La corriente es el movimiento ordenado de electrones libres a traves de un conductor, ' +
      'impulsados por una diferencia de potencial electrico.',
    formulas: [
      { name: 'Definicion de corriente electrica', eq: 'I = Q / t', vars: 'I = corriente [Ampere, A]\nQ = carga electrica [Coulomb, C]\nt = tiempo [segundo, s]', color: '#6ee7f7' },
      { name: 'Ley de Ohm', eq: 'V = I * R', vars: 'V = diferencia de potencial [Volt, V]\nI = corriente [Ampere, A]\nR = resistencia [Ohm]', color: '#fbbf24' },
    ],
    application: 'Comprender la corriente como flujo de cargas permite disenar todo tipo de circuitos, desde smartphones hasta computadoras cuanticas.',
    fact: 'Un Ampere equivale a 6.24 x 10^18 electrones pasando por una seccion del conductor cada segundo.',
  },
  {
    required: ['campo', 'cargas'], excluded: ['corriente', 'bobina', 'induccion'],
    title: 'Fuerza de Lorentz', subtitle: 'Fuerza sobre una carga en campo magnetico',
    state: 'electromagnetismo', badgeColor: '#f472b6',
    mascotState: 'happy',
    hintText: 'Una carga que se mueve en un campo no va en linea recta...',
    dialog: [
      'Preparaste la Fuerza de Lorentz. Una carga electrica en movimiento dentro de un campo magnetico experimenta una fuerza perpendicular a su velocidad y al campo. Esta fuerza curva la trayectoria de la carga.',
      'Dato curioso: Las auroras boreales son causadas por la fuerza de Lorentz. El campo magnetico terrestre curva las particulas solares hacia los polos, donde colisionan con el gas atmosferico y emiten luz de colores.',
      'Formula clave:  F = q * v * B * sin(theta)  La fuerza depende de la carga, la velocidad, el campo magnetico y el angulo entre ellos.',
    ],
    explanation:
      'Una carga en movimiento dentro de un campo magnetico experimenta una fuerza perpendicular ' +
      'a su velocidad. Esta fuerza no realiza trabajo pero curva la trayectoria de la carga.',
    formulas: [
      { name: 'Fuerza de Lorentz sobre carga puntual', eq: 'F = q * v * B * sin(theta)', vars: 'F = fuerza [Newton, N]\nq = carga electrica [Coulomb, C]\nv = velocidad [m/s]\nB = campo magnetico [Tesla, T]', color: '#f472b6' },
    ],
    application: 'El CERN usa la fuerza de Lorentz para doblar trayectorias de protones a velocidades proximas a la luz en el Gran Colisionador de Hadrones (LHC).',
    fact: 'Las auroras boreales son el efecto visual de la Fuerza de Lorentz sobre particulas del viento solar.',
  },
  {
    minTotal: 4, required: [],
    title: 'Sistema Electromagnetico Complejo', subtitle: 'Ecuaciones de Maxwell',
    state: 'complejo', badgeColor: '#a78bfa',
    mascotState: 'wow',
    hintText: 'Tantos ingredientes... esto sera algo de nivel avanzado.',
    dialog: [
      'Un Sistema Electromagnetico Complejo! Las cuatro ecuaciones de Maxwell unifican todos los fenomenos electromagneticos: campo electrico, campo magnetico, corriente, y ondas. Son la base de la tecnologia moderna.',
      'Dato curioso: Maxwell publico sus ecuaciones en 1865 prediciendo que la luz es una onda electromagnetica, antes de que se demostrara experimentalmente. Einstein las considero la obra mas bella de la fisica clasica.',
      'Las ecuaciones de Maxwell describen como los campos electricos y magneticos se generan mutuamente y se propagan en el espacio. Todo el electromagnetismo clasico surge de estas cuatro leyes fundamentales.',
    ],
    explanation:
      'Las cuatro ecuaciones de Maxwell unifican el electromagnetismo: describen como los campos se generan, ' +
      'interactuan y se propagan, prediciendo incluso la existencia de las ondas de radio y la luz.',
    formulas: [
      { name: 'Ley de Gauss para campo electrico', eq: 'div(E) = rho / epsilon_0', vars: 'E = campo electrico [V/m]\nrho = densidad de carga [C/m3]\nepsilon_0 = permitividad del vacio', color: '#6ee7f7' },
      { name: 'Ley de Faraday-Maxwell', eq: 'rot(E) = - dB / dt', vars: 'rot(E) = rotacional del campo electrico\ndB/dt = variacion del campo magnetico', color: '#fb923c' },
      { name: 'Ley de Ampere-Maxwell', eq: 'rot(B) = mu_0 * (J + epsilon_0 * dE/dt)', vars: 'J = densidad de corriente [A/m2]\ndE/dt = corriente de desplazamiento', color: '#a78bfa' },
    ],
    application: 'Transformadores, motores de induccion trifasica y las redes electricas mundiales se basan en estas ecuaciones.',
    fact: 'Maxwell predijo en 1865 que la luz es una onda electromagnetica, unificando optica y electromagnetismo en una sola teoria.',
  },
  // Fallback de error
  {
    required: [], minTotal: 0,
    title: 'Sin fenomeno reconocible', subtitle: 'Esta combinacion no produce un efecto definido',
    state: 'error', badgeColor: '#f87171',
    mascotState: 'error',
    hintText: 'Esta combinacion es algo inusual...',
    dialog: [
      'Hmm, esta receta no activo ningun fenomeno electromagnetico claro. En fisica, no todas las condiciones producen un efecto observable. Las leyes del electromagnetismo requieren ingredientes especificos.',
      'Consejo: intenta combinar "Campo Magnetico" con "Corriente Electrica" para crear Electromagnetismo, o "Corriente" con "Bobina" para crear un Electroiman. Explora las combinaciones posibles.',
    ],
    explanation:
      'La combinacion seleccionada no corresponde a un fenomeno electromagnetico claramente identificable. ' +
      'Intenta otras combinaciones explorando los ingredientes disponibles.',
    formulas: [], application: '', fact: '',
  },
];

// ============================================================
// ESTADO DE LA APP
// ============================================================
const plateIngredients = new Set();  // ingredientes en el plato
let currentScreen   = 'prep';
let resultRevealed  = false;
let currentCombo    = null;

// Estado del eye tracking
const eyeState = {
  active:   false,
  targetX:  0,
  targetY:  0,
  currentX: 0,
  currentY: 0,
  rafId:    null,
};

// Estado del typewriter dialog
const twState = {
  pages:      [],
  pageIndex:  0,
  charIndex:  0,
  timerId:    null,
  isTyping:   false,
};

// Estado del drag libre del plato
const freeDrag = {
  active:    false,
  offsetX:   0,
  offsetY:   0,
  overZone:  false,
};

// ============================================================
// REFERENCIAS DOM
// ============================================================
const step1Dot      = document.getElementById('step1Dot');
const step2Dot      = document.getElementById('step2Dot');
const screenPrep    = document.getElementById('screenPrep');
const screenDeliver = document.getElementById('screenDeliver');

// Pantalla 1
const ingredCards     = document.querySelectorAll('.ingredient-card');
const plateDropzone   = document.getElementById('plateDropzone');
const plateContents   = document.getElementById('plateContents');
const platePlaceholder= document.getElementById('platePlaceholder');
const plateCount      = document.getElementById('plateCount');
const mixBarFill      = document.getElementById('mixBarFill');
const mixLabel        = document.getElementById('mixLabel');
const mixPreviewHint  = document.getElementById('mixPreviewHint');
const hintAtoms       = document.getElementById('hintAtoms');
const hintText        = document.getElementById('hintText');
const btnContinuar    = document.getElementById('btnContinuar');
const btnLimpiar      = document.getElementById('btnLimpiarPlato');

// Pantalla 2
const draggablePlate  = document.getElementById('draggablePlate');
const miniPlateChips  = document.getElementById('miniPlateChips');
const deliverIngList  = document.getElementById('deliverIngredientList');
const mascotBigSvg    = document.getElementById('mascotBigSvg');
const mascotDropZone  = document.getElementById('mascotDropZone');
const dropZoneLabel   = document.getElementById('dropZoneLabel');
const dragInstruction = document.getElementById('dragInstruction');
const plateGhost      = document.getElementById('plateGhost');
const plateGhostChips = document.getElementById('plateGhostChips');
const mascotDialogWrap= document.getElementById('mascotDialogWrap');
const dialogText      = document.getElementById('dialogText');
const twCursor        = document.getElementById('twCursor');
const btnTwSkip       = document.getElementById('btnTwSkip');
const btnTwNext       = document.getElementById('btnTwNext');
const btnTwTheory     = document.getElementById('btnTwTheory');
const dialogPageIndicator = document.getElementById('dialogPageIndicator');
const resultWaiting   = document.getElementById('resultWaiting');
const resultFull      = document.getElementById('resultFull');
const resultBadgeBig  = document.getElementById('resultBadgeBig');
const resultFullTitle = document.getElementById('resultFullTitle');
const resultFullSubtitle = document.getElementById('resultFullSubtitle');
const theoryExplanation  = document.getElementById('theoryExplanation');
const formulaCards    = document.getElementById('formulaCards');
const applicationsBlock  = document.getElementById('applicationsBlock');
const applicationsText   = document.getElementById('applicationsText');
const factBlock       = document.getElementById('factBlock');
const factContent     = document.getElementById('factContent');
const deliverResultArea  = document.getElementById('deliverResultArea');
const btnVolver       = document.getElementById('btnVolver');
const btnReiniciar    = document.getElementById('btnReiniciar');

// ============================================================
// INIT
// ============================================================
function init() {
  generateBgParticles();
  renderMascot('idle');
  setupIngredientDrag();
  setupPlateDropZone();
  setupPlateFreeGrab();
  setupMascotDropZone();
  setupButtons();
  setupDialogControls();
}

// ============================================================
// PARTICULAS DE FONDO
// ============================================================
function generateBgParticles() {
  const c = document.getElementById('bgParticles');
  const colors = ['rgba(110,231,247,0.45)','rgba(167,139,250,0.40)','rgba(251,191,36,0.35)','rgba(52,211,153,0.35)','rgba(251,146,60,0.35)'];
  for (let i = 0; i < 30; i++) {
    const d = document.createElement('div');
    d.className = 'bg-particle';
    const sz = 3 + Math.random() * 7;
    d.style.cssText = `width:${sz}px;height:${sz}px;background:${colors[i%5]};left:${Math.random()*100}%;bottom:${Math.random()*100}%;--dur:${7+Math.random()*12}s;--delay:${Math.random()*16}s;`;
    c.appendChild(d);
  }
}

// ============================================================
// MASCOTA SVG - con pupilas rastreables (id: mascotPupilL/R)
// ============================================================
function getMascotSVG(state) {
  const C = {
    idle:  { body:'#112240', out:'#2a4070', eye:'#6ee7f7', glow:'rgba(110,231,247,0.15)' },
    happy: { body:'#0a2d1f', out:'#34d399', eye:'#34d399', glow:'rgba(52,211,153,0.22)' },
    wow:   { body:'#160f35', out:'#a78bfa', eye:'#a78bfa', glow:'rgba(167,139,250,0.28)' },
    error: { body:'#2d1010', out:'#f87171', eye:'#f87171', glow:'rgba(248,113,113,0.20)' },
    eat:   { body:'#0a2d1f', out:'#34d399', eye:'#34d399', glow:'rgba(52,211,153,0.35)' },
  }[state] || { body:'#112240', out:'#2a4070', eye:'#6ee7f7', glow:'rgba(110,231,247,0.15)' };

  const mouths = {
    idle:  `<line x1="82" y1="135" x2="118" y2="135" stroke="${C.eye}" stroke-width="3" stroke-linecap="round"/>`,
    happy: `<path d="M78,132 Q100,152 122,132" stroke="${C.eye}" stroke-width="3" stroke-linecap="round" fill="none"/>`,
    wow:   `<ellipse cx="100" cy="138" rx="12" ry="14" stroke="${C.eye}" stroke-width="3" fill="none"/>`,
    error: `<path d="M78,142 Q100,125 122,142" stroke="${C.eye}" stroke-width="3" stroke-linecap="round" fill="none"/>`,
    eat:   `<ellipse cx="100" cy="138" rx="16" ry="16" stroke="${C.eye}" stroke-width="3" fill="${C.eye}" opacity="0.3"/>`,
  };

  const brows = {
    idle:'', happy:'',
    wow:  `<path d="M74,92 Q84,82 94,88" stroke="${C.eye}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
           <path d="M106,88 Q116,82 126,92" stroke="${C.eye}" stroke-width="2.5" stroke-linecap="round" fill="none"/>`,
    error:`<path d="M74,92 Q84,100 94,96" stroke="${C.eye}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
           <path d="M106,96 Q116,100 126,92" stroke="${C.eye}" stroke-width="2.5" stroke-linecap="round" fill="none"/>`,
    eat:  `<path d="M74,88 Q84,80 94,86" stroke="${C.eye}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
           <path d="M106,86 Q116,80 126,88" stroke="${C.eye}" stroke-width="2.5" stroke-linecap="round" fill="none"/>`,
  };

  return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="${C.glow}"/>
    <ellipse cx="100" cy="100" rx="90" ry="38" stroke="${C.out}" stroke-width="1.5" opacity="0.4" fill="none"/>
    <ellipse cx="100" cy="100" rx="90" ry="38" stroke="${C.out}" stroke-width="1.5" opacity="0.4" fill="none" transform="rotate(60 100 100)"/>
    <ellipse cx="100" cy="100" rx="90" ry="38" stroke="${C.out}" stroke-width="1.5" opacity="0.4" fill="none" transform="rotate(120 100 100)"/>
    <circle cx="100" cy="100" r="58" fill="${C.body}" stroke="${C.out}" stroke-width="2.5"/>
    ${brows[state] || ''}
    <!-- Cuenca izquierda (fija) -->
    <circle cx="82" cy="108" r="12" fill="${C.eye}" opacity="0.12"/>
    <!-- Iris + pupila izquierda (movil via eyeTracking) -->
    <g id="mascotPupilL">
      <circle cx="82" cy="108" r="8.5" fill="${C.eye}" opacity="0.88"/>
      <circle cx="85" cy="105" r="3.5" fill="white" opacity="0.55"/>
    </g>
    <!-- Cuenca derecha (fija) -->
    <circle cx="118" cy="108" r="12" fill="${C.eye}" opacity="0.12"/>
    <!-- Iris + pupila derecha (movil) -->
    <g id="mascotPupilR">
      <circle cx="118" cy="108" r="8.5" fill="${C.eye}" opacity="0.88"/>
      <circle cx="121" cy="105" r="3.5" fill="white" opacity="0.55"/>
    </g>
    ${mouths[state] || mouths.idle}
    <circle cx="100" cy="100" r="10" fill="${C.eye}" opacity="0.4"/>
    <circle cx="96"  cy="96"  r="4"  fill="white"   opacity="0.4"/>
    <circle cx="100" cy="10"  r="7" fill="${C.eye}" opacity="0.9"/>
    <circle cx="100" cy="190" r="7" fill="${C.eye}" opacity="0.9"/>
    <circle cx="187" cy="143" r="6" fill="${C.out}" opacity="0.7"/>
    <circle cx="13"  cy="57"  r="6" fill="${C.out}" opacity="0.7"/>
  </svg>`;
}

function renderMascot(state, skipAnim) {
  mascotBigSvg.innerHTML = getMascotSVG(state);
  if (!skipAnim) {
    mascotBigSvg.classList.remove('state-idle','state-happy','state-wow','state-error','state-eat');
    void mascotBigSvg.offsetWidth;
    mascotBigSvg.classList.add(`state-${state}`);
  }
}

// ============================================================
// EYE TRACKING - las pupilas siguen al cursor/plato
// ============================================================
const EYE_MAX = 5.5; // unidades SVG maximas de desplazamiento
const EYE_LERP = 0.09;

function startEyeTracking() {
  eyeState.active = true;
  if (!eyeState.rafId) eyeRafLoop();
}

function stopEyeTracking() {
  eyeState.targetX = 0;
  eyeState.targetY = 0;
  // El loop sigue hasta llegar al centro
}

function setEyeTarget(clientX, clientY) {
  const rect = mascotBigSvg.getBoundingClientRect();
  if (!rect.width) return;
  const cx = rect.left + rect.width  * 0.5;
  const cy = rect.top  + rect.height * 0.42; // centro ocular aprox
  const dx = clientX - cx;
  const dy = clientY - cy;
  const dist  = Math.sqrt(dx * dx + dy * dy);
  const factor = Math.min(dist / 220, 1);
  const angle  = Math.atan2(dy, dx);
  eyeState.targetX = Math.cos(angle) * EYE_MAX * factor;
  eyeState.targetY = Math.sin(angle) * EYE_MAX * factor;
}

function eyeRafLoop() {
  eyeState.currentX += (eyeState.targetX - eyeState.currentX) * EYE_LERP;
  eyeState.currentY += (eyeState.targetY - eyeState.currentY) * EYE_LERP;

  const pL = mascotBigSvg.querySelector('#mascotPupilL');
  const pR = mascotBigSvg.querySelector('#mascotPupilR');
  const tx = eyeState.currentX.toFixed(3);
  const ty = eyeState.currentY.toFixed(3);
  if (pL) pL.setAttribute('transform', `translate(${tx},${ty})`);
  if (pR) pR.setAttribute('transform', `translate(${tx},${ty})`);

  const dist = Math.abs(eyeState.currentX - eyeState.targetX) + Math.abs(eyeState.currentY - eyeState.targetY);
  if (eyeState.active || dist > 0.05) {
    eyeState.rafId = requestAnimationFrame(eyeRafLoop);
  } else {
    eyeState.rafId = null;
  }
}

// Seguimiento del cursor en toda la pantalla 2
document.addEventListener('mousemove', (e) => {
  if (currentScreen !== 'deliver') return;
  setEyeTarget(e.clientX, e.clientY);
  if (!eyeState.rafId) {
    eyeState.active = true;
    eyeRafLoop();
  }
  // Si el cursor sale de la ventana, el eye tracking se detiene al soltar
});

// ============================================================
// EVALUACION DE COMBINACIONES
// ============================================================
function evaluateCombination(ids) {
  const total = ids.size;
  if (total === 0) return null;
  for (const combo of COMBINATIONS) {
    if (combo.minTotal >= 4 && total >= combo.minTotal) {
      if (combo.required.every(id => ids.has(id))) return combo;
    }
    if (combo.required.length > 0) {
      const req = combo.required.every(id => ids.has(id));
      const exc = !combo.excluded || combo.excluded.every(id => !ids.has(id));
      if (req && exc) return combo;
    }
  }
  return COMBINATIONS[COMBINATIONS.length - 1]; // fallback error
}

function getHint(ids) {
  const c = evaluateCombination(ids);
  return c ? c.hintText : '';
}

// ============================================================
// PANTALLA 1: UI DEL PLATO
// ============================================================
function updatePlateUI() {
  const n = plateIngredients.size;
  plateCount.textContent = `${n} ingrediente${n !== 1 ? 's' : ''}`;
  const pct = Math.round((n / 5) * 100);
  mixBarFill.style.width = `${pct}%`;
  const levels = ['Sin ingredientes','Iniciando mezcla','Mezcla en proceso','Mezcla avanzada','Casi lista','Lista para entregar'];
  mixLabel.textContent = levels[Math.min(n, 5)];
  const grads = [null,
    'linear-gradient(90deg,#334155,#475569)',
    'linear-gradient(90deg,#6ee7f7,#a78bfa)',
    'linear-gradient(90deg,#a78bfa,#fb923c)',
    'linear-gradient(90deg,#fb923c,#fbbf24)',
    'linear-gradient(90deg,#34d399,#6ee7f7)',
  ];
  if (grads[n]) mixBarFill.style.background = grads[n];
  btnContinuar.disabled = n === 0;
  if (platePlaceholder) platePlaceholder.style.display = n > 0 ? 'none' : 'block';
  updateHintPreview();
  ingredCards.forEach(c => c.classList.toggle('in-plate', plateIngredients.has(c.dataset.id)));
}

function updateHintPreview() {
  const hasIng = plateIngredients.size > 0;
  mixPreviewHint.hidden = !hasIng;
  document.querySelector('.mix-preview-empty').style.display = hasIng ? 'none' : 'flex';
  if (!hasIng) return;
  hintAtoms.innerHTML = '';
  plateIngredients.forEach(id => {
    const cfg = INGREDIENTS[id];
    if (!cfg) return;
    const d = document.createElement('div');
    d.className = 'hint-atom';
    d.style.color = cfg.color; d.style.borderColor = cfg.color;
    d.style.boxShadow = `0 0 8px ${cfg.color}55`;
    hintAtoms.appendChild(d);
  });
  hintText.textContent = getHint(plateIngredients);
}

function addChipToPlate(id) {
  const cfg = INGREDIENTS[id];
  if (!cfg) return;
  const chip = document.createElement('div');
  chip.className = 'plate-chip'; chip.dataset.id = id;
  chip.style.color = cfg.color;
  chip.style.backgroundColor = cfg.color + '18';
  chip.style.borderColor = cfg.color + '60';
  const lbl = document.createElement('span'); lbl.textContent = cfg.shortLabel;
  const rm  = document.createElement('span'); rm.className = 'chip-remove'; rm.textContent = 'x';
  rm.setAttribute('aria-label', `Quitar ${cfg.label}`);
  rm.addEventListener('click', e => { e.stopPropagation(); removeFromPlate(id); });
  chip.appendChild(lbl); chip.appendChild(rm);
  plateContents.appendChild(chip);
}

function removeFromPlate(id) {
  plateIngredients.delete(id);
  const chip = plateContents.querySelector(`.plate-chip[data-id="${id}"]`);
  if (chip) chip.remove();
  updatePlateUI();
}

// ============================================================
// DRAG HTML5: Ingredientes → Plato (Pantalla 1)
// ============================================================
function setupIngredientDrag() {
  ingredCards.forEach(card => {
    card.addEventListener('dragstart', e => {
      if (plateIngredients.has(card.dataset.id)) { e.preventDefault(); return; }
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.id);
      e.dataTransfer.setData('source', 'ingredient');
      requestAnimationFrame(() => card.classList.add('dragging'));
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.dataset.id;
        if (!plateIngredients.has(id)) { plateIngredients.add(id); addChipToPlate(id); updatePlateUI(); }
      }
    });
  });
}

function setupPlateDropZone() {
  plateDropzone.addEventListener('dragover', e => {
    e.preventDefault(); e.dataTransfer.dropEffect = 'move';
    plateDropzone.classList.add('drag-over');
  });
  plateDropzone.addEventListener('dragleave', e => {
    if (!plateDropzone.contains(e.relatedTarget)) plateDropzone.classList.remove('drag-over');
  });
  plateDropzone.addEventListener('drop', e => {
    e.preventDefault(); plateDropzone.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    if (!id || !INGREDIENTS[id] || plateIngredients.has(id)) return;
    plateIngredients.add(id); addChipToPlate(id); updatePlateUI();
  });
}

// ============================================================
// DRAG LIBRE: Plato → Mascota (Pantalla 2, pointer events)
// El "ghost" del plato sigue al cursor; el original se atenua.
// ============================================================
function setupPlateFreeGrab() {
  draggablePlate.addEventListener('mousedown', onPlateMouseDown);
  // Soporte tactil
  draggablePlate.addEventListener('touchstart', onPlateTouchStart, { passive: false });
}

function onPlateMouseDown(e) {
  if (resultRevealed || e.button !== 0) return;
  e.preventDefault();
  const rect = draggablePlate.getBoundingClientRect();
  freeDrag.offsetX = e.clientX - (rect.left + rect.width  * 0.5);
  freeDrag.offsetY = e.clientY - (rect.top  + rect.height * 0.5);
  startFreeDrag(e.clientX, e.clientY);
  document.addEventListener('mousemove', onPlateDragMove);
  document.addEventListener('mouseup',   onPlateDragEnd);
}

function onPlateTouchStart(e) {
  if (resultRevealed) return;
  e.preventDefault();
  const t = e.touches[0];
  const rect = draggablePlate.getBoundingClientRect();
  freeDrag.offsetX = t.clientX - (rect.left + rect.width * 0.5);
  freeDrag.offsetY = t.clientY - (rect.top  + rect.height * 0.5);
  startFreeDrag(t.clientX, t.clientY);
  document.addEventListener('touchmove', onPlateTouchMove, { passive: false });
  document.addEventListener('touchend',  onPlateTouchEnd);
}

function startFreeDrag(x, y) {
  freeDrag.active = true;
  draggablePlate.classList.add('is-grabbed');
  plateGhost.hidden = false;
  movePlateGhost(x, y);
  startEyeTracking();
}

function movePlateGhost(x, y) {
  plateGhost.style.left = `${x - freeDrag.offsetX}px`;
  plateGhost.style.top  = `${y - freeDrag.offsetY}px`;
  setEyeTarget(x, y);
  // Detectar si el ghost esta sobre la drop zone
  const dz = mascotDropZone.getBoundingClientRect();
  const over = x >= dz.left && x <= dz.right && y >= dz.top && y <= dz.bottom;
  freeDrag.overZone = over;
  mascotDropZone.classList.toggle('drag-over', over);
  plateGhost.classList.toggle('over-mascot', over);
}

function onPlateDragMove(e) { if (freeDrag.active) movePlateGhost(e.clientX, e.clientY); }
function onPlateTouchMove(e) {
  if (!freeDrag.active) return;
  e.preventDefault();
  const t = e.touches[0];
  movePlateGhost(t.clientX, t.clientY);
}

function onPlateDragEnd() {
  if (!freeDrag.active) return;
  freeDrag.active = false;
  draggablePlate.classList.remove('is-grabbed');
  plateGhost.hidden = true;
  mascotDropZone.classList.remove('drag-over');
  plateGhost.classList.remove('over-mascot');
  document.removeEventListener('mousemove', onPlateDragMove);
  document.removeEventListener('mouseup',   onPlateDragEnd);
  stopEyeTracking();
  if (freeDrag.overZone && !resultRevealed) startEating();
}

function onPlateTouchEnd(e) {
  if (!freeDrag.active) return;
  // Determinar posicion final
  const t = e.changedTouches[0];
  freeDrag.active = false;
  draggablePlate.classList.remove('is-grabbed');
  plateGhost.hidden = true;
  mascotDropZone.classList.remove('drag-over');
  document.removeEventListener('touchmove', onPlateTouchMove);
  document.removeEventListener('touchend',  onPlateTouchEnd);
  stopEyeTracking();
  const dz = mascotDropZone.getBoundingClientRect();
  const over = t.clientX >= dz.left && t.clientX <= dz.right && t.clientY >= dz.top && t.clientY <= dz.bottom;
  if (over && !resultRevealed) startEating();
}

// ============================================================
// ZONA DE DROP DE LA MASCOTA (click y teclado como alternativa)
// ============================================================
function setupMascotDropZone() {
  mascotDropZone.addEventListener('click', () => {
    if (!resultRevealed) startEating();
  });
  mascotDropZone.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && !resultRevealed) {
      e.preventDefault(); startEating();
    }
  });
}

// ============================================================
// ANIMACION DE COMER + EVALUACION
// ============================================================
function startEating() {
  if (resultRevealed) return;
  resultRevealed = true;

  // Bloquear plato
  draggablePlate.classList.add('delivered');
  if (dragInstruction) dragInstruction.textContent = 'Entregado';

  // Marcar drop zone como entregado
  mascotDropZone.classList.add('delivered');
  if (dropZoneLabel) dropZoneLabel.textContent = 'Recibido';

  // Animacion "comer"
  renderMascot('eat');
  mascotBigSvg.classList.add('state-eat');

  // Tras la animacion de comer, mostrar reaccion y dialogo
  setTimeout(() => {
    currentCombo = evaluateCombination(plateIngredients);
    if (!currentCombo) return;
    renderMascot(currentCombo.mascotState);
    // Iniciar dialogo typewriter
    setTimeout(() => initDialog(currentCombo), 350);
  }, 700);
}

// ============================================================
// NAVEGACION ENTRE PANTALLAS
// ============================================================
function goToDeliver() {
  if (plateIngredients.size === 0) return;
  step1Dot.classList.remove('active'); step2Dot.classList.add('active');
  screenPrep.hidden = true; screenPrep.classList.remove('active');
  screenDeliver.hidden = false; screenDeliver.classList.add('active');
  currentScreen = 'deliver';
  buildMiniPlate(); buildDeliverIngList();
  renderMascot('idle');
  resultWaiting.hidden = false; resultFull.hidden = true;
  resultRevealed = false; currentCombo = null;
  mascotDialogWrap.hidden = true;
  deliverResultArea.className = 'deliver-result-area';
  draggablePlate.classList.remove('delivered','is-grabbed');
  mascotDropZone.classList.remove('delivered','drag-over');
  if (dragInstruction) dragInstruction.textContent = 'Arrastra hacia la mascota';
  if (dropZoneLabel) dropZoneLabel.textContent = 'Soltar aqui';
  // Iniciar eye tracking idle
  startEyeTracking();
}

function goToPrep() {
  step2Dot.classList.remove('active'); step1Dot.classList.add('active');
  screenDeliver.hidden = true; screenDeliver.classList.remove('active');
  screenPrep.hidden = false; screenPrep.classList.add('active');
  currentScreen = 'prep';
  stopEyeTracking();
}

function reiniciar() {
  plateIngredients.clear();
  plateContents.querySelectorAll('.plate-chip').forEach(c => c.remove());
  if (platePlaceholder) platePlaceholder.style.display = 'block';
  updatePlateUI();
  resultRevealed = false;
  twState.timerId && clearTimeout(twState.timerId);
  goToPrep();
}

// ============================================================
// MINI-PLATO (Pantalla 2)
// ============================================================
function buildMiniPlate() {
  miniPlateChips.innerHTML = '';
  plateGhostChips.innerHTML = '';
  plateIngredients.forEach(id => {
    const cfg = INGREDIENTS[id];
    if (!cfg) return;
    // Chip en el mini plato original
    const d1 = makeDot(cfg.color);
    miniPlateChips.appendChild(d1);
    // Chip en el ghost
    const d2 = makeDot(cfg.color);
    plateGhostChips.appendChild(d2);
  });
}
function makeDot(color) {
  const d = document.createElement('div');
  d.style.cssText = `width:8px;height:8px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color};display:inline-block;margin:2px;`;
  return d;
}

function buildDeliverIngList() {
  deliverIngList.innerHTML = '';
  plateIngredients.forEach(id => {
    const cfg = INGREDIENTS[id];
    if (!cfg) return;
    const item = document.createElement('div'); item.className = 'deliver-ing-item';
    const dot  = document.createElement('div'); dot.className  = 'deliver-ing-dot';
    dot.style.color = cfg.color; dot.style.background = cfg.color; dot.style.boxShadow = `0 0 6px ${cfg.color}`;
    const lbl = document.createElement('span'); lbl.textContent = cfg.label;
    item.appendChild(dot); item.appendChild(lbl);
    deliverIngList.appendChild(item);
  });
}

// ============================================================
// SISTEMA DE DIALOGOS CON TYPEWRITER
// ============================================================

/** Inicializa el dialogo para una combinacion dada. */
function initDialog(combo) {
  twState.pages = combo.dialog || [];
  if (twState.pages.length === 0) {
    renderResult(combo); return;
  }
  twState.pageIndex = 0;
  twState.charIndex = 0;

  // Construir indicadores de punto
  buildPageDots(twState.pages.length, 0);

  mascotDialogWrap.hidden = false;
  btnTwTheory.hidden = true;
  showDialogPage(0, combo);
}

function buildPageDots(total, current) {
  dialogPageIndicator.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dialog-dot' + (i === current ? ' active' : '');
    dialogPageIndicator.appendChild(d);
  }
}

/** Muestra una pagina del dialogo con efecto typewriter. */
function showDialogPage(index, combo) {
  const text = twState.pages[index];
  buildPageDots(twState.pages.length, index);

  dialogText.textContent = '';
  twCursor.classList.remove('hidden');
  btnTwNext.disabled = true;
  btnTwSkip.style.display = 'inline-block';
  btnTwTheory.hidden = true;

  clearTimeout(twState.timerId);
  twState.charIndex = 0;
  twState.isTyping  = true;

  const SPEED = 22; // ms por caracter

  function typeChar() {
    if (twState.charIndex < text.length) {
      dialogText.textContent += text[twState.charIndex++];
      twState.timerId = setTimeout(typeChar, SPEED);
    } else {
      // Texto completo
      twState.isTyping = false;
      twCursor.classList.add('hidden');
      btnTwSkip.style.display = 'none';

      const isLast = (index >= twState.pages.length - 1);
      btnTwNext.disabled = isLast;
      if (isLast) {
        btnTwTheory.hidden = false;
      }
    }
  }
  typeChar();

  // Guardar combo como closure via el boton "siguiente"
  twState._combo = combo;
}

/** Salta al final del texto actual si aun esta escribiendo. */
function skipTypewriter() {
  if (!twState.isTyping) return;
  clearTimeout(twState.timerId);
  twState.isTyping = false;
  dialogText.textContent = twState.pages[twState.pageIndex];
  twCursor.classList.add('hidden');
  btnTwSkip.style.display = 'none';
  const isLast = (twState.pageIndex >= twState.pages.length - 1);
  btnTwNext.disabled = isLast;
  if (isLast) btnTwTheory.hidden = false;
}

/** Avanza a la siguiente pagina del dialogo. */
function nextDialogPage() {
  twState.pageIndex++;
  if (twState.pageIndex < twState.pages.length) {
    showDialogPage(twState.pageIndex, twState._combo);
  }
}

function setupDialogControls() {
  btnTwSkip.addEventListener('click', skipTypewriter);
  btnTwNext.addEventListener('click', nextDialogPage);
  btnTwTheory.addEventListener('click', () => {
    renderResult(twState._combo);
  });
  // Click en el area de texto tambien skippea
  document.getElementById('dialogTextArea').addEventListener('click', () => {
    if (twState.isTyping) skipTypewriter();
  });
}

// ============================================================
// RENDERIZAR RESULTADO EDUCATIVO COMPLETO
// ============================================================
function renderResult(combo) {
  deliverResultArea.className = `deliver-result-area state-${combo.state}`;
  resultBadgeBig.style.background = combo.badgeColor;
  resultBadgeBig.style.boxShadow  = `0 0 16px ${combo.badgeColor}`;
  resultFullTitle.textContent      = combo.title;
  resultFullSubtitle.textContent   = combo.subtitle;
  theoryExplanation.textContent    = combo.explanation;

  formulaCards.innerHTML = '';
  combo.formulas.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.style.setProperty('--formula-color', f.color);
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <span class="formula-name">${f.name}</span>
      <div class="formula-eq">${f.eq}</div>
      <pre class="formula-vars">${f.vars}</pre>`;
    formulaCards.appendChild(card);
  });

  if (combo.application) {
    applicationsText.textContent = combo.application;
    applicationsBlock.hidden = false;
  } else { applicationsBlock.hidden = true; }

  if (combo.fact) {
    factContent.textContent = combo.fact;
    factBlock.hidden = false;
  } else { factBlock.hidden = true; }

  resultWaiting.hidden = true;
  resultFull.hidden    = false;
  setTimeout(() => deliverResultArea.scrollTop = 0, 80);
}

// ============================================================
// BOTONES GENERALES
// ============================================================
function setupButtons() {
  btnContinuar.addEventListener('click', goToDeliver);
  btnLimpiar.addEventListener('click', () => {
    plateIngredients.clear();
    plateContents.querySelectorAll('.plate-chip').forEach(c => c.remove());
    if (platePlaceholder) platePlaceholder.style.display = 'block';
    updatePlateUI();
  });
  btnVolver.addEventListener('click', () => { stopEyeTracking(); goToPrep(); });
  btnReiniciar.addEventListener('click', reiniciar);
}

// ============================================================
// ARRANQUE
// ============================================================
init();
