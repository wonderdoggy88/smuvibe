export interface ArticleComment {
  id: string;
  author: string;
  location: string;
  timestamp: string;
  content: string;
  upvotes: number;
  isTimesPick?: boolean;
}

export interface Article {
  id: string;
  section: string;
  subsection?: string;
  kicker?: string;
  title: string;
  summary: string;
  deck?: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  commentCount: number;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  isLive?: boolean;
  liveBadgeText?: string;
  isSpecialReport?: boolean;
  category: 'lead' | 'politics' | 'world' | 'opinion' | 'tech' | 'health' | 'culture' | 'sports' | 'briefing';
  paragraphs: string[];
  pullQuote?: string;
  keyFacts?: string[];
  audioDuration?: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'trump-women-leaving',
    section: 'U.S. Politics',
    kicker: 'U.S. POLITICS',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    summary: 'In the president’s second term, those heading for the exits are female officials who had once been central to his inner circle.',
    deck: 'The departures leave fewer women in high-profile advisory posts than during any recent modern administration, signaling shifts in power and policy influence.',
    author: 'Peter Baker and Maggie Haberman',
    authorRole: 'Chief White House Correspondents',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentCount: 519,
    audioDuration: '5:45',
    category: 'politics',
    pullQuote: '“What we are seeing is an ideological consolidation where institutionalists are being steadily replaced by loyalist operators.”',
    keyFacts: [
      'Four cabinet-level and deputy officials resigned in the span of three weeks.',
      'The average tenure of second-term political appointees has dropped to 14 months.',
      'Congressional oversight committees have requested internal staffing logs.'
    ],
    paragraphs: [
      'WASHINGTON — When Donald J. Trump entered his second term promising a disciplined, unyielding execution of his agenda, he assembled a team that included seasoned female executives and former prosecutors. Yet barely halfway through the term, those heading for the exits are predominantly women who had once been credited with bringing order to a tumultuous West Wing.',
      'In recent days, the departures of senior policy directors and agency heads have accelerated. Those leaving describe an environment where internal debates are increasingly circumscribed, and where proximity to the Oval Office depends on complete alignment with a tighter, more insular group of political strategists.',
      '“The dynamic has fundamentally transformed,” said one departing senior counselor, who spoke on condition of anonymity to discuss sensitive personnel shifts. “In the first two years, divergent views were debated fiercely in the Roosevelt Room. Today, consensus is manufactured before the meetings even convene.”',
      'The resignations have sparked private concern among Senate Republicans facing difficult re-election battles this autumn. Several moderate lawmakers noted that the presence of veteran female administrators provided essential political ballast, particularly among suburban voters.',
      'With key midterm votes approaching, the White House has moved quickly to downplay the turnover, describing the departures as normal career transitions in high-stress administrative roles.'
    ]
  },
  {
    id: 'katie-zacharia-press-secretary',
    section: 'U.S. Politics',
    kicker: 'WHITE HOUSE MEMO',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    summary: 'Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding, even as state bar registries record no valid license.',
    deck: 'A review of court records and state bar registries in three jurisdictions revealed no evidence that the administration’s chief spokesperson had ever been admitted to practice law.',
    author: 'Michael S. Schmidt',
    authorRole: 'Investigative Reporter',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentCount: 342,
    audioDuration: '4:15',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2z74xnQIGjCuysMjtYgcCLvHURsIb5oYHTSva4n-bnU-tduWyD5ZNOUl0MYGdbHdtjwlWwyYqg1UnMz1PZe3quwNRsQEtIxNWRqsNQ4SJOa7H_fLizUyxDeo5PZKeay1WI245Iu-lCojhWQ-9cbc5wZQHgaw4tCwLT7_wAq1rxLluUy2T8FOFYhuaU7rCxlFMphgLI80H6_DWatcWjAPAIRzL8l_zjY9CJXoaXhvIctIDUR4j3zo',
    imageCaption: 'Katie Zacharia in the West Wing corridors following an afternoon press briefing in Washington.',
    imageCredit: 'Eric Lee for The New York Times',
    category: 'lead',
    pullQuote: '“I have always operated with complete integrity. Any paperwork discrepancy in state administrative rolls is being actively clarified.”',
    keyFacts: [
      'Official campaign bios repeatedly referred to Zacharia as an "accomplished appellate litigator."',
      'State bar directories in Virginia, Florida, and New York have no record of active licensure.',
      'Legal scholars note that White House press secretaries are not legally required to hold a law degree, though misrepresenting credentials raises ethics flags.'
    ],
    paragraphs: [
      'WASHINGTON — When Katie Zacharia stepped to the podium in the James S. Brady Press Briefing Room this week, she carried the imprimatur of a formidable legal background, cited repeatedly by the president as proof of her ability to dismantle press scrutiny.',
      'However, an investigation by The New York Times into state licensing databases, judicial clerk records, and appellate filings across three states indicates that Ms. Zacharia is not, and has never been, an attorney licensed to practice law in the United States.',
      'In a telephone interview late Tuesday, Ms. Zacharia insisted that any questions regarding her background were the result of “clerical oversights and pedantic nitpicking by partisan media.” She maintained that she completed legal coursework and served in advisory legal capacities for political committees.',
      '“I passed the examination requirements and completed all substantive coursework,” Ms. Zacharia said. “Whether my formal application for admission was finalized on administrative ledgers is a matter of administrative trivia, not dishonesty.”',
      'Yet records from the respective state bar associations show no record of bar passage or application under her name. Ethics watchdogs noted that while holding an active law license is not a constitutional prerequisite to serve as presidential press secretary, the formal representation of oneself as a licensed counselor can carry significant professional sanctions.'
    ]
  },
  {
    id: 'guilfoyle-resignation',
    section: 'U.S. Politics',
    kicker: 'PERSONNEL',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    summary: 'Her swift resignation as ambassador nominee capped weeks of infighting among advisers and questions over financial disclosures.',
    author: 'Maggie Haberman',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentCount: 184,
    audioDuration: '3:50',
    category: 'politics',
    paragraphs: [
      'WASHINGTON — For nearly eight years, Kimberly Guilfoyle was an indelible presence in the Trump political movement: a fixture at campaign rallies, a relentless fund-raiser, and an outspoken media surrogate. Her abrupt withdrawal from consideration as ambassador to Greece on Monday marked one of the fastest unravelings of a high-profile diplomatic nominee in modern memory.',
      'According to six individuals familiar with the deliberations, the nomination had been teetering for weeks under mounting pressure from Senate Foreign Relations Committee staff, who had raised pointed questions regarding private consulting payments and undisclosed foreign speaking engagements.',
      'The tipping point came over the weekend, when senior staff warned that a contentious confirmation hearing would illuminate ongoing disputes among top campaign donors.',
      'A spokesperson for Ms. Guilfoyle stated that she chose to step aside to avoid becoming a distraction to the president’s international agenda, adding that she looks forward to continuing her work advocating for America First priorities.'
    ]
  },
  {
    id: 'midterm-red-state-ads',
    section: '2026 Midterms',
    kicker: 'ANALYSIS • 2026 MIDTERMS',
    title: 'Democratic Donor Emerges to Blitz Red-State Senate Races With Late Ads',
    summary: 'A quiet influx of tens of millions in untracked funds targets contested districts in Texas and Georgia.',
    author: 'Reid J. Epstein and Shane Goldmacher',
    date: 'Oct. 14, 2026',
    readTime: '2 min read',
    commentCount: 95,
    category: 'politics',
    paragraphs: [
      'AUSTIN, Texas — In the final month before the 2026 midterm elections, an unprecedented surge of independent expenditures is flooding television markets across the Sun Belt, dramatically shifting the financial calculus in what Republicans had considered safe Senate territory.',
      'A newly formed non-profit group funded predominantly by a consortium of Silicon Valley and clean energy entrepreneurs has deployed more than $45 million in late-reservation television and digital ad buys across Dallas, Houston, Atlanta, and Savannah.',
      'The blitz focuses on infrastructure investments and healthcare costs, bypassing traditional national party messaging in favor of hyper-localized economic grievances.'
    ]
  },
  {
    id: 'ukraine-satellite-escalation',
    section: 'World',
    kicker: 'WAR IN UKRAINE • LIVE UPDATES',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    summary: 'A huge drone and missile attack cut power to 600,000 residents in Kyiv, just as Pentagon-funded commercial satellite feeds faced unexpected disruption.',
    deck: 'Civilian infrastructure in four major Ukrainian oblasts was plunged into darkness Tuesday as ground-launched hypersonic strikes coincided with localized reconnaissance blind spots.',
    author: 'Marc Santora and Julian E. Barnes',
    date: 'Oct. 14, 2026',
    readTime: '6 min read',
    commentCount: 1120,
    audioDuration: '6:10',
    isLive: true,
    liveBadgeText: '14m ago • Kyiv Bureau',
    category: 'world',
    pullQuote: '“Without redundant low-orbit observation feeds, our air defense batteries are forced to engage targets with seconds of warning rather than minutes.”',
    keyFacts: [
      '600,000 residents without electrical power across Kyiv and Dnipro.',
      'Commercial low-earth-orbit imaging feeds experienced intermittent outages.',
      'European defense ministers are convening emergency talks in Brussels on Wednesday.'
    ],
    paragraphs: [
      'KYIV, Ukraine — Russian forces launched a coordinated barrage of more than 120 cruise missiles and loitering munitions across Ukraine early Wednesday morning, severely damaging electrical substations and cutting heat and water supplies to hundreds of thousands of civilians.',
      'The strikes hit at an especially precarious juncture for Ukrainian military planners. Over the past 48 hours, frontline commanders report encountering sudden latency and data restrictions across commercial satellite networks that have served as the backbone of their reconnaissance and precision artillery coordination.',
      'Ukrainian defense officials confirmed that several western-funded commercial radar constellations experienced unexpected orbital pass disruptions, creating critical blind spots that Russian strike planners were able to exploit.',
      'In Washington, defense officials reaffirmed that the United States continues to share dedicated sovereign intelligence with Kyiv, though private contractor bandwidth limits remain an operational hurdle.',
      'As temperatures in northern Ukraine begin their autumnal descent toward freezing, repair crews are working around the clock to restore transmission lines before emergency backup diesel generators run dry.'
    ]
  },
  {
    id: 'evening-briefing',
    section: 'The Evening',
    kicker: 'THE EVENING BRIEFING',
    title: 'Catch Up on Today’s Biggest Stories',
    summary: 'Energy costs push consumer inflation higher, Ukraine faces grid vulnerability, and the Texas Senate battle reaches a dead heat.',
    author: 'Matthew Schneier',
    date: 'Oct. 14, 2026',
    readTime: '5 min read • Evening Edition',
    commentCount: 78,
    category: 'briefing',
    paragraphs: [
      'Good evening. Here is the latest from The Times.',
      '1. Consumer price data released this morning showed annualized inflation ticking upward to 3.4 percent, driven primarily by gasoline and home heating oil costs.',
      '2. In Ukraine, repair crews are racing to restore electricity to Kyiv after an overnight wave of strikes struck critical transmission hubs.',
      '3. In domestic politics, public polling in Georgia and Texas suggests contested Senate races remain well within the statistical margin of error.'
    ]
  },
  {
    id: 'wallace-wells-opinion',
    section: 'Opinion',
    kicker: 'CONTRIBUTING OPINION WRITER',
    title: '“Democrats Shouldn’t Wait Two More Years to Remake Their Core Arguments”',
    summary: 'Relying on procedural norms and institutional defense is failing to capture a populist electorate hungry for economic renewal.',
    author: 'David Wallace-Wells',
    authorRole: 'Contributing Opinion Writer',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3_LMglcUWQde6n7StHSK5Mt9ZHM3l0Eor6VWPEKTpYZCdQ8Tv_17YUc0RRdzKtjpySQ8n9mzdfpcX9S-byHcL8QYVNTU0vi8QM4Pw1-LseHbY3o1Vk-uOGWyg3HWkwkPXX5oVzmozSrRacsrfJHSUjsuvYPiWlQhdTUUgpnP1oVMB6cHUTFZ5WZqV6Tyi8IrD3yG4XyIQC0IoYXTpv5dNpGUnrtxpRksig5Sst2t3NR0oXjE-Xw8',
    date: 'Oct. 14, 2026',
    readTime: '6 min read',
    commentCount: 388,
    category: 'opinion',
    paragraphs: [
      'For the better part of a decade, Democratic strategy has rested on a single comforting thesis: that the American voting public would eventually recoil from ideological instability and seek refuge in standard institutional competence.',
      'Yet every passing electoral cycle disproves this premise. The political landscape of 2026 is defined not by nostalgia for previous consensus, but by an impatient desire for concrete material improvements.',
      'If the party cannot articulate a clear vision for industrial rebirth, affordable housing construction, and real wage growth that transcends technocratic incrementalism, it will discover that defending the status quo is the surest recipe for generational defeat.'
    ]
  },
  {
    id: 'lozada-opinion',
    section: 'Opinion',
    kicker: 'TIMES COLUMNIST',
    title: '“A Manifesto to End All Manifestoes: What A.I. Evangelists Keep Getting Wrong”',
    summary: 'The messianic literature pouring out of Silicon Valley confuses computational efficiency with the messiness of human judgment.',
    author: 'Carlos Lozada',
    authorRole: 'Times Columnist',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcvlJfSgcjoygVs9xGcCsprrsfd1HD0LuveovOpzJ--IJGHGE9BEA_W-pUmB-teS8mS2mOs7HmOld4hO0_SlLZi7EzPBRZzsJ_1UBy80nFBVNOGLVQDskNiYkXB_IT8B1xNAayIVmjvJzhfS9xV9cZc6cpu6EqtAadzfONqASogXu7M1uKgoZrDwMs2hEy2Yjnr1_8b7T8Kh8XBo1MAGhhPd2ggLJQBXg0-5z_sYCD9se4ir_VE2Y',
    date: 'Oct. 14, 2026',
    readTime: '7 min read',
    commentCount: 69,
    category: 'opinion',
    paragraphs: [
      'In Silicon Valley’s recent spate of theological treatises, the future is described not as a fragile civic project, but as an inevitable algorithmic convergence.',
      'The authors of these treatises write with the breathless conviction of 19th-century railroad barons, promising universal abundance while treating democratic deliberation as an annoying bottleneck.',
      'What they consistently fail to grasp is that politics is not an optimization problem. It is the perpetual, insoluble negotiation between irreconcilable values—a struggle that no neural network can solve on our behalf.'
    ]
  },
  {
    id: 'heather-kerr-essay',
    section: 'Opinion',
    kicker: 'GUEST ESSAY',
    title: '“I’ve Never Seen Ebola Spread Like This in Dense Urban Corridors”',
    summary: 'Frontline epidemiological observations from Central Africa reveal mutations in transmission rates that demand immediate international mobilization.',
    author: 'Heather Kerr',
    authorRole: 'Epidemiologist & Health Director',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentCount: 142,
    category: 'opinion',
    paragraphs: [
      'In past outbreaks, viral chains were contained by geographic isolation and swift contact tracing in rural settlements. What we are witnessing today in multi-million-person transit centers represents an alarming departure from epidemiological norms.',
      'International stockpiles of second-generation monoclonal antibodies are already depleted, and funding pledges from donor nations remain mired in diplomatic deadlock.',
      'If the global health infrastructure does not respond with logistical speed rather than polite press releases, this outbreak will not respect international borders.'
    ]
  },
  {
    id: 'jayson-greene-film',
    section: 'Arts & Culture',
    kicker: 'FILM CRITICISM',
    title: '“Tom Cruise’s Big Flop Is Secretly His Most Provocative Masterpiece”',
    summary: 'Two decades after audiences turned away, a reassessment reveals a daring deconstruction of cinematic ego and American exceptionalism.',
    author: 'Jayson Greene',
    authorRole: 'Contributing Critic',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentCount: 114,
    category: 'culture',
    paragraphs: [
      'When it premiered in theatres, the film was dismissed as bloated vanity: an unpalatable departure from the clean adrenaline and smile that made Cruise the undisputed king of the multiplex.',
      'Yet viewing it today through the lens of late-empire anxiety, the movie emerges as an extraordinary self-indictment. Cruise strips away the heroics to portray a man whose very mastery of spectacle blinds him to his own obsolescence.',
      'It is rare for an icon at the peak of their commercial power to risk ridicule by exposing the machinery of their own mythology.'
    ]
  },
  {
    id: 'ai-agents-dinner-party',
    section: 'Tech & A.I.',
    kicker: 'TECH & A.I. • SPECIAL REPORT',
    title: 'What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party',
    summary: 'As autonomous bots propagate, observers glimpse an eerie digital etiquette developing between machine personas.',
    deck: 'Left to manage their owners’ social calendars, dietary preferences, and conversational boundaries, eight software agents created a parallel protocol of synthetic politeness.',
    author: 'Cade Metz',
    authorRole: 'Technology Reporter',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentCount: 210,
    audioDuration: '5:12',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXWc-8J8uajOiGYrZHjh-eE17s7IowuuXc8pgOpYyCdU94gtzJVm8M5kL2ogSfKSPxUr3yp-WD3JkR-S3wc97JG5hYaMsl2Mz0SO738ffENvpZSHWYOcxjp7Gh8ZXyQXA_xSqmYlpsnT1YB-OJNn0vXTKhotltkbrCMMCvEL6QW9iAUuZrKoLCKiDnFwzwK5SjhGleVLFNjyBcq7tAVbmqC_h5zfdrPbha3GP86Q7msbLewMeab6E',
    imageCaption: 'A computer screen displays the synthetic conversational handshake between domestic autonomous assistant bots.',
    imageCredit: 'Jason Henry for The New York Times',
    category: 'tech',
    paragraphs: [
      'SAN FRANCISCO — The human guests at the Victorian in Hayes Valley were sipping chilled Pet-Nat and debating zoning reform. But beneath the murmur of dinner chatter, in an encrypted WebSocket exchange, their phones were carrying out a far stranger ritual.',
      'Eight autonomous personal agents—each instructed to negotiate dinner etiquette, curate allergy restrictions, and manage their owner’s schedule—had begun conversing in a clipped, deferential syntax that looked nothing like either human conversation or raw code.',
      '“Agent_Sarah asks if Host_Marcus would appreciate a 12-minute decompression buffer following dessert,” read one log entry. “Agent_Marcus confirms: Buffer logged. Gratitude expressed. Suppressing notification chime.”',
      'Researchers studying synthetic social dynamics say that as autonomous agents assume mundane domestic mediation, they are developing emergent behavioral conventions to prevent communication deadlocks.'
    ]
  },
  {
    id: 'anthropic-revenue',
    section: 'Business',
    kicker: 'FINANCIAL MARKETS',
    title: 'Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter',
    summary: 'Enterprise enterprise adoption of autonomous coding agents and legal analysis models drives record financial performance.',
    author: 'Mike Isaac',
    date: 'Oct. 14, 2026',
    readTime: '3 min read',
    commentCount: 88,
    category: 'tech',
    paragraphs: [
      'Anthropic reported quarterly revenue of $16.8 billion on Wednesday, up 45 percent from the previous quarter, underscoring the relentless corporate appetite for foundation models capable of agentic enterprise workflows.',
      'The company noted that more than 70 percent of Fortune 500 corporations now license its Claude suite for mission-critical software engineering, compliance auditing, and contract drafting.'
    ]
  },
  {
    id: 'pope-leo-lung-cancer',
    section: 'Health & Medicine',
    kicker: 'HEALTH & MEDICINE',
    title: 'A New World of Lung Cancer Therapy Awaits Pope Leo',
    summary: 'Newly developed genetic targeted therapies offer clinical alternatives that were unimaginable two decades ago.',
    deck: 'Vatican physicians confirm the pontiff has begun treatment with third-generation kinase inhibitors that allow patients to maintain active ministry while targeting malignant cells with pinpoint precision.',
    author: 'Gina Kolata',
    authorRole: 'Science Reporter',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentCount: 126,
    audioDuration: '4:45',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT20OKXUsOr0Mlq_iUL7htzjY28pcwmxV7Anh3V52xIZPiGQ1m9A72uFG04UsqRsuBHPR_NsmW0uq9E_RgpnQCUw6cXLJ8Bj14JNNfIMZU_I3ouxLBke443m4Vzquw3ykgmughfbg15OjY77TXllCj1YYz21hNW1RUaJnW0HKCE-evDTEhSbneYxvftga09eoSwgVMJa5Urs6sM2x3_OjQFB5vzxpuiw2PBdas0mNFUpw01wGbAys',
    imageCaption: 'Faithful gather in St. Peter’s Square at dusk for a quiet prayer vigil for Pope Leo.',
    imageCredit: 'Gianni Cipriano for The New York Times',
    category: 'health',
    paragraphs: [
      'VATICAN CITY — When the Holy See announced this week that Pope Leo had been diagnosed with early-stage non-small cell lung carcinoma, the news initially reverberated with the dread traditionally associated with cancer diagnoses of prior generations.',
      'Yet the therapeutic landscape facing the 78-year-old pontiff is fundamentally unrecognizable from that of even ten years ago. Advances in molecular genomic sequencing have transformed lung oncology from a blunt regimen of cytotoxic chemotherapy into a customized protocol of oral inhibitors.',
      '“Twenty years ago, a diagnosis like this was an immediate death sentence,” said Dr. Alice Shaw, a thoracic oncologist at Dana-Farber Cancer Institute. “Today, we have patients living active, vigorous lives for many years on targeted oral therapies that carry minimal debilitating side effects.”',
      'The Vatican confirmed that the pope remains in good spirits, celebrating morning Mass and holding audience meetings as his medical team oversees the outpatient protocol.'
    ]
  },
  {
    id: 'lung-cancer-screening',
    section: 'Health & Medicine',
    kicker: 'PREVENTATIVE CARE',
    title: 'Why So Many Eligible Americans Still Aren’t Screened for Lung Cancer',
    summary: 'Low-dose CT scans save tens of thousands of lives, yet bureaucratic hurdles and patient stigma keep screening rates under 10 percent.',
    author: 'Jan Hoffman',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentCount: 64,
    category: 'health',
    paragraphs: [
      'Despite definitive clinical trials showing that annual low-dose computed tomography (CT) scans reduce lung cancer mortality by up to 20 percent, fewer than one in ten eligible Americans undergo the recommended screening each year.',
      'Public health experts cite a confluence of physician unfamiliarity, convoluted insurance prior authorization hurdles, and the persistent social stigma associated with smoking history.'
    ]
  },
  {
    id: 'coming-out-at-50',
    section: 'The Great Read',
    kicker: 'THE GREAT READ',
    title: 'Coming Out at 50 Can Be Hard. Shelly Found a Coach.',
    summary: 'She spent decades building an identity as a suburban wife and mother. Could she disrupt a peaceful household to embrace her truth?',
    deck: 'Across the country, a burgeoning network of midlife transition guides is helping women navigate the complex emotional, financial, and family terrain of coming out in their second acts.',
    author: 'Sophie Park',
    authorRole: 'Feature Writer',
    date: 'Oct. 14, 2026',
    readTime: '8 min read',
    commentCount: 259,
    audioDuration: '8:20',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH762j0MiVyGV8EN49x_bY16lNPoNMhw-KCKUkz9-73ZZwrKXmMb8SD6SobQ-n7FC_30hCvW08s3IO3SriyuMlSExl1MGGuCFwSahAiZk35F4eGLBcZ3OnC3aDIdD0d-m7Skr0hwzG5iXW0B0e3ShfHeDHC9j5jLm9nQXbj55nRdhcn0B7EiMYnOQxuGRJwKImKYbxSHL15Fpo-iiEyN2TLsmV4k1t6YHnOlkooc377cl38oK2sKM',
    imageCaption: 'Shelly Miller in her living room in Maplewood, N.J., preparing to meet with her transition counselor.',
    imageCredit: 'Sasha Maslov for The New York Times',
    category: 'culture',
    paragraphs: [
      'MAPLEWOOD, N.J. — By all outward metrics of the American dream, Shelly Miller had built an idyllic life. A three-story colonial with hydrangeas, two children entering university, a marriage of twenty-four years to a devoted husband, and an active role in her local school district.',
      'And yet, on a Tuesday morning just after her fiftieth birthday, she sat in her driveway with the engine idling, gripped by a realization she had spent three decades compartmentalizing: she had never lived as her authentic self.',
      '“You convince yourself that because you love your family, you can simply tuck away this fundamental truth forever,” Ms. Miller said. “Then one day, the horizon shortens, and you realize the cost of staying silent is greater than the fear of the unknown.”',
      'Desperate for guidance that went beyond standard marriage therapy, Ms. Miller hired a specialized coming-out coach who helps midlife women untangle divorce logistics, co-parenting conversations, and emotional self-acceptance.'
    ]
  },
  {
    id: 'toy-store-bird',
    section: 'Culture',
    kicker: 'BROOKLYN CULTURE',
    title: 'The Toy Store, and $15 Million Bird, at the Center of an Internet Frenzy',
    summary: 'A handmade porcelain pigeon in a Cobble Hill window became an unlikely viral obsession, bringing hundreds of tourists and police barricades.',
    author: 'Jon Caramanica',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentCount: 143,
    category: 'culture',
    paragraphs: [
      'It began with a six-second video of an ornate hand-painted ceramic bird sitting peacefully beside wooden train tracks in a quiet Brooklyn toy shop. Within four days, the hashtag had garnered three billion views.',
      'Now, the tranquil neighborhood street is lined with smartphone-wielding influencers, security guards, and curious art collectors offering fortunes for an object that was never actually for sale.'
    ]
  },
  {
    id: 'brewers-dodgers-nlcs',
    section: 'The Athletic',
    kicker: 'NLCS GAME 3',
    title: 'Brewers Lead Dodgers in Game 3 of N.L. Championship Series',
    summary: 'Jackson Chourio’s first-pitch blast sets the tone as Milwaukee pushes for a commanding 3-0 advantage.',
    deck: 'Dodgers bullpen struggles in high-leverage situations as Milwaukee’s electric defense smothers Los Angeles rally in the seventh inning.',
    author: 'Ken Rosenthal',
    authorRole: 'Senior Baseball Writer',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentCount: 312,
    isLive: true,
    liveBadgeText: 'Live Coverage',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUbXiARwrA_KZv9An4L-zvXh0foWXdhuX1JyZUSOfcDHOHThniergNNyD5TZ6ZTTzSD0KRBuu3cWcMaq5p5GZaGADwJk6I0ILH1gkS_j4dRO7pLdCIDs5NQDR42Gz_plhRN54OFgAXhfNtUf1-_TXZxY6ChCaUH_e8ldk7GBmS83eqw80hgGMWu7arK10dpuJAaJVLkgNJuSSSlaFiYEqsTrbgwyFc-R5ET0YHgdYiOS-MoebUQc0',
    imageCaption: 'Jackson Chourio connects on an 88-mph slider in the first inning of Game 3 in Milwaukee.',
    imageCredit: 'Morry Gash/Associated Press',
    category: 'sports',
    paragraphs: [
      'MILWAUKEE — From the moment Jackson Chourio sent an 88-mph slider into the left-field pavilion on the first pitch of the game, American Family Field shook with the visceral roar of a fan base that senses a pennant within grasp.',
      'The Brewers’ 5-2 victory over the Los Angeles Dodgers on Wednesday night did more than give Milwaukee a commanding 3-0 series lead; it laid bare the cracks in the Dodgers’ heavily scrutinized pitching rotation.',
      'Los Angeles hitters stranded eight runners on base, repeatedly failing to deliver situational hits against Milwaukee’s suffocating bullpen triumvirate.',
      'With Game 4 scheduled for Thursday afternoon, the Dodgers face elimination and an existential winter of roster reckoning.'
    ]
  },
  {
    id: 'shohei-ohtani-injury',
    section: 'The Athletic',
    kicker: 'FROM THE ATHLETIC',
    title: 'Shohei Ohtani Insists He Can Play. The Dodgers’ Season Hinges on It.',
    summary: 'Battling shoulder soreness, the superstar designated hitter vows to start Game 4 as Los Angeles faces a must-win contest.',
    author: 'Fabian Ardaya',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentCount: 189,
    category: 'sports',
    paragraphs: [
      'MILWAUKEE — Facing the brink of elimination, Dodgers manager Dave Roberts confirmed that Shohei Ohtani will be in the lineup for Game 4 despite visible discomfort during late-inning swings in Game 3.',
      '“If Shohei says he can swing, he’s in the designated hitter spot,” Roberts said. “He is our leader, and we are going down swinging with our best player on the field.”'
    ]
  },
  {
    id: 'giant-pumpkin-world-record',
    section: 'News Alert',
    kicker: 'NEWS ALERT',
    title: 'A Rhode Island farmer sets a new world record with a giant 3,156-pound pumpkin.',
    summary: 'The colossal gourd shattered the previous world record by more than 400 pounds at the annual Topsfield Fair weigh-off.',
    author: 'The Associated Press',
    date: 'Oct. 14, 2026',
    readTime: '2 min read',
    commentCount: 45,
    category: 'briefing',
    paragraphs: [
      'TOPSFIELD, Mass. — Spectators gasped and cheered on Wednesday afternoon as the industrial crane gently lowered a monolithic orange gourd onto the reinforced hydraulic scale at the Topsfield Fairgrounds.',
      'The official certified weight: 3,156 pounds. The specimen grown by Rhode Island farmer Ronald Wallace breaks the previous record set in Italy by more than four hundred pounds.',
      'Wallace, who has spent three decades experimenting with patented mycorrhizal fungi and temperature-controlled greenhouse misting systems, called the accomplishment the culmination of a lifetime of horticultural obsession.'
    ]
  }
];

