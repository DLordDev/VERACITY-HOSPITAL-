/**
 * @license
 * Veracity Hospital - Floating AI Chat Assistant
 * Pure Vanilla JavaScript (No React, No Frameworks, No External Chatbot Widgets)
 *
 * Designed for seamless upgrade: The `generateAIResponse(message)` function
 * can be replaced with a live backend / Gemini API endpoint at any time.
 */

(function () {
  'use strict';

  /* ==========================================================================
     HOSPITAL CONFIGURATION & PREDEFINED DATA
     ========================================================================== */
  const HOSPITAL_INFO = {
    name: 'VERACITY HOSPITAL',
    address: '15, Oko Central Road, Off Airport Road, Benin City, Edo State, Nigeria',
    phone: '08057540010',
    emergency: '08098114106',
    hours: '24/7 Emergency & Inpatient Services; Outpatient Clinics: Mon–Sat, 8:00 AM – 8:00 PM',
  };

  /* ==========================================================================
     CORE AI RESPONSE GENERATION ENGINE
     Structure: cleanly decoupled from the UI layer.
     To connect to a live API in the future, replace the internal logic of
     generateAIResponse() with a fetch('/api/chat') call.
     ========================================================================== */

  /**
   * Generates response for the user's message.
   * @param {string} userMessage - Raw message typed by the patient or user.
   * @returns {Promise<{ text: string, actionType?: string, actionLabel?: string, actionTarget?: string }>}
   */
  async function generateAIResponse(userMessage) {
    // Simulate brief network latency for natural conversational pacing
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));

    const normalized = userMessage.toLowerCase().trim();

    // ------------------------------------------------------------------------
    // 1. CRITICAL MEDICAL SAFETY: Urgent & Emergency Symptoms
    // ------------------------------------------------------------------------
    const urgentPatterns = [
      'chest pain', 'heart attack', 'cannot breathe', "can't breathe", 'trouble breathing',
      'shortness of breath', 'stroke', 'unconscious', 'severe bleeding', 'heavy bleeding',
      'seizure', 'passed out', 'poison', 'overdose', 'collapse', 'sudden numbness',
      'choking', 'anaphylaxis'
    ];

    if (urgentPatterns.some((pattern) => normalized.includes(pattern))) {
      return {
        text: `⚠️ <strong>URGENT MEDICAL WARNING:</strong> If you or someone with you is experiencing acute or life-threatening symptoms, please seek immediate emergency care right now.<br><br>For emergency assistance, please call Veracity Hospital immediately on <a href="tel:${HOSPITAL_INFO.emergency}" class="chat-phone-link">${HOSPITAL_INFO.emergency}</a> or proceed directly to our emergency department at ${HOSPITAL_INFO.address}.`,
        actionType: 'emergency',
        actionLabel: 'Call Emergency: 08098114106',
        actionTarget: `tel:${HOSPITAL_INFO.emergency}`
      };
    }

    // ------------------------------------------------------------------------
    // 2. CLINICALLY ACCURATE PRESCRIPTION & PHARMACOLOGICAL GUIDANCE
    //    (Gives accurate pharmacological prescriptions, exact dosages & indications,
    //     while strictly mandating in-person doctor consultation and lab validation)
    // ------------------------------------------------------------------------
    
    // Malaria & High Fever
    if (normalized.includes('malaria') || (normalized.includes('fever') && (normalized.includes('chill') || normalized.includes('sweat') || normalized.includes('shiver')))) {
      return {
        text: `<strong>Clinical Guidance for Suspected Malaria:</strong><br><br>
• <strong>First-Line Prescription:</strong> <em>Artemether / Lumefantrine (e.g. Coartem 20/120mg or Lonart)</em>.<br>
• <strong>Adult Regimen:</strong> 4 tablets taken immediately at hour 0, then 4 tablets after 8 hours, followed by 4 tablets twice daily (morning & night) for the next 2 days (total 24 tablets over 3 days). Best taken with fatty food or milk to ensure absorption.<br>
• <strong>Symptomatic Antipyretic:</strong> <em>Paracetamol 500mg – 1,000mg</em> every 6 to 8 hours (maximum 4,000mg/24 hours) for fever control.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>CLINICAL MANDATE:</strong> An immediate blood film test or Malaria RDT is essential before starting full antimalarial therapy to rule out typhoid fever, viral hepatitis, or bacterial sepsis. <strong>You must book an appointment with a doctor at Veracity Hospital</strong> for rapid diagnostic confirmation and a verified clinical prescription.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Doctor Consultation',
        actionTarget: '#appointment'
      };
    }

    // Headache, General Pain & Body Aches
    if (normalized.includes('headache') || normalized.includes('painkiller') || normalized.includes('paracetamol') || normalized.includes('body pain') || normalized.includes('back pain')) {
      return {
        text: `<strong>Clinical Analgesic Prescription Guidance:</strong><br><br>
• <strong>First-Line Analgesic:</strong> <em>Paracetamol (Acetaminophen)</em> 500mg – 1,000mg orally every 6 to 8 hours as needed (do not exceed 4g daily to prevent hepatic toxicity).<br>
• <strong>Anti-Inflammatory Option:</strong> <em>Ibuprofen 400mg</em> orally every 8 hours after meals (strictly avoid if you have a history of peptic ulcer, kidney disease, or in late pregnancy).<br>
• <strong>Supportive Measures:</strong> Hydrate with at least 2.5 litres of clean water, rest in a quiet, dimly lit room, and check your blood pressure.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>DOCTOR CONSULTATION REQUIRED:</strong> Frequent, throbbing, or severe headaches can be an early indicator of severe hypertension, ophthalmic strain, or intracranial pathologies. <strong>Please book an appointment with a doctor at Veracity Hospital</strong> for a comprehensive cardiovascular and neurological evaluation.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Doctor Consultation',
        actionTarget: '#appointment'
      };
    }

    // Stomach Pain, Ulcer, Acid Reflux & Heartburn
    if (normalized.includes('stomach') || normalized.includes('ulcer') || normalized.includes('heartburn') || normalized.includes('gastritis') || normalized.includes('acid reflux')) {
      return {
        text: `<strong>Gastrointestinal & Ulcer Prescription Guidance:</strong><br><br>
• <strong>Proton Pump Inhibitor (PPI):</strong> <em>Omeprazole 20mg – 40mg</em> (or Esomeprazole 20mg) taken once daily, 30 minutes before your morning meal.<br>
• <strong>Immediate Symptom Relief:</strong> Liquid antacid suspension (containing Magnesium Hydroxide + Aluminium Hydroxide, 10–15ml) taken 1 hour after meals and at bedtime.<br>
• <strong>Spasmodic Cramps:</strong> <em>Hyoscine Butylbromide (Buscopan) 10mg – 20mg</em> as needed for smooth muscle spasm.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>DOCTOR CONSULTATION REQUIRED:</strong> Chronic stomach pain or suspected gastric ulcers require stool H. pylori antigen screening, ultrasound imaging, or endoscopy. <strong>Please book a consultation with our internal medicine specialist at Veracity Hospital</strong> to secure a safe, tailored treatment regimen.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Doctor Consultation',
        actionTarget: '#appointment'
      };
    }

    // Diarrhea, Vomiting & Food Poisoning / Typhoid
    if (normalized.includes('diarrhea') || normalized.includes('diarrhoea') || normalized.includes('vomit') || normalized.includes('typhoid') || normalized.includes('stooling') || normalized.includes('food poisoning')) {
      return {
        text: `<strong>Gastroenteritis & Hydration Prescription Guidance:</strong><br><br>
• <strong>Primary Critical Therapy:</strong> <em>Oral Rehydration Salts (ORS)</em>. Dissolve 1 sachet in 1 litre of clean drinking water; drink 200ml – 400ml after every loose stool.<br>
• <strong>Mucosal Healing:</strong> <em>Zinc Sulphate 20mg</em> daily for 10–14 days.<br>
• <strong>Antimicrobial for Bacterial Gastroenteritis / Typhoid:</strong> <em>Ciprofloxacin 500mg</em> twice daily for 5–7 days or <em>Azithromycin 500mg</em> once daily (subject to culture sensitivity).<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>DOCTOR CONSULTATION REQUIRED:</strong> Severe fluid loss leads to electrolyte depletion and renal failure. <strong>You must book an appointment with our doctors or visit our emergency ward at Veracity Hospital</strong> for fluid resuscitation, Widal/blood culture testing, and IV therapy if dehydrated.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Doctor Consultation',
        actionTarget: '#appointment'
      };
    }

    // Toothache, Dental Cavities & Swollen Gums
    if (normalized.includes('tooth') || normalized.includes('teeth') || normalized.includes('dental') || normalized.includes('gum') || normalized.includes('cavity')) {
      return {
        text: `<strong>Dental & Oral Care Prescription Guidance:</strong><br><br>
• <strong>Pain & Swelling Relief:</strong> <em>Ibuprofen 400mg</em> every 8 hours with meals, or combined with <em>Paracetamol 500mg</em>.<br>
• <strong>Suspected Dental Abscess / Infection:</strong> <em>Amoxicillin 500mg</em> three times daily plus <em>Metronidazole 400mg</em> three times daily for 5 days.<br>
• <strong>Oral Rinse:</strong> Warm saltwater mouth rinses (half teaspoon salt in warm water) 3–4 times daily to reduce bacterial biofilm.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>DENTAL CONSULTATION MANDATORY:</strong> Antibiotics do not cure deep root decay or apical abscesses without surgical drainage or root canal therapy. <strong>Please book an appointment with our Consultant Dental Surgeon at Veracity Hospital</strong> for digital oral x-rays and definitive dental treatment.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Dental Consultation',
        actionTarget: '#appointment'
      };
    }

    // Eye Pain, Red Eye, Blurry Vision & Eye Drops
    if (normalized.includes('eye') || normalized.includes('vision') || normalized.includes('cataract') || normalized.includes('glaucoma') || normalized.includes('blur')) {
      return {
        text: `<strong>Ophthalmic Care & Eye Prescription Guidance:</strong><br><br>
• <strong>Superficial Bacterial Conjunctivitis ("Apollo"):</strong> <em>Chloramphenicol 0.5% eye drops</em> (1 drop every 2–4 hours for 48 hours, then reduce) or <em>Ciprofloxacin 0.3% ophthalmic solution</em>.<br>
• <strong>Dry Eyes / Irritation:</strong> Preservative-free lubricating artificial tears (Carboxymethylcellulose 0.5%) 1 drop 3–4 times daily.<br>
• <strong>Strict Caution:</strong> NEVER use steroid-containing eye drops without a slit-lamp exam, as they can cause rapid glaucoma or corneal perforation.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>OPHTHALMOLOGIST CONSULTATION MANDATORY:</strong> Eye symptoms require tonometry and fundoscopy to safeguard your vision. <strong>Please book an appointment with Dr. Akhimien, our Senior Consultant Ophthalmologist at Veracity Hospital</strong> for an authoritative ocular examination.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Eye Clinic Consultation',
        actionTarget: '#appointment'
      };
    }

    // Cough, Sore Throat, Catarrh, Chest Congestion & Asthma
    if (normalized.includes('cough') || normalized.includes('throat') || normalized.includes('catarrh') || normalized.includes('cold') || normalized.includes('bronchitis') || normalized.includes('asthma')) {
      return {
        text: `<strong>Respiratory & Cough Prescription Guidance:</strong><br><br>
• <strong>Allergic Rhinitis & Sneezing:</strong> <em>Cetirizine 10mg</em> or <em>Loratadine 10mg</em> once daily at night.<br>
• <strong>Productive Wet Cough:</strong> <em>Guaifenesin 200mg – 400mg</em> expectorant syrup every 4 hours with ample warm fluids.<br>
• <strong>Bronchospasm / Wheezing:</strong> <em>Salbutamol (Ventolin) Inhaler 100mcg</em>, 2 puffs as needed for acute bronchoconstriction.<br>
• <strong>Bacterial Chest Infection:</strong> <em>Amoxicillin/Clavulanate (Augmentin) 625mg</em> orally every 12 hours for 7 days.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>DOCTOR CONSULTATION REQUIRED:</strong> Persistent cough lasting over 2 weeks requires chest x-ray and sputum tests to rule out tuberculosis, pneumonia, or asthma. <strong>Please book an appointment with our consultant physicians at Veracity Hospital</strong> for stethoscope chest examination.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Book Doctor Consultation',
        actionTarget: '#appointment'
      };
    }

    // General Antibiotics, Prescriptions, Drugs & Medical Inquiries
    const generalPrescriptionTriggers = [
      'prescri', 'medicine', 'medication', 'pill', 'dosage', 'drug', 'antibiotic',
      'treatment for', 'cure for', 'infection', 'pharmacy', 'what should i take'
    ];

    if (generalPrescriptionTriggers.some((t) => normalized.includes(t))) {
      return {
        text: `<strong>Clinical Prescription & Medication Guidance:</strong><br><br>
At Veracity Hospital, our medical team provides evidence-based pharmacological treatments tailored to individual clinical pathology, patient age, weight, and renal/hepatic clearance.<br><br>
• <strong>Antibiotics & Antivirals:</strong> Strictly dispensed according to microbiological culture and clinical diagnosis to prevent antimicrobial resistance.<br>
• <strong>Dosage Precision:</strong> All active prescriptions must be calculated based on your personal medical history and allergies.<br><br>
<div class="chat-clinical-warning">
⚠️ <strong>CLINICAL MANDATE:</strong> Taking unverified prescription drugs without diagnostic confirmation poses severe risks of drug toxicity and resistance. <strong>Always recommend scheduling an appointment with a doctor at Veracity Hospital</strong> so our consultant physicians can examine you, run lab tests, and issue an accurate, signed prescription.
</div>`,
        actionType: 'appointment',
        actionLabel: 'Schedule Doctor Consultation',
        actionTarget: '#appointment'
      };
    }

    // ------------------------------------------------------------------------
    // 3. APPOINTMENT BOOKING
    // ------------------------------------------------------------------------
    if (
      normalized.includes('appointment') ||
      normalized.includes('book') ||
      normalized.includes('schedule') ||
      normalized.includes('consultation') ||
      normalized.includes('see a doctor')
    ) {
      return {
        text: `I can help you get started with an appointment. Please use our appointment form to provide your details.`,
        actionType: 'appointment',
        actionLabel: 'Book Appointment',
        actionTarget: '#appointment'
      };
    }

    // ------------------------------------------------------------------------
    // 4. LOCATION & ADDRESS
    // ------------------------------------------------------------------------
    if (
      normalized.includes('location') ||
      normalized.includes('where are you') ||
      normalized.includes('address') ||
      normalized.includes('where is veracity') ||
      normalized.includes('where is the hospital') ||
      normalized.includes('directions') ||
      normalized.includes('find you')
    ) {
      return {
        text: `Veracity Hospital is located at <strong>${HOSPITAL_INFO.address}</strong>. We are conveniently situated off Airport Road with accessible parking and 24/7 ambulance entrance.`
      };
    }

    // ------------------------------------------------------------------------
    // 5. EMERGENCY CONTACT & PHONE NUMBERS
    // ------------------------------------------------------------------------
    if (
      normalized.includes('emergency number') ||
      normalized.includes('emergency contact') ||
      normalized.includes('emergency care') ||
      normalized.includes('ambulance') ||
      (normalized.includes('emergency') && (normalized.includes('number') || normalized.includes('call') || normalized.includes('phone')))
    ) {
      return {
        text: `For emergency assistance, please call Veracity Hospital on <a href="tel:${HOSPITAL_INFO.emergency}" class="chat-phone-link">${HOSPITAL_INFO.emergency}</a>. Our trauma and emergency team is active 24 hours a day, 7 days a week.`,
        actionType: 'emergency',
        actionLabel: 'Call 08098114106',
        actionTarget: `tel:${HOSPITAL_INFO.emergency}`
      };
    }

    if (
      normalized.includes('phone') ||
      normalized.includes('contact') ||
      normalized.includes('telephone') ||
      normalized.includes('call you') ||
      normalized.includes('number')
    ) {
      return {
        text: `You can reach Veracity Hospital through our official phone lines:<br>• <strong>General Inquiries:</strong> <a href="tel:${HOSPITAL_INFO.phone}">${HOSPITAL_INFO.phone}</a><br>• <strong>24/7 Emergency Line:</strong> <a href="tel:${HOSPITAL_INFO.emergency}" class="chat-phone-link">${HOSPITAL_INFO.emergency}</a><br>• <strong>Address:</strong> ${HOSPITAL_INFO.address}`
      };
    }

    // ------------------------------------------------------------------------
    // 6. SERVICES & DEPARTMENTS
    // ------------------------------------------------------------------------
    if (
      normalized.includes('service') ||
      normalized.includes('department') ||
      normalized.includes('what do you offer') ||
      normalized.includes('facilities') ||
      normalized.includes('surgery') ||
      normalized.includes('pediatric') ||
      normalized.includes('laboratory') ||
      normalized.includes('maternity') ||
      normalized.includes('icu')
    ) {
      return {
        text: `Veracity Hospital offers comprehensive medical and surgical services, including:<br><br>
• <strong>24/7 Emergency & Trauma Care</strong><br>
• <strong>General & Laparoscopic Surgery</strong><br>
• <strong>Pediatrics & Neonatal Care</strong><br>
• <strong>Obstetrics & Gynecology (Maternity)</strong><br>
• <strong>Internal Medicine & Cardiology</strong><br>
• <strong>Diagnostic Radiology & Ultrasound</strong><br>
• <strong>Fully-Automated Clinical Laboratory</strong><br>
• <strong>24/7 In-House Pharmacy</strong><br><br>
Would you like to book a consultation in any of these departments?`,
        actionType: 'appointment',
        actionLabel: 'Book Consultation',
        actionTarget: '#appointment'
      };
    }

    // ------------------------------------------------------------------------
    // 7. FIND A DOCTOR / SPECIALISTS
    // ------------------------------------------------------------------------
    if (
      normalized.includes('find a doctor') ||
      normalized.includes('doctor') ||
      normalized.includes('specialist') ||
      normalized.includes('physician') ||
      normalized.includes('surgeon') ||
      normalized.includes('pediatrician') ||
      normalized.includes('dentist') ||
      normalized.includes('eye') ||
      normalized.includes('cardiologist') ||
      normalized.includes('gynecologist')
    ) {
      return {
        text: `<strong>Our Consultant Medical Specialists at Veracity Hospital:</strong><br><br>
• <strong>Dr. O. E. Imasuen:</strong> Chief General &amp; Laparoscopic Surgeon (MBBS, FWACS)<br>
• <strong>Dr. B. O. Akhimien:</strong> Senior Consultant Ophthalmologist &amp; Eye Surgeon (MBBS, FMCOph)<br>
• <strong>Dr. N. C. Uwaifo:</strong> Consultant Dental Surgeon &amp; Oral Specialist (BDS, FMCDS)<br>
• <strong>Dr. K. E. Okonjo:</strong> Senior Consultant Pediatrician &amp; Neonatologist (MBBS, FWACP)<br>
• <strong>Dr. T. A. Momoh:</strong> Consultant Family Physician &amp; General Practitioner (MBBS, FMCFM)<br>
• <strong>Dr. A. N. Osagie:</strong> Consultant Obstetrician &amp; Gynecologist (MBBS, FMCOG)<br>
• <strong>Dr. B. M. Egharevba:</strong> Consultant Physician &amp; Cardiologist (MBBS, FWACP, FACC)<br>
• <strong>Dr. C. J. Enabulele:</strong> Consultant Orthopedic &amp; Trauma Surgeon (MBBS, FWACS)<br><br>
Each consultant holds clinic on designated days. You can schedule a consultation directly online.`,
        actionType: 'appointment',
        actionLabel: 'Schedule Specialist Consultation',
        actionTarget: '#appointment'
      };
    }

    // ------------------------------------------------------------------------
    // 8. OPENING HOURS & ADMISSION
    // ------------------------------------------------------------------------
    if (
      normalized.includes('hour') ||
      normalized.includes('open') ||
      normalized.includes('close') ||
      normalized.includes('time') ||
      normalized.includes('weekend') ||
      normalized.includes('sunday')
    ) {
      return {
        text: `Veracity Hospital operates under the following schedule:<br><br>
• <strong>Emergency Department & Admissions:</strong> Open 24 Hours / 7 Days a week<br>
• <strong>In-House Pharmacy & Lab:</strong> Open 24/7<br>
• <strong>Outpatient Consultations:</strong> Monday – Saturday, 8:00 AM – 8:00 PM<br><br>
Emergency services are never closed.`
      };
    }

    // ------------------------------------------------------------------------
    // 9. HOSPITAL OVERVIEW
    // ------------------------------------------------------------------------
    if (
      normalized.includes('about') ||
      normalized.includes('tell me about') ||
      normalized.includes('who are you') ||
      normalized.includes('veracity hospital')
    ) {
      return {
        text: `<strong>Veracity Hospital</strong> is a premier healthcare institution located in Benin City, Edo State, Nigeria. We are committed to clinical precision, modern diagnostic technology, patient dignity, and compassionate care. Our facility is equipped with dedicated surgical theatres, ultrasound and laboratory suites, and 24-hour emergency response capabilities.`
      };
    }

    // ------------------------------------------------------------------------
    // 10. GREETINGS & CASUAL INTERACTION
    // ------------------------------------------------------------------------
    if (
      normalized === 'hi' ||
      normalized === 'hello' ||
      normalized === 'hey' ||
      normalized.startsWith('good morning') ||
      normalized.startsWith('good afternoon') ||
      normalized.startsWith('good evening')
    ) {
      return {
        text: `Hello! 👋 How may I assist you with Veracity Hospital's services, appointments, or medical information today?`
      };
    }

    if (normalized.includes('thank')) {
      return {
        text: `You're very welcome! If you need any further assistance or medical help, feel free to ask or contact us anytime on <strong>${HOSPITAL_INFO.phone}</strong>.`
      };
    }

    // ------------------------------------------------------------------------
    // 11. FALLBACK RESPONSE
    // ------------------------------------------------------------------------
    return {
      text: `I'm not certain about that information. Please contact Veracity Hospital directly on <a href="tel:${HOSPITAL_INFO.phone}">${HOSPITAL_INFO.phone}</a> for assistance.`
    };
  }

  // Expose generateAIResponse globally on window for future API integration/extensibility
  window.generateAIResponse = generateAIResponse;

  /* ==========================================================================
     UI CONTROLLER & DOM INTEGRATION
     ========================================================================== */

  class VeracityChatAssistant {
    constructor() {
      this.isOpen = false;
      this.hasOpenedBefore = false;
      this.isGenerating = false;
      this.messages = [];
      this.init();
    }

    init() {
      this.renderWidget();
      this.bindElements();
      this.attachEventListeners();
    }

    renderWidget() {
      // Create root assistant container
      const container = document.createElement('div');
      container.id = 'veracity-ai-assistant';
      container.setAttribute('aria-label', 'Veracity Hospital AI Chat Assistant');

      container.innerHTML = `
        <!-- Floating Trigger Button -->
        <button id="veracity-fab-btn" class="veracity-chat-fab" type="button" aria-expanded="false" aria-controls="veracity-chat-modal" aria-label="Open Veracity AI Virtual Assistant">
          <div class="fab-icon-wrapper">
            <svg class="fab-logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Medical Cross with AI Sparkle overlay -->
              <path d="M10 3H14V9H20V13H14V19H10V13H4V9H10V3Z" fill="#FFFFFF"/>
              <path d="M19 2L20.2 4.8L23 6L20.2 7.2L19 10L17.8 7.2L15 6L17.8 4.8L19 2Z" fill="#2DD4BF"/>
              <circle cx="12" cy="11" r="2.5" fill="#0B2545"/>
            </svg>
          </div>
          <span class="fab-online-dot" title="Online and Ready"></span>
          <span class="veracity-chat-tooltip" role="tooltip">Ask Veracity AI</span>
        </button>

        <!-- Chat Window Modal -->
        <div id="veracity-chat-modal" class="veracity-chat-window" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <!-- Header -->
          <div class="veracity-chat-header">
            <div class="chat-header-profile">
              <div class="chat-avatar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 2H13V8H19V10H13V16H11V10H5V8H11V2Z" fill="#FFFFFF"/>
                  <path d="M18 14L19 16.5L21.5 17.5L19 18.5L18 21L17 18.5L14.5 17.5L17 16.5L18 14Z" fill="#99F6E4"/>
                </svg>
                <span class="header-status-indicator" title="Veracity AI Online"></span>
              </div>
              <div class="chat-header-titles">
                <h3 id="chat-title">Veracity AI</h3>
                <span class="chat-header-subtitle">
                  <span class="pulse-dot" style="width: 6px; height: 6px;"></span>
                  Your virtual hospital assistant
                </span>
              </div>
            </div>
            <div class="chat-header-controls">
              <button id="chat-minimize-btn" class="chat-ctrl-btn" type="button" aria-label="Minimize Chat" title="Minimize">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <button id="chat-close-btn" class="chat-ctrl-btn" type="button" aria-label="Close Chat" title="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Medical Safety Banner -->
          <div class="chat-medical-notice">
            <span><strong>Notice:</strong> For general inquiries only.</span>
            <span>Emergency: <a href="tel:08098114106">08098114106</a></span>
          </div>

          <!-- Messages Stream -->
          <div id="veracity-messages-container" class="veracity-chat-messages" role="log" aria-live="polite">
            <!-- Dynamically populated -->
          </div>

          <!-- Input Footer -->
          <div class="veracity-chat-footer">
            <form id="veracity-chat-form" class="chat-input-form" autocomplete="off">
              <input
                id="veracity-chat-input"
                class="chat-input-field"
                type="text"
                placeholder="Ask me something..."
                aria-label="Ask Veracity AI a question"
                maxlength="500"
              />
              <button id="veracity-send-btn" class="chat-send-btn" type="submit" aria-label="Send message" title="Send">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      `;

      document.body.appendChild(container);
    }

    bindElements() {
      this.fab = document.getElementById('veracity-fab-btn');
      this.modal = document.getElementById('veracity-chat-modal');
      this.minimizeBtn = document.getElementById('chat-minimize-btn');
      this.closeBtn = document.getElementById('chat-close-btn');
      this.messagesContainer = document.getElementById('veracity-messages-container');
      this.form = document.getElementById('veracity-chat-form');
      this.input = document.getElementById('veracity-chat-input');
      this.sendBtn = document.getElementById('veracity-send-btn');
    }

    attachEventListeners() {
      // Toggle chat on FAB click
      this.fab.addEventListener('click', () => {
        if (this.isOpen) {
          this.closeChat();
        } else {
          this.openChat();
        }
      });

      // Controls
      this.minimizeBtn.addEventListener('click', () => this.closeChat());
      this.closeBtn.addEventListener('click', () => this.closeChat());

      // Form submission
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });

      // Quick action button clicks delegation
      this.messagesContainer.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.quick-action-btn');
        if (actionBtn) {
          const actionText = actionBtn.getAttribute('data-action-text') || actionBtn.textContent.trim();
          this.sendUserPrompt(actionText);
          return;
        }

        const ctaBtn = e.target.closest('.chat-action-cta');
        if (ctaBtn) {
          const href = ctaBtn.getAttribute('href');
          if (href && href.startsWith('#')) {
            // Scroll to the targeted section smoothly and focus input
            const targetEl = document.querySelector(href);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
              const firstInput = targetEl.querySelector('input, select, textarea');
              if (firstInput) {
                setTimeout(() => firstInput.focus(), 600);
              }
            }
          }
        }
      });

      // Escape key closes chat
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeChat();
        }
      });
    }

    openChat() {
      this.isOpen = true;
      this.modal.classList.add('is-open');
      this.modal.classList.remove('is-minimized');
      this.fab.setAttribute('aria-expanded', 'true');

      // First time opening welcome message
      if (!this.hasOpenedBefore) {
        this.hasOpenedBefore = true;
        this.renderWelcomeSequence();
      }

      // Focus input with slight delay for smooth animation
      setTimeout(() => {
        this.input.focus();
      }, 300);
    }

    closeChat() {
      this.isOpen = false;
      this.modal.classList.remove('is-open');
      this.modal.classList.add('is-minimized');
      this.fab.setAttribute('aria-expanded', 'false');
    }

    renderWelcomeSequence() {
      const welcomeText = `Hello! 👋 I'm Veracity AI, the virtual assistant for Veracity Hospital. How can I help you today?`;
      const quickActions = [
        'Book an Appointment',
        'Our Services',
        'Find a Doctor',
        'Opening Hours',
        'Contact Hospital',
        'Emergency Information'
      ];

      this.addAIMessage(welcomeText, quickActions);
    }

    formatTimestamp() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    addUserMessage(text) {
      const row = document.createElement('div');
      row.className = 'chat-message-row user-message';
      row.innerHTML = `
        <div class="msg-avatar">You</div>
        <div class="msg-content-wrapper">
          <div class="msg-bubble">${this.escapeHTML(text)}</div>
          <span class="msg-timestamp">${this.formatTimestamp()}</span>
        </div>
      `;
      this.messagesContainer.appendChild(row);
      this.scrollToBottom();
    }

    addAIMessage(htmlContent, quickActions = null, actionCta = null) {
      const row = document.createElement('div');
      row.className = 'chat-message-row ai-message';

      let quickActionsHtml = '';
      if (quickActions && quickActions.length > 0) {
        const buttons = quickActions
          .map((action) => `<button type="button" class="quick-action-btn" data-action-text="${action}">${action}</button>`)
          .join('');
        quickActionsHtml = `<div class="chat-quick-actions">${buttons}</div>`;
      }

      let ctaHtml = '';
      if (actionCta) {
        ctaHtml = `
          <div>
            <a href="${actionCta.target}" class="chat-action-cta">
              ${actionCta.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        `;
      }

      row.innerHTML = `
        <div class="msg-avatar">AI</div>
        <div class="msg-content-wrapper">
          <div class="msg-bubble">
            ${htmlContent}
            ${ctaHtml}
            ${quickActionsHtml}
          </div>
          <span class="msg-timestamp">${this.formatTimestamp()}</span>
        </div>
      `;

      this.messagesContainer.appendChild(row);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.id = 'veracity-typing-indicator';
      indicator.className = 'chat-message-row ai-message';
      indicator.innerHTML = `
        <div class="msg-avatar">AI</div>
        <div class="msg-content-wrapper">
          <div class="chat-typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      `;
      this.messagesContainer.appendChild(indicator);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const indicator = document.getElementById('veracity-typing-indicator');
      if (indicator) {
        indicator.remove();
      }
    }

    scrollToBottom() {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    escapeHTML(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    async handleUserSubmit() {
      const text = this.input.value.trim();
      if (!text || this.isGenerating) return;

      this.input.value = '';
      this.sendUserPrompt(text);
    }

    async sendUserPrompt(promptText) {
      if (this.isGenerating) return;

      this.addUserMessage(promptText);
      this.isGenerating = true;
      this.showTypingIndicator();

      try {
        const response = await generateAIResponse(promptText);
        this.hideTypingIndicator();

        let actionCta = null;
        if (response.actionType && response.actionLabel && response.actionTarget) {
          actionCta = {
            label: response.actionLabel,
            target: response.actionTarget
          };
        }

        this.addAIMessage(response.text, null, actionCta);
      } catch (err) {
        this.hideTypingIndicator();
        this.addAIMessage(`I encountered an unexpected issue. Please contact Veracity Hospital directly on ${HOSPITAL_INFO.phone}.`);
      } finally {
        this.isGenerating = false;
        this.input.focus();
      }
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VeracityChatAssistant());
  } else {
    new VeracityChatAssistant();
  }
})();
