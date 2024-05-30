import React, { useEffect, useState } from 'react'
import './index.scss'
import Collection from './Collection'

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  const [collections, setCollections] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://6658c47c5c3617052649c5ee.mockapi.io/collections?page=${page}&limit=3&${
        categoryId ? `category=${categoryId}` : ''
      }`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((value, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}
              key={index}
            >
              {value.name}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Загрузка...</h2>
        ) : (
          collections
            .filter((value) => {
              return value.name.toLowerCase().includes(searchValue)
            })
            .map((value, index) => (
              <Collection key={index} name={value.name} images={value.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
