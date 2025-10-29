// src/components/newsData.js

// This file now contains a total of 11 articles.
// The "slug" is the unique ID used in the URL.

export const allNewsArticles = [
  // --- EXISTING ARTICLES ---
  {
    slug: 'hyjain-expands-to-middle-east',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto-format&fit=crop',
    title: 'HYJAIN Foods expands to the Middle East, opening new Dubai office to serve growing demand.',
    date: 'july 26, 2025',
    category: 'Expansion',
    gridSpan: 6,
    content: `
      <p>In a significant move to strengthen its global presence, HYJAIN has officially opened its first international office in Dubai, UAE. This expansion is a direct response to the burgeoning demand for authentic, high-quality Indian food products in the Middle East.</p>
      <p>Our CEO stated, "The Middle East is a strategic market for us. We've seen a tremendous organic interest in our dehydrated products and spices. This new office will allow us to better serve our customers and build strong partnerships in the region."</p>
      <p>The Dubai office will serve as a hub for distribution, marketing, and customer relations for the entire GCC region.</p>
    `,
  },
  {
    slug: 'sustainable-brand-of-the-year-award',
    image: 'https://images.pexels.com/photos/6345341/pexels-photo-6345341.jpeg',
    title: 'HYJAIN wins "Sustainable Brand of the Year" for its breakthrough eco-friendly packaging.',
    date: 'August 02, 2025',
    category: 'Award',
    gridSpan: 6,
    content: `
      <p>We are thrilled to announce that HYJAIN has been awarded "Sustainable Brand of the Year" at the annual Food & Beverage Leadership Summit. The award recognizes our company-wide commitment to reducing our environmental footprint.</p>
      <p>The judging panel highlighted our new line of 100% compostable packaging for dehydrated vegetables, a first in the industry. "HYJAIN is not just talking about sustainability; they are implementing it at every level of their operation," said the panel chair.</p>
    `,
  },
  {
    slug: '3-minute-breakfast-launch',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto-format&fit=crop',
    title: 'Announcing our "3-Minute" dehydrated breakfast range for modern lifestyles.',
    date: 'September 15, 2025',
    category: 'Product Launch',
    gridSpan: 4,
    content: `
      <p>Life is busy, but breakfast shouldn't be compromised. HYJAIN is excited to launch our new "3-Minute" breakfast range, including healthy Upma and Poha mixes. Just add hot water, wait three minutes, and enjoy a nutritious, delicious meal.</p>
      <p>Developed with natural ingredients and our signature dehydration process, this range is perfect for students, working professionals, and anyone seeking a quick and healthy start to their day.</p>
    `,
  },
  {
    slug: 'ceo-interview',
    image: 'https://images.pexels.com/photos/5591187/pexels-photo-5591187.jpeg',
    title: 'A Conversation with our CEO on the Future of Healthy, Convenient Eating.',
    date: 'July 21, 2025',
    category: 'Interview',
    gridSpan: 4,
    content: `<p>We sat down with our CEO to discuss the vision behind HYJAIN and the future of the food industry. "Convenience can no longer come at the cost of health," he explained. "Our mission is to prove that pure, natural food can also be the easiest choice for families."</p>`,
  },
  {
    slug: 'organic-farm-partnership',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto-format&fit=crop',
    title: 'New partnership with 500+ organic farms to ensure 100% natural ingredients.',
    date: 'June 05, 2025',
    category: 'Community',
    gridSpan: 4,
    content: `<p>HYJAIN is proud to announce a landmark partnership with over 500 certified organic farms across India. This initiative guarantees that every product starts with the purest, most sustainably grown ingredients, direct from the source.</p>`,
  },
  
  // --- ✅ 5 NEW ARTICLES START HERE ---

  {
    slug: 'power-of-dehydration-health',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    title: 'The Power of Dehydration: Locking in Nutrients the Natural Way.',
    date: 'April 28, 2025',
    category: 'Health',
    gridSpan: 4,
    content: `
      <p>Did you know that modern dehydration is one of the best ways to preserve the nutritional value of fresh produce? Unlike other preservation methods, our gentle, low-temperature process locks in essential vitamins, minerals, and enzymes.</p>
      <p>This means our dehydrated vegetables and fruits offer a concentrated burst of flavor and nutrition, making it easy to add a healthy boost to any meal, any time of the year.</p>
    `,
  },
  {
    slug: 'hyjain-kitchen-recipes',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto-format&fit=crop',
    title: 'From Our Kitchen to Yours: 5 Easy Recipes Using HYJAIN Spices.',
    date: 'March 22, 2025',
    category: 'Recipes',
    gridSpan: 4,
    content: `
      <p>Unlock your inner chef with our new recipe series! This week, we're sharing five simple yet flavorful dishes you can create using our authentic spice blends. From a quick Paneer Tikka to a hearty vegetable curry, discover how HYJAIN can elevate your home cooking.</p>
      <p>Each recipe is designed for busy weeknights and guaranteed to impress. Visit our blog for the full step-by-step guides!</p>
    `,
  },
  {
    slug: 'project-annapurna-csr',
    image: 'https://images.pexels.com/photos/34097735/pexels-photo-34097735.jpeg',
    title: "HYJAIN Launches 'Project Annapurna' to Support Local Women Farmers.",
    date: 'February 10, 2025',
    category: 'CSR',
    gridSpan: 4,
    content: `
      <p>As part of our commitment to Corporate Social Responsibility, we are proud to launch 'Project Annapurna'. This initiative aims to empower women farmers in rural communities by providing them with training, resources, and fair-trade contracts.</p>
      <p>"By investing in these talented women, we not only ensure the quality of our ingredients but also help build stronger, more resilient communities," said our Head of Sustainability.</p>
    `,
  },
  {
    slug: 'meet-the-farmer-sundried-tomatoes',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto-format&fit=crop',
    title: 'Meet the Farmer: The Story Behind Our Sun-Kissed Tomatoes.',
    date: 'January 19, 2025',
    category: 'Sourcing',
    gridSpan: 6,
    content: `
      <p>Ever wonder where the intense flavor of our sun-dried tomatoes comes from? We take you to the fields of Karnataka to meet Ramesh, a third-generation farmer who has perfected the art of growing tomatoes for dehydration.</p>
      <p>"We use no artificial pesticides, only the sun and the soil," Ramesh explains. "It's a slower process, but it's the only way to get that deep, sweet flavor that HYJAIN is known for."</p>
    `,
  },
  {
    slug: 'future-of-snacking-vision',
    image: 'https://images.pexels.com/photos/3531700/pexels-photo-3531700.jpeg',
    title: "HYJAIN's Vision for the Future of Healthy Snacking in India.",
    date: 'August 05, 2025',
    category: 'Innovation',
    gridSpan: 6,
    content: `
      <p>The snacking landscape is changing. Consumers are demanding options that are not only convenient but also genuinely healthy. HYJAIN is at the forefront of this movement with our upcoming line of dehydrated fruit crisps and vegetable chips.</p>
      <p>Using a unique vacuum-frying technique, we can create incredibly crunchy and satisfying snacks with a fraction of the oil and no added sugar. It's the future of guilt-free indulgence.</p>
    `,
  },
];