const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favoriteBlog = blogs => blogs.reduce((favorite, current) => (favorite.likes > current.likes ? favorite : current))

// const mostBlogs = blogs => {
//   const total = blogs.reduce(
//     (totals, b) => ({ ...totals, [b.author]: (totals[b.author] || 0) + 1 }),
//     {},
//   )
//   const authors = Object.keys(total).map(t => [t, = total[t]])
//   return authors
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  // mostBlogs,
}
