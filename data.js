export const categories = [
  { category: 'all', id: 'all' },
  { category: 'wine', id: 'wine' },
  { category: 'game', id: 'game' },
  { category: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', id: 'qqqqqqqqqqqqqqqqqqqqqqqq' },
];

export const data = [
  {
    title: 'Java',
    text: [
      { content: `что-то... `, completed: true, id: '1' },
      {
        content: `fffffkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`,
        completed: false,
        id: '2'
      },
      { content: `ffff`, completed: false, id: '3' },
      { content: `ddd`, completed: false, id: '4' },
      { content: `sss`, completed: false, id: '5' },
      { content: `bbb`, completed: false, id: '6' },
      { content: `sds`, completed: false, id: '7' },
      { content: `trttr`, completed: false, id: '8' },
    ],
    id: '1',
    itemBackground: 'lightgreen',
    category: 'all',
    date: Date.parse('01 Jan 1970 00:00:00 GMT'),
    type: 'list',
  },
  {
    title: 'React native',
    text: [
      { content: `что-то... `, completed: false, id: '1' },
      {
        content: `fffffkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`,
        completed: false,
        id: '2'
      },
      { content: `ffff`, completed: false, id: '3' },
    ],
    id: '2',
    itemBackground: 'lightblue',
    category: 'all',
    date: Date.parse('04 Dec 1995 00:12:00 GMT'),
    type: 'text',
  },
  {
    title: 'Angular',
    text: [
      { content: `что-то... `, completed: false, id: '1' },
    ],
    id: '3',
    itemBackground: 'white',
    category: 'wine',
    date: new Date(),
    type: 'text',
  },
  {
    title: 'NodeJS',
    text: [
      { content: `что-то... `, completed: false, id: '1' },
    ],
    id: '4',
    itemBackground: 'lightgray',
    category: 'game',
    date: Date.parse('04 Dec 2005 00:12:00 GMT'),
    type: 'text',
  },
];