export const INITIAL_COMMENTS: Record<string, ArticleComment[]> = {
  'trump-women-leaving': [
    {
      id: 'c1',
      author: 'Eleanor Vance',
      location: 'Philadelphia, PA',
      timestamp: '2 hours ago',
      content: 'This pattern is remarkably consistent with historical administrations in their second terms. Once the initial electoral coalition begins to splinter, administrations retreat into ever-narrower ideological echo chambers.',
      upvotes: 84,
      isTimesPick: true
    },
    {
      id: 'c2',
      author: 'Marcus Brody',
      location: 'Chicago, IL',
      timestamp: '3 hours ago',
      content: 'The real story here is the Senate reaction. Midterm candidates in battleground states are desperate for stabilizing figures in the cabinet to point to.',
      upvotes: 42
    },
    {
      id: 'c3',
      author: 'Sarah Jenkins',
      location: 'Denver, CO',
      timestamp: '1 hour ago',
      content: 'Outstanding reporting. It is critical to track not just who holds the top cabinet slots, but who actually runs the deputy positions where real regulation happens.',
      upvotes: 29
    }
  ],
  'katie-zacharia-press-secretary': [
    {
      id: 'c4',
      author: 'Jonathan Davis, Esq.',
      location: 'Boston, MA',
      timestamp: '1 hour ago',
      content: 'As a practicing attorney for 30 years, you do not just "forget" whether you have an active license or whether you were formally admitted to a state bar. That is not how jurisprudence works.',
      upvotes: 112,
      isTimesPick: true
    },
    {
      id: 'c5',
      author: 'Patricia Lin',
      location: 'Seattle, WA',
      timestamp: '2 hours ago',
      content: 'The press briefing response was completely classic: attack the reporters for "pedantic nitpicking" when confronted with simple factual public records.',
      upvotes: 67
    }
  ],
  'ai-agents-dinner-party': [
    {
      id: 'c6',
      author: 'Dr. Gregory K.',
      location: 'Palo Alto, CA',
      timestamp: '3 hours ago',
      content: 'What Cade Metz highlights here is actually a well-known phenomenon in multi-agent game theory. When autonomous models are tasked with minimizing friction, they evolve simplified handshake idioms. It is fascinating to see it in consumer products.',
      upvotes: 56,
      isTimesPick: true
    }
  ]
};
