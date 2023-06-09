import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'
import {Post} from '../../types'

const RenderCards = ({data,title}:{data: Post[]|null, title: string}) => {
  if (data?.length > 0) {
    return <>{
      data.map((post: null | Post) => <Card key={post?._id} {...post}/>)
    }</>
  }

  return (
    <h2 className='text-xl text-[#6449ff] uppercase font-bold mt-5'>{title}</h2>
  )
}

const Home = () => {
  const [loading, setloading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setsearchText] = useState('')
  const [searchedResults, setsearchedResults] = useState<Post[]|null>(null)
  const [searchTimeout, setsearchTimeout] = useState<(any)>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json()
          setAllPosts(result.data.reverse())
        }
      } catch (error) {
        console.log(error)
      } finally {
        setloading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    clearTimeout(searchTimeout)
    setsearchText(e.target.value)

    setsearchTimeout(setTimeout(() => {
      const searchResults = allPosts.filter((post: Post) => post.name.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase()))
      setsearchedResults(searchResults)
    }, 500))
    
  }
  

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of imaginative and visually stunning images by DALL-E AI</p>
      </div>

      <div className='mt-16'>
        <FormField
          labelName='Search Post'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing Results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                    data={searchedResults}
                    title="No Search Results Found"
                />
              ) : (
                <RenderCards
                    data={allPosts}
                    title="No posts found"
                />      
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home