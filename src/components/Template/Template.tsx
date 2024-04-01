import classNames from 'classnames/bind';
import styles from './Template.module.scss';
import Create from './Create/Create';
import { useNavigate } from 'react-router-dom';
import { useActionStore } from '../../store/store';
import { CREATE } from '../../constants/constant';

const cx = classNames.bind(styles);

const Template = () => {

  const navigate = useNavigate();
  const { setAction } = useActionStore()

  const handleCreateNewSurvey = () => {
    setAction(CREATE);
    navigate('/form/create')
    
  }

  return (
    <div className={cx('template')}>
        <div className={cx('container')}>
        <div className={cx('header')}>
            <span className={cx('title')}>Start a new survey</span>
        </div>
        <div onClick={handleCreateNewSurvey} className={cx('create-btn')}>
          <Create />
       </div>
        </div>
    </div>
  )
}

export default Template