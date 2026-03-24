import styles from './styles.module.css'

const Image = ({ image }) => {
	return (
		<div className={styles.wrapper}>
			{image ? <img src='' alt='' className={styles.image} /> : null}
		</div>
	)
}

export default Image