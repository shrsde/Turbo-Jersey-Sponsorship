'use client';

import { useState } from 'react';

const TSPCJerseyPricing = () => {
  const [scenario, setScenario] = useState('mid');
  const [framing, setFraming] = useState('A');
  const [expandedSection, setExpandedSection] = useState('cost');
  const [showMathBreakdown, setShowMathBreakdown] = useState(false);

  // Brand palette — straight from Turbo brand guide
  const colors = {
    cream: '#F5F1EA',           // page background (Turbo Fog/Cloud mix)
    creamDark: '#EDE8DF',       // card surfaces on cream
    forest: '#053117',          // primary dark — text and blocks
    forestMid: '#0B4023',
    apple: '#AAE8AC',           // Apple Cider — accent highlights
    appleDeep: '#8FD191',       // hover on apple
    sage: '#3B634C',            // muted green
    ground: '#9F9D9A',          // grey accents
    fog: '#D1CECB',             // light grey
    cloud: '#FFFFFF',
    noir: '#141714',            // deepest contrast
    forestDim: 'rgba(5, 49, 23, 0.7)',
    forestFaint: 'rgba(5, 49, 23, 0.4)',
    forestLine: 'rgba(5, 49, 23, 0.12)',
    forestHair: 'rgba(5, 49, 23, 0.2)'
  };

  const scenarios = {
    low: {
      label: 'Low',
      description: 'Year 1 floor — lightly attended',
      jerseys: 350, supplierCost: 60, margin: 15, allIn: 75,
      subtotal: 26250, hst: 3412, total: 29662, turboMargin: 5250,
      impressions: 672000, winterTeams: 10, summerTeams: 16, playerSeasons: 552
    },
    mid: {
      label: 'Mid',
      description: 'Plan against this — realistic target',
      jerseys: 860, supplierCost: 55, margin: 15, allIn: 70,
      subtotal: 60200, hst: 7826, total: 68026, turboMargin: 12900,
      impressions: 1651200, winterTeams: 25, summerTeams: 40, playerSeasons: 1380
    },
    high: {
      label: 'High',
      description: 'Capacity ceiling — full hum',
      jerseys: 1390, supplierCost: 55, margin: 15, allIn: 70,
      subtotal: 97300, hst: 12649, total: 109949, turboMargin: 20850,
      impressions: 2668800, winterTeams: 40, summerTeams: 65, playerSeasons: 2220
    }
  };

  const current = scenarios[scenario];

  const seasons = [
    { label: 'S1 · Fall', dates: 'Oct 5, 2026 → Dec 27, 2026', weeks: '12 weeks', nights: 'Mon · Tue · Fri · Sat · Sun', rate: '$239 / player', paymentDue: 'Oct 1, 2026', paymentLabel: 'Q1 sponsor payment' },
    { label: 'S2 · Winter', dates: 'Jan 4, 2027 → Mar 28, 2027', weeks: '12 weeks', nights: 'Mon · Tue · Fri · Sat · Sun', rate: '$239 / player', paymentDue: 'Jan 1, 2027', paymentLabel: 'Q2 sponsor payment' },
    { label: 'S3 · Spring', dates: 'Apr 5, 2027 → Jun 27, 2027', weeks: '12 weeks', nights: 'Mon · Tue · Fri · Sat · Sun', rate: '$239 / player', paymentDue: 'Apr 1, 2027', paymentLabel: 'Q3 sponsor payment' },
    { label: 'S4 · Summer', dates: 'Jul 5, 2027 → Sep 26, 2027', weeks: '12 weeks', nights: 'Mon–Fri · Sun (no Sat)', rate: '$159 / player', paymentDue: 'Jul 1, 2027', paymentLabel: 'Q4 sponsor payment' }
  ];

  const framingATiers = [
    { name: 'Front Chest', share: 0.52, paymentType: 'flexible', description: 'Primary logo on every league jersey. Largest visual impact. Available as quarterly or annual commitment.', avenueShare: 1.0 },
    { name: 'Left Sleeve', share: 0.20, paymentType: 'yearly', description: 'Logo on left sleeve, every jersey. Annual commitment only.', avenueShare: 1.0 },
    { name: 'Right Sleeve', share: 0.20, paymentType: 'yearly', description: 'Logo on right sleeve, every jersey. Annual commitment only.', avenueShare: 1.0 },
    { name: 'Left Chest', share: 0.08, paymentType: 'yearly', description: 'Small logo on left chest, every jersey. Annual commitment only.', avenueShare: 1.0 }
  ];

  const framingBTiers = [
    { name: 'Front Chest — Men\'s', isFrontAvenue: true, avenueShare: 0.30, paymentType: 'flexible', description: 'Logo on every Men\'s avenue jersey. ~648 players/year.', audienceNote: 'Largest audience — best reach' },
    { name: 'Front Chest — Women\'s', isFrontAvenue: true, avenueShare: 0.20, paymentType: 'flexible', description: 'Logo on every Women\'s avenue jersey. ~432 players/year.', audienceNote: 'Category exclusive — women-focused brand fit' },
    { name: 'Front Chest — Mixed', isFrontAvenue: true, avenueShare: 0.25, paymentType: 'flexible', description: 'Logo on every Mixed avenue jersey. ~540 players/year.', audienceNote: 'Broadest audience profile' },
    { name: 'Front Chest — Rec', isFrontAvenue: true, avenueShare: 0.15, paymentType: 'flexible', description: 'Logo on every Rec avenue jersey. ~324 players/year.', audienceNote: 'Casual player demographic' },
    { name: 'Front Chest — Competitive', isFrontAvenue: true, avenueShare: 0.10, paymentType: 'flexible', description: 'Logo on every Competitive avenue jersey. ~216 players/year.', audienceNote: 'Niche premium audience — performance brands' },
    { name: 'Left Sleeve', share: 0.17, avenueShare: 1.0, paymentType: 'yearly', description: 'League-wide, every jersey. Annual commitment only.' },
    { name: 'Right Sleeve', share: 0.17, avenueShare: 1.0, paymentType: 'yearly', description: 'League-wide, every jersey. Annual commitment only.' },
    { name: 'Left Chest', share: 0.11, avenueShare: 1.0, paymentType: 'yearly', description: 'League-wide, every jersey. Annual commitment only.' }
  ];

  const currentTiers = framing === 'A' ? framingATiers : framingBTiers;

  const calcTierPrice = (tier) => {
    if (tier.isFrontAvenue) {
      const frontChestPoolShare = 0.55;
      const pricePerAvenue = (current.total * frontChestPoolShare) / 5;
      return Math.round(pricePerAvenue / 100) * 100;
    }
    return Math.round(current.total * tier.share / 100) * 100;
  };

  const calcCPM = (tier) => {
    const price = calcTierPrice(tier);
    const impressions = current.impressions * tier.avenueShare;
    return (price / impressions) * 1000;
  };

  const formatCurrency = (n) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
  const formatCurrencyDec = (n) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const formatNumber = (n) => new Intl.NumberFormat('en-US').format(n);

  const channels = [
    { name: 'Facebook / Instagram', cpm: '$8–$15', quality: 'Scroll-past, brief', duration: 'Days' },
    { name: 'Local newspaper', cpm: '$25–$50', quality: 'Declining readership', duration: 'Single issue' },
    { name: 'Radio (local)', cpm: '$15–$30', quality: 'Passive, no visual', duration: '30s spots' },
    { name: 'Billboards (small market)', cpm: '$5–$10', quality: 'Drive-by, high-volume', duration: 'Monthly' }
  ];

  const turboCPM = calcCPM(framingATiers[0]);

  const factors = [
    {
      title: 'Registration cannot absorb jersey cost',
      body: 'Turbo\'s registration rates ($239 Fall–Spring, $159 Summer) are already at the top of what this market is used to paying. Adding $30–$40 per player to cover jerseys would push registration to a breaking point and suppress sign-ups. Sponsorship is the only viable funding source — jerseys must be cost-neutral to the player.'
    },
    {
      title: 'The cost base is high',
      body: 'At $55–$65 per jersey and 350–1,390 jerseys annually, the cost to cover ranges from roughly $30K to $110K per year. This is the single largest lever affecting sponsorship pricing. Every dollar reduced in supplier cost flows directly to a lower sponsor ask.'
    },
    {
      title: 'Supplier versus partner',
      body: 'The current structure treats Theocy as a pure supplier — we pay full wholesale, sponsors cover the cost. A partner structure (Theocy absorbs some production cost in exchange for co-branding and multi-year volume commitment) changes the math fundamentally. This is the most important strategic question to resolve.'
    },
    {
      title: 'Volume breakpoints',
      body: 'Supplier pricing drops from $65 at <300 units to $55 at 600+ units. Locking in 600+ annually across a multi-year agreement may unlock pricing below the published tiers. This is a conversation worth having before committing to the first production run.'
    },
    {
      title: 'Demand risk protection',
      body: 'Year 1 is a Low scenario until proven otherwise. Structuring jersey production with minimum commitments (e.g. 350 units Year 1) and flex volume thereafter protects both parties. A tiered pricing agreement that rewards growth is preferable to flat pricing that penalizes a slow start.'
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: colors.cream,
      padding: '56px 24px',
      fontFamily: '"Archivo", -apple-system, BlinkMacSystemFont, sans-serif',
      color: colors.forest
    },
    inner: { maxWidth: '1180px', margin: '0 auto' },
    
    // Kicker / label treatment — all caps Archivo, very tight
    kicker: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
      textTransform: 'uppercase', color: colors.sage, marginBottom: '20px'
    },
    
    // BIG headline — Anton all caps
    h1: {
      fontFamily: '"Anton", "Archivo Black", sans-serif',
      fontSize: 'clamp(56px, 8vw, 104px)',
      lineHeight: '0.92',
      fontWeight: 400,
      color: colors.forest,
      marginBottom: '32px',
      letterSpacing: '-0.01em',
      textTransform: 'uppercase'
    },
    h1Accent: { 
      color: colors.forest,
      position: 'relative',
      display: 'inline-block',
      background: colors.apple,
      padding: '0 16px',
      marginLeft: '8px'
    },
    
    subtitle: {
      fontSize: '17px', lineHeight: '1.6', color: colors.forestDim,
      maxWidth: '720px', marginBottom: '64px', fontWeight: 400
    },
    
    // Scenario bar
    scenarioBar: {
      display: 'flex', gap: '0', alignItems: 'center', marginBottom: '80px',
      borderTop: `2px solid ${colors.forest}`,
      borderBottom: `2px solid ${colors.forest}`,
      padding: '24px 0', flexWrap: 'wrap'
    },
    scenarioLabel: {
      fontFamily: '"Archivo", sans-serif', fontSize: '11px',
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: colors.sage, marginRight: '32px', fontWeight: 600
    },
    scenarioBtn: (active) => ({
      padding: '14px 26px',
      fontFamily: '"Archivo", sans-serif',
      fontSize: '13px',
      fontWeight: active ? 700 : 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: active ? colors.forest : 'transparent',
      color: active ? colors.apple : colors.forest,
      border: `2px solid ${colors.forest}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginRight: '12px',
      borderRadius: '0'
    }),
    scenarioContext: {
      marginLeft: 'auto',
      fontFamily: '"Archivo", sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      color: colors.sage,
      fontStyle: 'italic'
    },
    
    // Section
    section: { marginBottom: '80px' },
    sectionHeader: (expanded) => ({
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      cursor: 'pointer', paddingBottom: '24px',
      borderBottom: `2px solid ${expanded ? colors.forest : colors.forestLine}`,
      marginBottom: expanded ? '48px' : '0', transition: 'all 0.3s ease'
    }),
    sectionLabel: {
      fontFamily: '"Anton", sans-serif',
      fontSize: 'clamp(36px, 5vw, 56px)',
      fontWeight: 400,
      color: colors.forest,
      letterSpacing: '-0.005em',
      lineHeight: '1',
      textTransform: 'uppercase',
      marginTop: '4px'
    },
    sectionNum: {
      fontFamily: '"Archivo", sans-serif', fontSize: '12px',
      color: colors.sage, letterSpacing: '0.2em', fontWeight: 700,
      marginBottom: '10px', textTransform: 'uppercase'
    },
    expandIcon: (expanded) => ({
      fontFamily: '"Anton", sans-serif', fontSize: '44px',
      color: expanded ? colors.forest : colors.forestFaint,
      fontWeight: 400, transition: 'color 0.2s ease', lineHeight: '0.6'
    }),
    
    // Hero cards
    hero: {
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px', marginBottom: '40px'
    },
    heroCard: {
      padding: '36px 32px',
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0'
    },
    heroCardAccent: {
      padding: '36px 32px',
      background: colors.forest,
      color: colors.apple,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0'
    },
    heroCardApple: {
      padding: '36px 32px',
      background: colors.apple,
      color: colors.forest,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0'
    },
    heroLabel: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '10px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: colors.sage,
      marginBottom: '18px',
      fontWeight: 700
    },
    heroLabelOnDark: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '10px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: colors.apple,
      marginBottom: '18px',
      fontWeight: 700
    },
    heroLabelOnApple: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '10px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: colors.forest,
      marginBottom: '18px',
      fontWeight: 700,
      opacity: 0.75
    },
    heroValue: {
      fontFamily: '"Anton", sans-serif',
      fontSize: 'clamp(44px, 5vw, 64px)',
      fontWeight: 400, lineHeight: '0.95',
      letterSpacing: '-0.01em',
      textTransform: 'uppercase'
    },
    heroSub: {
      fontSize: '13px', marginTop: '16px',
      lineHeight: '1.5', fontWeight: 500
    },
    
    // Math breakdown toggle
    mathBreakdownToggle: {
      background: 'transparent',
      border: `2px solid ${colors.forest}`,
      color: colors.forest,
      padding: '14px 22px',
      fontFamily: '"Archivo", sans-serif',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      borderRadius: '0',
      marginBottom: '32px',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    mathBreakdownPanel: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0',
      padding: '40px',
      marginBottom: '32px'
    },
    mathRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1.2fr 1fr',
      gap: '24px',
      padding: '20px 0',
      borderBottom: `1px solid ${colors.forestLine}`,
      alignItems: 'baseline'
    },
    mathRowLast: {
      display: 'grid',
      gridTemplateColumns: '2fr 1.2fr 1fr',
      gap: '24px',
      padding: '28px 28px',
      marginTop: '16px',
      background: colors.forest,
      color: colors.apple,
      alignItems: 'baseline'
    },
    mathLabel: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '15px',
      fontWeight: 600,
      color: colors.forest
    },
    mathLabelDim: {
      fontSize: '12px',
      color: colors.forestDim,
      marginTop: '4px',
      fontWeight: 400
    },
    mathValue: {
      fontFamily: '"Anton", sans-serif',
      fontSize: '28px',
      color: colors.forest,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 400,
      textTransform: 'uppercase'
    },
    mathPct: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '13px',
      fontWeight: 700,
      color: colors.sage,
      textAlign: 'right',
      letterSpacing: '0.12em'
    },
    
    // Capacity flow
    capacityFlow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '12px',
      marginBottom: '32px'
    },
    capacityCard: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      padding: '28px 24px',
      borderRadius: '0',
      position: 'relative'
    },
    capacityCardAccent: {
      background: colors.apple,
      border: `2px solid ${colors.forest}`,
      padding: '28px 24px',
      borderRadius: '0',
      position: 'relative'
    },
    capacityArrow: {
      position: 'absolute',
      right: '-18px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.forest,
      fontSize: '28px',
      fontFamily: '"Anton", sans-serif',
      zIndex: 2,
      fontWeight: 400,
      background: colors.cream,
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '1'
    },
    capacityLabel: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '10px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: colors.sage,
      marginBottom: '14px',
      fontWeight: 700
    },
    capacityNum: {
      fontFamily: '"Anton", sans-serif',
      fontSize: '52px',
      color: colors.forest,
      lineHeight: '0.95',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      textTransform: 'uppercase'
    },
    capacityUnit: {
      fontSize: '12px',
      color: colors.forestDim,
      marginTop: '10px',
      fontWeight: 500
    },
    capacityLogic: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      borderLeft: `12px solid ${colors.apple}`,
      padding: '28px 32px',
      borderRadius: '0',
      fontSize: '15px',
      color: colors.forest,
      lineHeight: '1.7',
      fontWeight: 400
    },
    
    // Calendar grid
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '12px',
      marginBottom: '24px'
    },
    calendarCard: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0',
      overflow: 'hidden'
    },
    calendarHeader: {
      background: colors.forest,
      color: colors.apple,
      padding: '16px 22px',
      fontFamily: '"Anton", sans-serif',
      fontSize: '22px',
      fontWeight: 400,
      letterSpacing: '0.01em',
      textTransform: 'uppercase'
    },
    calendarBody: {
      padding: '22px'
    },
    calendarMeta: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '9px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: colors.sage,
      marginBottom: '4px',
      fontWeight: 700
    },
    calendarValue: {
      fontSize: '13px',
      color: colors.forest,
      marginBottom: '14px',
      fontWeight: 500,
      lineHeight: '1.4'
    },
    calendarPayment: {
      background: colors.apple,
      padding: '14px 16px',
      marginTop: '18px',
      marginLeft: '-22px',
      marginRight: '-22px',
      marginBottom: '-22px',
      borderTop: `2px solid ${colors.forest}`
    },
    calendarPaymentLabel: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '9px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: colors.forest,
      marginBottom: '4px',
      fontWeight: 700,
      opacity: 0.75
    },
    calendarPaymentDate: {
      fontFamily: '"Anton", sans-serif',
      fontSize: '18px',
      color: colors.forest,
      fontWeight: 400,
      textTransform: 'uppercase'
    },
    
    // Table
    tableWrap: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0',
      overflow: 'hidden'
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
    th: {
      textAlign: 'left', padding: '20px 24px',
      fontFamily: '"Archivo", sans-serif', fontSize: '10px',
      letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
      color: colors.apple, borderBottom: `2px solid ${colors.forest}`,
      background: colors.forest
    },
    thRight: {
      textAlign: 'right', padding: '20px 24px',
      fontFamily: '"Archivo", sans-serif', fontSize: '10px',
      letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
      color: colors.apple, borderBottom: `2px solid ${colors.forest}`,
      background: colors.forest
    },
    td: {
      padding: '22px 24px',
      borderBottom: `1px solid ${colors.forestLine}`,
      verticalAlign: 'top'
    },
    tdRight: {
      padding: '22px 24px',
      borderBottom: `1px solid ${colors.forestLine}`,
      textAlign: 'right', fontVariantNumeric: 'tabular-nums', verticalAlign: 'top'
    },
    tdName: {
      fontFamily: '"Anton", sans-serif',
      fontSize: '22px',
      fontWeight: 400,
      color: colors.forest,
      textTransform: 'uppercase',
      letterSpacing: '0.005em'
    },
    tdDesc: {
      fontSize: '12px', color: colors.forestDim,
      marginTop: '8px', lineHeight: '1.5', fontWeight: 400
    },
    tdNote: {
      fontSize: '11px',
      color: colors.forest,
      marginTop: '8px',
      fontWeight: 600,
      background: colors.apple,
      padding: '4px 8px',
      display: 'inline-block',
      letterSpacing: '0.02em'
    },
    tdNumber: {
      fontFamily: '"Anton", sans-serif',
      fontSize: '28px',
      fontWeight: 400,
      color: colors.forest,
      textTransform: 'uppercase',
      letterSpacing: '-0.005em'
    },
    tdSubNumber: {
      fontSize: '10px',
      color: colors.sage,
      marginTop: '4px',
      fontVariantNumeric: 'tabular-nums',
      fontFamily: '"Archivo", sans-serif',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontWeight: 600
    },
    paymentBadge: (type) => ({
      display: 'inline-block',
      padding: '4px 10px',
      fontSize: '9px',
      fontFamily: '"Archivo", sans-serif',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      borderRadius: '0',
      marginTop: '12px',
      background: type === 'flexible' ? colors.forest : 'transparent',
      color: type === 'flexible' ? colors.apple : colors.forest,
      border: type === 'flexible' ? 'none' : `1.5px solid ${colors.forest}`,
      fontWeight: 700
    }),
    totalRow: { background: colors.apple, color: colors.forest, borderTop: `2px solid ${colors.forest}` },
    totalTd: {
      padding: '26px 24px',
      fontFamily: '"Anton", sans-serif',
      fontSize: '22px',
      fontWeight: 400,
      color: colors.forest,
      textTransform: 'uppercase'
    },
    totalTdRight: {
      padding: '26px 24px',
      textAlign: 'right',
      fontFamily: '"Anton", sans-serif',
      fontSize: '32px',
      fontWeight: 400,
      fontVariantNumeric: 'tabular-nums',
      color: colors.forest,
      textTransform: 'uppercase'
    },
    framingToggle: {
      display: 'inline-flex',
      border: `2px solid ${colors.forest}`,
      borderRadius: '0',
      marginBottom: '40px',
      overflow: 'hidden'
    },
    framingBtn: (active) => ({
      padding: '14px 22px',
      fontFamily: '"Archivo", sans-serif',
      fontSize: '11px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 700,
      background: active ? colors.forest : 'transparent',
      color: active ? colors.apple : colors.forest,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }),
    
    // Gut check
    gutCheckWrap: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      borderRadius: '0',
      overflow: 'hidden'
    },
    gutCheckHeader: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
      gap: '24px',
      padding: '18px 28px',
      background: colors.forest,
      color: colors.apple,
      borderBottom: `2px solid ${colors.forest}`
    },
    gutCheckRow: {
      display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
      gap: '24px', padding: '22px 28px',
      borderBottom: `1px solid ${colors.forestLine}`, alignItems: 'baseline'
    },
    gutCheckRowHero: {
      display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
      gap: '24px', padding: '32px 28px',
      background: colors.apple,
      color: colors.forest,
      alignItems: 'baseline',
      borderBottom: 'none',
      borderTop: `2px solid ${colors.forest}`
    },
    
    // Factor cards
    factorCard: {
      background: colors.cloud,
      border: `2px solid ${colors.forest}`,
      padding: '36px 40px',
      marginBottom: '16px',
      borderRadius: '0',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    factorCardHero: {
      background: colors.forest,
      color: colors.apple,
      border: `2px solid ${colors.forest}`,
      padding: '36px 40px',
      marginBottom: '16px',
      borderRadius: '0',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    factorNum: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '11px',
      letterSpacing: '0.22em',
      fontWeight: 700,
      marginBottom: '14px',
      textTransform: 'uppercase'
    },
    factorTitle: {
      fontFamily: '"Anton", sans-serif',
      fontSize: 'clamp(24px, 3vw, 36px)',
      fontWeight: 400,
      marginBottom: '16px',
      letterSpacing: '-0.005em',
      lineHeight: '1.05',
      textTransform: 'uppercase'
    },
    factorBody: {
      fontSize: '15px',
      lineHeight: '1.7',
      fontWeight: 400
    },
    
    footer: {
      marginTop: '120px',
      paddingTop: '40px',
      borderTop: `2px solid ${colors.forest}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: '"Archivo", sans-serif',
      fontSize: '11px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: colors.sage,
      fontWeight: 700,
      flexWrap: 'wrap',
      gap: '16px'
    },
    footerLogo: {
      fontFamily: '"Anton", sans-serif',
      fontSize: '28px',
      color: colors.forest,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      fontWeight: 400
    }
  };

  const totalPrice = currentTiers.reduce((sum, t) => sum + calcTierPrice(t), 0);

  const renderPriceCell = (tier, annual) => {
    if (tier.paymentType === 'flexible') {
      return (
        <div>
          <div style={styles.tdNumber}>{formatCurrency(annual)}</div>
          <div style={styles.tdSubNumber}>annual · or {formatCurrency(annual / 4)}/qtr</div>
        </div>
      );
    }
    return (
      <div>
        <div style={styles.tdNumber}>{formatCurrency(annual)}</div>
        <div style={styles.tdSubNumber}>annual only</div>
      </div>
    );
  };

  const supplierSubtotal = current.jerseys * current.supplierCost;
  const turboMarginSubtotal = current.jerseys * current.margin;
  const pctSupplier = supplierSubtotal / current.total;
  const pctMargin = turboMarginSubtotal / current.total;
  const pctHst = current.hst / current.total;

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; }
          body { background: ${colors.cream}; margin: 0; }
          
          .scenario-btn:hover {
            background: ${colors.forest} !important;
            color: ${colors.apple} !important;
          }
          .scenario-btn-active:hover { background: ${colors.noir} !important; }
          
          .section-header:hover .section-label { color: ${colors.sage} !important; }
          .section-header:hover .expand-icon { color: ${colors.sage} !important; }
          
          .framing-btn:hover { background: ${colors.forestHair} !important; }
          .framing-btn-active:hover { background: ${colors.noir} !important; }
          
          .factor-card:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 ${colors.forest}; }
          .factor-card-hero:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 ${colors.apple}; }
          
          .math-toggle:hover {
            background: ${colors.forest} !important;
            color: ${colors.apple} !important;
          }
          
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .section-content { animation: fadeSlide 0.35s ease-out; }
          .math-panel { animation: fadeSlide 0.3s ease-out; }
          
          @media (max-width: 900px) {
            .capacity-flow { grid-template-columns: 1fr 1fr !important; }
            .capacity-flow .arrow-right-2 { display: none !important; }
            .calendar-grid { grid-template-columns: 1fr 1fr !important; }
            .hero-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 640px) {
            .gut-check-row, .gut-check-header { grid-template-columns: 1fr !important; gap: 8px !important; }
            .capacity-flow { grid-template-columns: 1fr !important; }
            .capacity-flow .capacity-arrow { display: none !important; }
            .calendar-grid { grid-template-columns: 1fr !important; }
          }
        `}
      </style>

      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.kicker}>Turbo Sports & Performance  ·  Jersey Sponsorship Framework</div>
        <h1 style={styles.h1}>
          Derek,<br/>Here's<br/>The <span style={styles.h1Accent}>Math.</span>
        </h1>
        <p style={styles.subtitle}>
          An honest look at what our league jersey program costs, what we'd need to charge sponsors to cover it, and whether the numbers are sellable in this market. Toggle between scenarios to see the range.
        </p>

        {/* Scenario bar */}
        <div style={styles.scenarioBar}>
          <span style={styles.scenarioLabel}>Scenario</span>
          {Object.entries(scenarios).map(([key, s]) => (
            <button
              key={key}
              className={`scenario-btn ${scenario === key ? 'scenario-btn-active' : ''}`}
              style={styles.scenarioBtn(scenario === key)}
              onClick={() => setScenario(key)}
            >
              {s.label} — {formatNumber(s.jerseys)} jerseys
            </button>
          ))}
          <span style={styles.scenarioContext}>{current.description}</span>
        </div>

        {/* 01 COST */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'cost')}
            onClick={() => setExpandedSection(expandedSection === 'cost' ? null : 'cost')}>
            <div>
              <div style={styles.sectionNum}>01 / COST</div>
              <h2 className="section-label" style={styles.sectionLabel}>Cost to cover</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'cost')}>
              {expandedSection === 'cost' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'cost' && (
            <div className="section-content">
              <div className="hero-grid" style={styles.hero}>
                <div style={styles.heroCard}>
                  <div style={styles.heroLabel}>Jerseys produced</div>
                  <div style={styles.heroValue}>{formatNumber(current.jerseys)}</div>
                  <div style={{ ...styles.heroSub, color: colors.forestDim }}>Unique players × retention</div>
                </div>
                <div style={styles.heroCard}>
                  <div style={styles.heroLabel}>All-in per jersey</div>
                  <div style={styles.heroValue}>{formatCurrency(current.allIn)}</div>
                  <div style={{ ...styles.heroSub, color: colors.forestDim }}>{formatCurrency(current.supplierCost)} supplier + {formatCurrency(current.margin)} Turbo margin</div>
                </div>
                <div style={styles.heroCardApple}>
                  <div style={styles.heroLabelOnApple}>Total target / year</div>
                  <div style={styles.heroValue}>{formatCurrency(current.total)}</div>
                  <div style={{ ...styles.heroSub, color: colors.forest, opacity: 0.75 }}>Includes 13% HST</div>
                </div>
              </div>

              <button 
                className="math-toggle"
                style={styles.mathBreakdownToggle}
                onClick={() => setShowMathBreakdown(!showMathBreakdown)}
              >
                <span style={{ fontSize: '16px', lineHeight: '1' }}>{showMathBreakdown ? '−' : '+'}</span>
                <span>See the math breakdown</span>
              </button>

              {showMathBreakdown && (
                <div className="math-panel" style={styles.mathBreakdownPanel}>
                  <div style={{ marginBottom: '28px' }}>
                    <div style={styles.heroLabel}>Where every dollar goes</div>
                    <div style={{ fontSize: '15px', color: colors.forestDim, lineHeight: '1.65', fontWeight: 400, maxWidth: '680px', marginTop: '10px' }}>
                      Sponsor dollars split across three categories: the supplier (Theocy) for production, Turbo's internal margin for program management and overhead, and HST. Percentages shown are of the total target.
                    </div>
                  </div>

                  <div style={styles.mathRow}>
                    <div>
                      <div style={styles.mathLabel}>Supplier cost (Theocy)</div>
                      <div style={styles.mathLabelDim}>{formatNumber(current.jerseys)} jerseys × {formatCurrency(current.supplierCost)} per unit</div>
                    </div>
                    <div style={styles.mathValue}>{formatCurrency(supplierSubtotal)}</div>
                    <div style={styles.mathPct}>{(pctSupplier * 100).toFixed(1)}%</div>
                  </div>

                  <div style={{ ...styles.mathRow, background: colors.apple, margin: '8px -40px 8px -40px', padding: '20px 40px' }}>
                    <div>
                      <div style={styles.mathLabel}>Turbo internal margin</div>
                      <div style={styles.mathLabelDim}>{formatNumber(current.jerseys)} jerseys × {formatCurrency(current.margin)} per unit · covers admin, time, program management</div>
                    </div>
                    <div style={styles.mathValue}>{formatCurrency(turboMarginSubtotal)}</div>
                    <div style={styles.mathPct}>{(pctMargin * 100).toFixed(1)}%</div>
                  </div>

                  <div style={styles.mathRow}>
                    <div>
                      <div style={styles.mathLabel}>HST</div>
                      <div style={styles.mathLabelDim}>13% applied to subtotal</div>
                    </div>
                    <div style={styles.mathValue}>{formatCurrency(current.hst)}</div>
                    <div style={styles.mathPct}>{(pctHst * 100).toFixed(1)}%</div>
                  </div>

                  <div style={styles.mathRowLast}>
                    <div>
                      <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '11px', fontWeight: 700, color: colors.apple, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.75 }}>Total to cover</div>
                      <div style={{ fontFamily: '"Anton", sans-serif', fontSize: '24px', color: colors.apple, textTransform: 'uppercase', fontWeight: 400 }}>What sponsorship must raise</div>
                    </div>
                    <div style={{ fontFamily: '"Anton", sans-serif', fontSize: '36px', color: colors.apple, textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 400, textTransform: 'uppercase' }}>{formatCurrency(current.total)}</div>
                    <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '14px', color: colors.apple, textAlign: 'right', letterSpacing: '0.12em', fontWeight: 700 }}>100.0%</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 02 CAPACITY */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'capacity')}
            onClick={() => setExpandedSection(expandedSection === 'capacity' ? null : 'capacity')}>
            <div>
              <div style={styles.sectionNum}>02 / CONTEXT</div>
              <h2 className="section-label" style={styles.sectionLabel}>How we got here</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'capacity')}>
              {expandedSection === 'capacity' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'capacity' && (
            <div className="section-content">
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: colors.forestDim, marginBottom: '40px', maxWidth: '740px', fontWeight: 400 }}>
                The jersey count above isn't a guess — it comes from our programming structure. Slots on the field drive teams, which drive player signups, which drive unique jerseys produced per year.
              </p>

              <div className="capacity-flow" style={styles.capacityFlow}>
                <div style={styles.capacityCard}>
                  <div style={styles.capacityLabel}>Prime-time nights</div>
                  <div style={styles.capacityNum}>5</div>
                  <div style={styles.capacityUnit}>winter nights / week</div>
                  <div style={styles.capacityArrow} className="capacity-arrow">→</div>
                </div>
                <div style={styles.capacityCard}>
                  <div style={styles.capacityLabel}>Teams</div>
                  <div style={styles.capacityNum}>{current.winterTeams}</div>
                  <div style={styles.capacityUnit}>winter teams ({scenario})</div>
                  <div style={styles.capacityArrow} className="capacity-arrow arrow-right-2">→</div>
                </div>
                <div style={styles.capacityCard}>
                  <div style={styles.capacityLabel}>Player-seasons</div>
                  <div style={styles.capacityNum}>{formatNumber(current.playerSeasons)}</div>
                  <div style={styles.capacityUnit}>across all 4 seasons</div>
                  <div style={styles.capacityArrow} className="capacity-arrow">→</div>
                </div>
                <div style={styles.capacityCardAccent}>
                  <div style={{ ...styles.capacityLabel, color: colors.forest, opacity: 0.75 }}>Unique jerseys</div>
                  <div style={styles.capacityNum}>{formatNumber(current.jerseys)}</div>
                  <div style={{ ...styles.capacityUnit, color: colors.forest, opacity: 0.75 }}>produced / year</div>
                </div>
              </div>

              <div style={styles.capacityLogic}>
                <strong style={{ color: colors.forest, fontWeight: 700 }}>The logic:</strong> Prime-time slots are finite — 5 winter nights (Mon, Tue, Fri, Sat, Sun) and 6 summer nights. Each slot holds 2 teams. At {scenario === 'low' ? 'Low' : scenario === 'mid' ? 'Mid' : 'High'} sell-through, this generates {formatNumber(current.playerSeasons)} player-season registrations across the year. After accounting for ~60% cross-season retention (players who sign up for multiple sessions wear the same jersey), we produce {formatNumber(current.jerseys)} unique jerseys annually. That number drives every cost and pricing decision in this document.
              </div>
            </div>
          )}
        </section>

        {/* 03 CALENDAR */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'calendar')}
            onClick={() => setExpandedSection(expandedSection === 'calendar' ? null : 'calendar')}>
            <div>
              <div style={styles.sectionNum}>03 / CALENDAR</div>
              <h2 className="section-label" style={styles.sectionLabel}>Seasons & payment cadence</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'calendar')}>
              {expandedSection === 'calendar' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'calendar' && (
            <div className="section-content">
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: colors.forestDim, marginBottom: '40px', maxWidth: '740px', fontWeight: 400 }}>
                Four 12-week sessions across the year. Sponsors committing to quarterly payments pay at the start of each session — creating natural rhythm alignment between when sponsor dollars arrive and when jerseys are on the field.
              </p>

              <div className="calendar-grid" style={styles.calendarGrid}>
                {seasons.map((s, i) => (
                  <div key={i} style={styles.calendarCard}>
                    <div style={styles.calendarHeader}>{s.label}</div>
                    <div style={styles.calendarBody}>
                      <div style={styles.calendarMeta}>Dates</div>
                      <div style={styles.calendarValue}>{s.dates}</div>
                      
                      <div style={styles.calendarMeta}>Duration</div>
                      <div style={styles.calendarValue}>{s.weeks}</div>
                      
                      <div style={styles.calendarMeta}>League nights</div>
                      <div style={styles.calendarValue}>{s.nights}</div>
                      
                      <div style={styles.calendarMeta}>Player rate</div>
                      <div style={styles.calendarValue}>{s.rate}</div>

                      <div style={styles.calendarPayment}>
                        <div style={styles.calendarPaymentLabel}>{s.paymentLabel}</div>
                        <div style={styles.calendarPaymentDate}>{s.paymentDue}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 04 AUDIENCE */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'impressions')}
            onClick={() => setExpandedSection(expandedSection === 'impressions' ? null : 'impressions')}>
            <div>
              <div style={styles.sectionNum}>04 / AUDIENCE</div>
              <h2 className="section-label" style={styles.sectionLabel}>What sponsors actually buy</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'impressions')}>
              {expandedSection === 'impressions' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'impressions' && (
            <div className="section-content">
              <div className="hero-grid" style={styles.hero}>
                <div style={styles.heroCard}>
                  <div style={styles.heroLabel}>Sessions per jersey / yr</div>
                  <div style={styles.heroValue}>48</div>
                  <div style={{ ...styles.heroSub, color: colors.forestDim }}>12 games × 4 seasons</div>
                </div>
                <div style={styles.heroCard}>
                  <div style={styles.heroLabel}>Views per session</div>
                  <div style={styles.heroValue}>~40</div>
                  <div style={{ ...styles.heroSub, color: colors.forestDim }}>Direct + incidental</div>
                </div>
                <div style={styles.heroCardApple}>
                  <div style={styles.heroLabelOnApple}>Total impressions / yr</div>
                  <div style={styles.heroValue}>{formatNumber(current.impressions)}</div>
                  <div style={{ ...styles.heroSub, color: colors.forest, opacity: 0.75 }}>League-wide reach</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 05 PRICING */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'pricing')}
            onClick={() => setExpandedSection(expandedSection === 'pricing' ? null : 'pricing')}>
            <div>
              <div style={styles.sectionNum}>05 / PRICING</div>
              <h2 className="section-label" style={styles.sectionLabel}>Sponsor pricing</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'pricing')}>
              {expandedSection === 'pricing' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'pricing' && (
            <div className="section-content">
              <div style={styles.framingToggle}>
                <button className={`framing-btn ${framing === 'A' ? 'framing-btn-active' : ''}`} style={styles.framingBtn(framing === 'A')}
                  onClick={() => setFraming('A')}>
                  Framing A · 4 league-wide
                </button>
                <button className={`framing-btn ${framing === 'B' ? 'framing-btn-active' : ''}`} style={styles.framingBtn(framing === 'B')}
                  onClick={() => setFraming('B')}>
                  Framing B · 8 sponsors
                </button>
              </div>

              {framing === 'B' && (
                <div style={{
                  background: colors.apple,
                  border: `2px solid ${colors.forest}`,
                  padding: '24px 28px',
                  marginBottom: '32px'
                }}>
                  <div style={{ ...styles.heroLabel, marginBottom: '8px', color: colors.forest, opacity: 0.8 }}>A note on avenue pricing</div>
                  <div style={{ fontSize: '15px', color: colors.forest, lineHeight: '1.65', fontWeight: 500 }}>
                    All five front-chest avenue placements are priced equally. The CPM differential reflects <strong>audience fit</strong>, not reach — a craft performance brand pays for the Competitive audience because it's the right audience, not because it's the biggest one. Sponsors self-select based on who they want to reach.
                  </div>
                </div>
              )}

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Placement</th>
                      <th style={styles.thRight}>Price</th>
                      <th style={styles.thRight}>CPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTiers.map((tier, i) => {
                      const annual = calcTierPrice(tier);
                      const cpm = calcCPM(tier);
                      return (
                        <tr key={i}>
                          <td style={styles.td}>
                            <div style={styles.tdName}>{tier.name}</div>
                            <div style={styles.tdDesc}>{tier.description}</div>
                            {tier.audienceNote && <div style={styles.tdNote}>{tier.audienceNote}</div>}
                            <div><span style={styles.paymentBadge(tier.paymentType)}>
                              {tier.paymentType === 'flexible' ? 'Quarterly or Annual' : 'Annual only'}
                            </span></div>
                          </td>
                          <td style={styles.tdRight}>{renderPriceCell(tier, annual)}</td>
                          <td style={styles.tdRight}>
                            <div style={styles.tdNumber}>{formatCurrencyDec(cpm)}</div>
                            <div style={styles.tdSubNumber}>per 1K</div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr style={styles.totalRow}>
                      <td style={styles.totalTd}>Total · {currentTiers.length} sponsors</td>
                      <td style={styles.totalTdRight}>{formatCurrency(totalPrice)}</td>
                      <td style={{ ...styles.totalTdRight, fontSize: '18px', opacity: 0.5 }}>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: '24px', fontSize: '13px', color: colors.sage, fontFamily: '"Archivo", sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                Front Chest quarterly payments align to sessions: October, January, April, July. All other placements are annual commitments.
              </div>
            </div>
          )}
        </section>

        {/* 06 GUT CHECK */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'gut')}
            onClick={() => setExpandedSection(expandedSection === 'gut' ? null : 'gut')}>
            <div>
              <div style={styles.sectionNum}>06 / COMPARISON</div>
              <h2 className="section-label" style={styles.sectionLabel}>Gut check vs. channels</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'gut')}>
              {expandedSection === 'gut' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'gut' && (
            <div className="section-content">
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: colors.forestDim, marginBottom: '32px', maxWidth: '740px', fontWeight: 400 }}>
                Is this sellable? The answer lives in how Turbo's CPM compares to what local businesses already pay for visibility. This is the real question.
              </p>
              <div style={styles.gutCheckWrap}>
                <div style={styles.gutCheckHeader} className="gut-check-header">
                  <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.apple }}>Channel</div>
                  <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.apple, textAlign: 'right' }}>CPM</div>
                  <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.apple }}>Reach quality</div>
                  <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.apple }}>Duration</div>
                </div>
                {channels.map((ch, i) => (
                  <div key={i} className="gut-check-row" style={styles.gutCheckRow}>
                    <div style={{ fontFamily: '"Anton", sans-serif', fontSize: '22px', color: colors.forest, textTransform: 'uppercase', fontWeight: 400 }}>{ch.name}</div>
                    <div style={{ textAlign: 'right', fontFamily: '"Anton", sans-serif', fontSize: '24px', color: colors.forest, fontVariantNumeric: 'tabular-nums', textTransform: 'uppercase', fontWeight: 400 }}>{ch.cpm}</div>
                    <div style={{ fontSize: '13px', color: colors.forestDim, fontWeight: 500 }}>{ch.quality}</div>
                    <div style={{ fontSize: '13px', color: colors.forestDim, fontWeight: 500 }}>{ch.duration}</div>
                  </div>
                ))}
                <div className="gut-check-row" style={styles.gutCheckRowHero}>
                  <div>
                    <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.forest, marginBottom: '8px', fontWeight: 700, opacity: 0.75 }}>Turbo league jersey</div>
                    <div style={{ fontFamily: '"Anton", sans-serif', fontSize: '32px', color: colors.forest, textTransform: 'uppercase', fontWeight: 400, lineHeight: '1' }}>Front Chest<br/>Framing A</div>
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: '"Anton", sans-serif', fontSize: '48px', color: colors.forest, fontVariantNumeric: 'tabular-nums', fontWeight: 400, textTransform: 'uppercase', lineHeight: '1' }}>{formatCurrencyDec(turboCPM)}</div>
                  <div style={{ fontSize: '14px', color: colors.forest, fontWeight: 600 }}>Physical, trusted,<br/>in-community</div>
                  <div style={{ fontSize: '14px', color: colors.forest, fontWeight: 600 }}>Full year<br/>(all 4 seasons)</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 07 KEY FACTORS */}
        <section style={styles.section}>
          <div className="section-header" style={styles.sectionHeader(expandedSection === 'factors')}
            onClick={() => setExpandedSection(expandedSection === 'factors' ? null : 'factors')}>
            <div>
              <div style={styles.sectionNum}>07 / DECISIONS</div>
              <h2 className="section-label" style={styles.sectionLabel}>Key factors</h2>
            </div>
            <span className="expand-icon" style={styles.expandIcon(expandedSection === 'factors')}>
              {expandedSection === 'factors' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'factors' && (
            <div className="section-content">
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: colors.forestDim, marginBottom: '40px', maxWidth: '740px', fontWeight: 400 }}>
                The variables that shape whether this program works, and where the strategic levers are. These are the decisions that need resolving before we can commit to a pricing structure.
              </p>
              {factors.map((factor, i) => (
                <div key={i} className={i === 0 ? 'factor-card-hero' : 'factor-card'} style={i === 0 ? styles.factorCardHero : styles.factorCard}>
                  <div style={{ ...styles.factorNum, color: i === 0 ? colors.apple : colors.sage }}>Factor 0{i + 1}</div>
                  <div style={{ ...styles.factorTitle, color: i === 0 ? colors.apple : colors.forest }}>{factor.title}</div>
                  <div style={{ ...styles.factorBody, color: i === 0 ? colors.apple : colors.forestDim, opacity: i === 0 ? 0.9 : 1 }}>{factor.body}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.footerLogo}>TURBO</span>
          <span>Jersey Sponsorship Framework · v4 · Internal working doc</span>
        </div>
      </div>
    </div>
  );
};

export default TSPCJerseyPricing;
