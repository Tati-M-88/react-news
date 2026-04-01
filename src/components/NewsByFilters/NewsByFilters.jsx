import { useState } from 'react'
import NewsBanner from '../NewsBanner/NewsBanner'
import NewsList from '../NewsList/NewsList'
import Pagination from '../Pagination/Pagination'
import Skeleton from '../Skeleton/Skeleton'
import styles from './styles.module.css'

const NewsByFilters = ({isLoading, news, handleNextPage, handlePreviousPage, handlePageClick, totalPages}) => {
	const [currentPage, setCurrentPage] = useState(1)
	// const totalPages = 10

	{/*const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}*/}

	return (
		<section className={styles.section}>

			{news.length > 0 && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton type='banner' count={1} />}

			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={totalPages}
				currentPage={currentPage} />

			{!isLoading ? <NewsList news={news} /> : <Skeleton type='item' count={10} />}

			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={totalPages}
				currentPage={currentPage} />
		</section>
	)
}

export default NewsByFilters