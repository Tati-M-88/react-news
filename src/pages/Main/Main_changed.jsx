import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import { getCategories, getNews } from '../../api/apiNews'
import NewsList from '../../components/NewsList/NewsList'
import Pagination from '../../components/Pagination/Pagination'
import Categories from '../../components/Categories/Categories'
import Search from '../../components/Search/Search'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants'
import { useFilters } from '../../helpers/hooks/useFilters'
// import { useFetch } from '../../helpers/hooks/useFetch'

const Main = () => {
	const {filters, changeFilter} = useFilters({
		pageNumber: 1,
		pageSize: PAGE_SIZE,
		category: null,
		q: ''
	})
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [categories, setCategories] = useState([])
	const [keywords, setKeywords] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('Все')

	const debouncedKeywords = useDebounce(filters.keywords, 1500)

	// const { data, error, isLoading } = useFetch(getNews, {
	// 	pageNumber: currentPage,
	// 	pageSize: PAGE_SIZE,
	// 	category: selectedCategory === 'Все' ? null : selectedCategory,
	// 	q: debouncedKeywords
	// })

	const fetchNews = async (currentPage) => {
		try {
			setIsLoading(true)
			const response = await getNews({
				// pageNumber: currentPage,
				// pageSize: PAGE_SIZE,
				// category: selectedCategory === 'Все' ? null : selectedCategory,
				...filters,
				q: debouncedKeywords
			})
			setNews(response.articles)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await getCategories()
			const processedData = response.sources.map(category => {
				return category.category
			});
			const uniqueCategoryList = [...new Set(processedData)]
			setCategories(['Все', ...uniqueCategoryList])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchNews(currentPage)
	}, [currentPage, selectedCategory, debouncedKeywords])

	useEffect(() => {
		fetchCategories()
	}, [])

	const handleNextPage = () => {
		if (filters.pageNumber < TOTAL_PAGES) {
			changeFilter('pageNumber', filters.pageNumber + 1)
		}
	}

	const handlePreviousPage = () => {
		if (filters.pageNumber > 1) {
			changeFilter('pageNumber', filters.pageNumber - 1)
		}
	}

	const handlePageClick = (pageNumber) => {
		changeFilter('pageNumber', pageNumber)
	}

	return (
		<main className={styles.main}>
			<Categories
				categories={categories}
				setSelectedCategory={setSelectedCategory}
				selectedCategory={selectedCategory} />

			<Search keywords={filters.keywords} setKeywords={(keywords) => changeFilter('keywords', keywords)} />

			<NewsBanner isLoading={isLoading} item={news.length > 0 && news[0]} />

			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={TOTAL_PAGES}
				currentPage={filters.pageNumber} />

			<NewsList isLoading={isLoading} news={news} />

			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={TOTAL_PAGES}
				currentPage={filters.pageNumber} />
		</main>
	)
}

export default Main