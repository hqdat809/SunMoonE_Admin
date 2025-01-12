import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, TextField } from '@mui/material';
import { updateChangePassword } from '../../services/user-service';
import { toastError, toastSuccess } from '../../utils/notifications-utils';

interface IProps {
    userId: string;
}

export const UserActionsColumn = ({ userId }: IProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [password, setPassword] = React.useState("");


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleClickOpenDialog = () => {
        setOpenDialog(true);
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChangePassword = async () => {
        // call api here
        handleCloseDialog()
        try {
            await updateChangePassword(userId, password)
            toastSuccess("Đổi mật khẩu thành công")
            setPassword("")
        } catch (error) {
            toastError("Đổi mật khẩu thất bại")
        }
    }


    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClickOpenDialog}>Đổi mật khẩu</MenuItem>
            </Menu>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Bạn có muốn đổi mật khẩu người dùng?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Nhập mật khẩu mới' size='small' variant='outlined' fullWidth />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant='contained' color='error'>Hủy</Button>
                    <Button onClick={handleChangePassword} variant='contained'>Đổi mật khẩu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}