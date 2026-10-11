// Everywhere Candice has been. `id` is the ISO numeric country code used by the map
// data; `pin` is [longitude, latitude] for the dot and label. After editing, run
// `node scripts/build-map.mjs` to rebuild src/data/world-map.json.
export const VISITED = [
  { id: '156', name: 'China', pin: [104, 35] },
  { id: '392', name: 'Japan', pin: [138, 36] },
  { id: '410', name: 'South Korea', pin: [127.9, 36.2] },
  { id: '840', name: 'USA', pin: [-98, 39] },
  { id: '300', name: 'Greece', pin: [22.5, 39] },
  { id: '356', name: 'India', pin: [79, 22] },
  { id: '348', name: 'Hungary', pin: [19.5, 47] },
  { id: '250', name: 'France', pin: [2.5, 46.5] },
  { id: '620', name: 'Portugal', pin: [-8, 39.5] },
  { id: '484', name: 'Mexico', pin: [-102, 23.5] },
  { id: '203', name: 'Czech Republic', pin: [15.8, 49.6] },
  { id: '724', name: 'Spain', pin: [-3.7, 40.2] },
  { id: '276', name: 'Germany', pin: [10.4, 51] },
  { id: '826', name: 'UK', pin: [-1.5, 52.8] },
  { id: '616', name: 'Poland', pin: [19.4, 52] },
  { id: '208', name: 'Denmark', pin: [9.5, 56] },
  { id: '124', name: 'Canada', pin: [-106, 56] },
  { id: '704', name: 'Vietnam', pin: [106.5, 15] },
  { id: '360', name: 'Indonesia', pin: [113.5, -1] },
  { id: '764', name: 'Thailand', pin: [101, 15.5] },
  { id: '705', name: 'Slovenia', pin: [14.8, 46.1] },
  { id: '818', name: 'Egypt', pin: [30, 26.5] },
  { id: '188', name: 'Costa Rica', pin: [-84, 10] },
  { id: '604', name: 'Peru', pin: [-75, -10] },
  // Monaco and Singapore are too small to have a shape on the map, so they get a pin only.
  { id: null, name: 'Monaco', pin: [7.42, 43.74] },
  { id: '784', name: 'UAE', pin: [54, 24] },
  { id: null, name: 'Singapore', pin: [103.82, 1.35] },
  { id: '036', name: 'Australia', pin: [134, -25] },
]

// Listed under China in the country count; lit up and labelled on the map.
export const ALSO = [
  { id: '158', name: 'Taiwan', pin: [121, 23.7] },
  { id: null, name: 'Hong Kong & Macau', pin: [113.9, 22.25] },
]

// Places with a photo memory. Each gets a round thumbnail on the map that opens the
// full picture. `at` is the real spot; `callout` is where the thumbnail sits, pulled
// out over open water or empty land so crowded regions (Europe!) don't overlap.
// `phone` is where it sits on phones, in map units (the map is 1000 x 500): thumbnails
// are drawn much larger there so they can be tapped, so they need to sit further apart.
// Labelled by country. Images come from scripts/travel-photos.py.
export const PHOTOS = [
  { file: 'usa', name: 'USA', at: [-87.6, 41.9], callout: [-62, 33], phone: [345, 205] },
  { file: 'mexico', name: 'Mexico', at: [-101.3, 21], callout: [-119, 13], phone: [150, 250] },
  { file: 'peru', name: 'Peru', at: [-72, -13.5], callout: [-93, -17], phone: [225, 350] },
  { file: 'uk', name: 'UK', at: [-0.1, 51.5], callout: [-17, 60], phone: [440, 70] },
  { file: 'france', name: 'France', at: [2.5, 46.5], callout: [-23, 48], phone: [405, 135] },
  { file: 'portugal', name: 'Portugal', at: [-8.6, 40.5], callout: [-25, 36], phone: [415, 205] },
  { file: 'spain', name: 'Spain', at: [-3.7, 40.2], callout: [-13, 26], phone: [480, 240] },
  { file: 'germany', name: 'Germany', at: [10.4, 51], callout: [5, 65], phone: [510, 40] },
  { file: 'czech', name: 'Czech Republic', at: [14.42, 50.08], callout: [27, 64], phone: [580, 45] },
  { file: 'hungary', name: 'Hungary', at: [19.2, 47.3], callout: [39, 54], phone: [640, 95] },
  { file: 'athens', name: 'Greece', at: [23.7, 38], callout: [18, 30], phone: [605, 235] },
  { file: 'india', name: 'India', at: [79, 22], callout: [66, 9], phone: [680, 290] },
  { file: 'shanghai', name: 'China', at: [121.5, 31.2], callout: [134, 21], phone: [905, 240] },
  { file: 'korea', name: 'South Korea', at: [126.98, 37.57], callout: [130, 51], phone: [800, 100] },
  { file: 'japan', name: 'Japan', at: [138, 36], callout: [155, 41], phone: [920, 130] },
]

export const COUNTRY_COUNT = VISITED.length
