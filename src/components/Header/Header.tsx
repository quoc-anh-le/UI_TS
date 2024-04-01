import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, IconButton, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AppsIcon from '@mui/icons-material/Apps';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useAuthStore } from '../../store/store';

const cx = classNames.bind(styles);

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ setOpen }: Props) => {
  const {user} = useAuthStore()

  const handleOpenDialog = () => {
    setOpen(true)
  }
  
  return (
   <div className={cx('header')}>
      <div className={cx('menu')}>
        <IconButton>
        <MenuIcon/>
        </IconButton>
        <span className={cx('title')}>SURVEY APP</span>
      </div>
      <div className={cx('search-bar')}>
        <IconButton>
        <SearchIcon/>
        </IconButton>
        <input type='text' name='search' placeholder='Search...'/>
      </div>
      <div className={cx('individual')}>
       {user && (
        <div className={cx('info')}>
        <Typography variant='subtitle1'>{`${user.firstname} ${user.lastname}`}</Typography>
       <Avatar sx={{ width: 28, height: 28, marginLeft: "5px", bgcolor: "orange" }}>{user.firstname[0].toUpperCase()}</Avatar>
       </div>
      )}
        <IconButton onClick={handleOpenDialog}>
          <AppsIcon/>
        </IconButton>
      </div>
   </div>
  )
}

export default Header

