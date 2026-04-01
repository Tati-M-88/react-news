import NewsBanner from '../NewsBanner/NewsBanner'
import styles from './styles.module.css'

const BannerList = ({ banners }) => {
	return (
		<ul className={styles.banners}>
			{banners?.map((banner, index) => {
				return (
					<NewsBanner key={index} item={banner} />
				)
			})}
		</ul>
	)
}

export default BannerList