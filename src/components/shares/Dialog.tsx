
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useAuthStore } from '../../store/store';


export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SimpleDialog({open, onClose}: SimpleDialogProps) {
  const { logout } = useAuthStore()

  const handleClose = () => {
    onClose()
  };

  const handleLogout = () => {
    logout()
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Options</DialogTitle>
      <List sx={{ width: "200px" ,pt: 0 }}>

          <ListItem onClick={handleLogout} disableGutters>
          <ListItemButton sx={{
          ":hover": {
            backgroundColor: "red",
          },
        }}
            autoFocus
          >
            <ListItemAvatar>
              <IconButton>
                <Logout />
              </IconButton>
            </ListItemAvatar>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      
      </List>
    </Dialog>
  );
}
