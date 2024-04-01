import classNames from 'classnames/bind';
import styles from './Create.module.scss';
import AddIcon from '@mui/icons-material/Add';

const cx = classNames.bind(styles);

const Create = () => {
  return (
    <div className={cx('container')}>
    <div className={cx('card')}>
    <div className={cx('create-icon')}>
        <AddIcon sx={{ fontSize: 60 ,position: "absolute", left: "50%" ,top: "50%" , transform: "translate(-50%,-50%)"}}/>
    </div>
    <span className={cx('card-title')}>Blank</span>
    </div>
</div>
  )
}

export default Create