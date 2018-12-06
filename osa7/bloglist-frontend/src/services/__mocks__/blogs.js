const token = null

const blogs = [
  {
    _id: '1111',
    title: 'Testi Blogi1',
    url: 'www.testiblogi1.fi',
    author: 'Tero Testimies1',
    likes: 100,
    user: {
      _id: '11',
      username: 'Tintti1',
      name: 'Kalle Kayttaja1',
    },
  },
  {
    _id: '2222',
    title: 'Testi Blogi2',
    url: 'www.testiblogi2.fi',
    author: 'Tero Testimies2',
    likes: 200,
    user: {
      _id: '22',
      username: 'Tintti2',
      name: 'Kalle Kayttaja2',
    },
  },
  {
    _id: '3333',
    title: 'Testi Blogi3',
    url: 'www.testiblogi3.fi',
    author: 'Tero Testimies3',
    likes: 100,
    user: {
      _id: '33',
      username: 'Tintti3',
      name: 'Kalle Kayttaja3',
    },
  },
]

const getAll = () => Promise.resolve(blogs)

export default { getAll, blogs }
