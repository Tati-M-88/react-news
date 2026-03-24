import NewsItem from '../NewsItem/NewsItem'
import styles from './styles.module.css'

const NewsList = ({ news }) => {
	return (
		<ul className={styles.list}>
			{news.map(item => {
				return <NewsItem key={item.uuid} item={item} />
			})}
		</ul>
	)
}

export default NewsList