import type { ServicePageData } from "@/lib/servicePages.data";

const hvacServices: ServicePageData[] = [
  {
    slug: "ac-installation",
    title: "AC Installation",
    h1: "AC Installation in Hanford, CA",
    metaTitle: "AC Installation Hanford CA | Central AC & Heat Pumps | Hanford HVAC Pros",
    metaDescription:
      "Central AC and heat pump installation in Hanford, CA. SEER2-compliant systems sized for Kings County heat. Licensed C-20 contractor. Free estimates — (559) 585-4000.",
    summary:
      "A new AC system is the right call when your unit is 12+ years old, the compressor has failed, or repeated repairs no longer hold through the summer. We install central AC, heat pumps, and ductless systems sized for your home's actual load across Kings County.",
    bullets: [
      "Central air conditioning — 15–18 SEER2 systems matched to your home's cooling load",
      "Heat pumps — efficient cooling and heating in one system, ideal for valley climates",
      "Ductless mini-splits for additions, garages, and zoned comfort",
      "Manual J load calculation — no lazy oversizing that short-cycles and wastes power",
      "California Title 24 Part 6 documentation and permit coordination with the City of Hanford",
      "Old equipment haul-away and refrigerant recovery by EPA 608 certified techs",
    ],
    faqs: [
      {
        q: "How much does AC installation cost in Hanford, CA?",
        a: "A central AC replacement in Hanford runs $6,000–$12,000 for a 1,500–2,500 sq ft home. Heat pumps run $9,000–$16,000. Final cost depends on SEER2 rating, ductwork condition, and electrical upgrades. We provide free written estimates.",
      },
      {
        q: "How long does an AC installation take?",
        a: "Most residential AC changeouts are completed in one day. Full system installs that include new ductwork or electrical may take two days. We pull permits with the City of Hanford and schedule around the forecast during peak heat.",
      },
      {
        q: "What size AC do I need for my Hanford home?",
        a: "Sizing depends on square footage, insulation, window exposure, and ductwork — not just a rule of thumb. We run a Manual J load calculation. Oversized units short-cycle, cool unevenly, and cost more to run; correct sizing matters more in valley heat.",
      },
    ],
    relatedServices: ["ac-repair", "ductwork", "furnace-heating"],
    estimateRange: "$6,000 – $16,000",
    urgency: "standard",
  },
  {
    slug: "ac-repair",
    title: "AC Repair",
    h1: "AC Repair in Hanford, CA",
    metaTitle: "AC Repair Hanford CA | Same-Day Cooling Service | Hanford HVAC Pros",
    metaDescription:
      "Fast AC repair in Hanford, CA. No cooling, weak airflow, frozen coils, failed capacitors. Same-day service in summer. Call (559) 585-4000.",
    summary:
      "A dead AC in 105°F Kings County heat can't wait. Our repair techs cover Hanford and surrounding communities, responding same day during cooling season for no-cooling calls, weak airflow, frozen coils, refrigerant leaks, and electrical failures.",
    bullets: [
      "No-cooling and weak-cooling diagnosis — capacitors, contactors, compressors, fan motors",
      "Refrigerant leak detection and recharge (R-410A and R-454B systems)",
      "Frozen evaporator coil and airflow troubleshooting",
      "Thermostat and control board repair and replacement",
      "Condenser coil cleaning — critical in Kings County's ag-dust environment",
      "Up-front repair pricing before any work begins",
    ],
    faqs: [
      {
        q: "How quickly can you fix a broken AC in Hanford?",
        a: "During cooling season we target same-day service for no-cooling calls, Monday through Saturday, 7am–8pm. Most common failures — capacitors, contactors, fan motors — are stocked and repaired in a single visit.",
      },
      {
        q: "How much does AC repair cost in Hanford?",
        a: "Minor repairs like a failed capacitor or contactor run $150–$450. Refrigerant recharge, fan motor, or control board repairs range from $400–$1,500. A written estimate is provided before any work begins.",
      },
      {
        q: "Is it worth repairing my old AC or should I replace it?",
        a: "If your system is under 10 years old and the repair is a few hundred dollars, repair usually makes sense. For 12+ year-old units facing a compressor or coil failure, replacement often costs less over time given the efficiency gain. We give you both numbers, no pressure.",
      },
    ],
    relatedServices: ["emergency-hvac-repair", "ac-installation", "hvac-maintenance"],
    estimateRange: "$150 – $1,500",
    urgency: "standard",
  },
  {
    slug: "furnace-heating",
    title: "Furnace & Heating",
    h1: "Furnace & Heating Repair — Hanford, CA",
    metaTitle: "Furnace Repair Hanford CA | Heating Service & Install | Hanford HVAC Pros",
    metaDescription:
      "Furnace and heating repair, replacement, and tune-ups in Hanford, CA. Gas furnaces and heat pumps. Safety inspections included. Call (559) 585-4000.",
    summary:
      "Tule-fog winters and valley cold snaps make reliable heat a real need in Kings County. We repair, replace, and tune gas furnaces and heat pumps, with a combustion and carbon-monoxide safety check on every heating visit.",
    bullets: [
      "Gas furnace repair — ignitors, flame sensors, gas valves, blower motors, and heat exchangers",
      "Furnace replacement — 90%+ AFUE high-efficiency systems",
      "Heat pump heating repair and cold-climate performance tuning",
      "Carbon monoxide and combustion safety inspection on every visit",
      "Thermostat upgrades and zoning",
      "Pre-winter tune-ups to catch failures before the first cold night",
    ],
    faqs: [
      {
        q: "My furnace won't turn on — can you come today?",
        a: "During heating season we prioritize no-heat calls and target same-day service Mon–Sat, 7am–8pm. Common causes like a failed ignitor or flame sensor are stocked and usually fixed in one visit.",
      },
      {
        q: "How much does a new furnace cost in Hanford?",
        a: "A high-efficiency gas furnace replacement runs $4,500–$8,500 installed for most Hanford homes, depending on size and efficiency rating. Heat pump systems that handle both heating and cooling cost more but replace two systems. We provide free written estimates.",
      },
      {
        q: "Do you check for carbon monoxide?",
        a: "Yes. Every heating service includes a combustion and carbon-monoxide safety check. Cracked heat exchangers and blocked flues are dangerous and easy to miss without testing — it's standard on all our furnace visits.",
      },
    ],
    relatedServices: ["hvac-maintenance", "ductwork", "ac-installation"],
    estimateRange: "$200 – $8,500",
    urgency: "standard",
  },
  {
    slug: "ductwork",
    title: "Ductwork",
    h1: "Ductwork Repair & Replacement — Hanford, CA",
    metaTitle: "Ductwork Hanford CA | Duct Sealing & Replacement | Hanford HVAC Pros",
    metaDescription:
      "Duct sealing, repair, and replacement in Hanford, CA. Cut cooling bills and fix uneven rooms. Licensed C-20 contractor. Free estimates — (559) 585-4000.",
    summary:
      "Leaky ducts waste up to 30% of the air your system produces — a big deal when your AC runs for months in valley heat. We seal, repair, and replace ductwork to fix uneven rooms, weak airflow, and high summer bills across Kings County.",
    bullets: [
      "Duct leak testing and sealing (mastic and Aeroseal-style methods)",
      "Full duct replacement for crushed, disconnected, or asbestos-era systems",
      "Room-to-room balancing to fix that one room that's always too hot",
      "Attic duct insulation upgrades — critical where runs bake in 140°F+ attics",
      "Return-air sizing corrections for better airflow and efficiency",
      "Title 24 duct-sealing verification for permits and rebates",
    ],
    faqs: [
      {
        q: "How do I know if my ducts are leaking?",
        a: "Common signs are rooms that never reach temperature, high summer bills despite a working AC, and visible dust around vents. A duct leakage test measures it directly. In Kings County heat, sealing leaky attic ducts often pays for itself in a season or two.",
      },
      {
        q: "How much does duct sealing cost in Hanford?",
        a: "Duct sealing typically runs $1,000–$3,000 depending on system size and access. Full duct replacement ranges from $3,500–$8,000. We test first and recommend sealing versus replacement based on the actual condition, not a sales script.",
      },
      {
        q: "Can bad ductwork make my AC less effective?",
        a: "Yes — even a perfectly sized, brand-new AC will underperform on leaky or undersized ducts. Sealing and correcting ductwork is often the highest-value HVAC improvement in older Hanford homes, and it's cheaper than upsizing equipment.",
      },
    ],
    relatedServices: ["ac-installation", "hvac-maintenance", "furnace-heating"],
    estimateRange: "$1,000 – $8,000",
    urgency: "standard",
  },
  {
    slug: "hvac-maintenance",
    title: "HVAC Maintenance",
    h1: "HVAC Maintenance & Tune-Ups — Hanford, CA",
    metaTitle: "HVAC Maintenance Hanford CA | AC & Furnace Tune-Ups | Hanford HVAC Pros",
    metaDescription:
      "Seasonal HVAC maintenance and tune-ups in Hanford, CA. Keep your system efficient through valley heat and cold. Maintenance plans available. Call (559) 585-4000.",
    summary:
      "Kings County systems work harder than most — months of 100°F+ cooling, ag dust on every coil, and fog-season heating. Seasonal maintenance keeps efficiency up, catches small failures before they strand you, and keeps manufacturer warranties valid.",
    bullets: [
      "Spring AC tune-up — coil cleaning, refrigerant check, capacitor and contactor test",
      "Fall furnace tune-up — ignition, gas pressure, and carbon-monoxide safety check",
      "Condenser coil cleaning to counter Kings County ag dust buildup",
      "Filter service and airflow verification",
      "Electrical connection and amperage checks to catch failing parts early",
      "Maintenance plans with priority scheduling and repair discounts",
    ],
    faqs: [
      {
        q: "How often should I service my HVAC system in the Central Valley?",
        a: "Twice a year: AC in spring, heating in fall. Valley conditions — extreme heat, ag dust, long run times — are harder on equipment than most climates, so the twice-yearly schedule matters more here than the industry default.",
      },
      {
        q: "Is a maintenance plan worth it?",
        a: "For most homeowners, yes. A plan covers both seasonal tune-ups, adds priority scheduling during peak heat, and usually includes repair discounts. It also keeps most manufacturer warranties valid — many require documented annual service.",
      },
      {
        q: "Will maintenance actually lower my energy bill?",
        a: "A dirty condenser coil and low refrigerant can cut efficiency 10–20%, which is real money over a valley cooling season. Maintenance restores designed efficiency and extends equipment life — the two together usually more than cover the cost.",
      },
    ],
    relatedServices: ["ac-repair", "furnace-heating", "ductwork"],
    estimateRange: "$120 – $350 per visit",
    urgency: "standard",
  },
  {
    slug: "emergency-hvac-repair",
    title: "Emergency HVAC Repair",
    h1: "Emergency HVAC Repair — Kings County",
    metaTitle: "Emergency HVAC Repair Hanford CA | Same-Day AC & Heat | Hanford HVAC Pros",
    metaDescription:
      "Emergency HVAC repair in Hanford, CA. No cooling in a heat wave or no heat in a cold snap. Same-day dispatch. Call now: (559) 585-4000.",
    summary:
      "When your AC quits in a July heat wave or your furnace dies on the coldest foggy morning, you need a tech fast. We dispatch same-day emergency service across Hanford, Lemoore, Corcoran, and Armona, Mon–Sat, 7am–8pm.",
    bullets: [
      "Same-day no-cooling response during summer heat waves",
      "No-heat emergency service during winter cold snaps and fog",
      "Failed compressor, capacitor, and fan-motor diagnosis on arrival",
      "Refrigerant leak containment and emergency recharge",
      "Priority scheduling for households with seniors, infants, or medical needs",
      "Up-front pricing before any emergency work begins",
    ],
    faqs: [
      {
        q: "Do you offer 24/7 emergency HVAC service?",
        a: "We operate Mon–Sat, 7am–8pm. For after-hours emergencies, leave a message and a technician calls back first thing in the morning. Most emergency calls during business hours are handled same day.",
      },
      {
        q: "My AC died in a heat wave — how fast can you get here?",
        a: "During heat waves we prioritize no-cooling calls and target same-day dispatch across Hanford, Lemoore, Corcoran, and Armona. Households with seniors, infants, or medical needs move to the front of the queue.",
      },
      {
        q: "What does an emergency HVAC call cost?",
        a: "Emergency diagnostic and repair pricing is provided up front before any work begins. Common failures like capacitors and contactors are stocked, so most emergency repairs are completed in a single visit at standard repair rates during business hours.",
      },
    ],
    relatedServices: ["ac-repair", "furnace-heating", "ac-installation"],
    estimateRange: "$150 – $1,800",
    urgency: "emergency",
  },
];

export default hvacServices;
