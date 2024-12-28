import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { userColumns } from "../../components/table/table-data";
import { IUserBank, IUserData, RoleEnum } from "../../interfaces/user-interfaces";
import * as UserService from "../../services/user-service";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import "./UserPage.scss";

const Customers = () => {
    const [users, setUsers] = useState<IUserData[]>([]);
    const [open, setOpen] = useState(false);
    const [bankDetails, setBankDetails] = useState<IUserBank | undefined>();

    const handleOpenBankDialog = (bank: IUserBank) => {
        setOpen(true);
        setBankDetails(bank)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetCustomer = async () => {

        const users = await UserService.getAllUser();

        setUsers(users.data);
    };

    const handleUpdateUserRole = async (userId: string, userRole: RoleEnum) => {
        try {
            await UserService.updateUserRole(userId, userRole)
            toastSuccess("Cập nhật hạng người dùng thành công")
            await handleGetCustomer()
        } catch (error) {
            toastError("Cập nhật hạng người dùng thất bại: ", error)
        }
    }

    useEffect(() => {
        handleGetCustomer();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-title"> Danh sách khách hàng</div>
            </div>
            <div className="page-contents">
                <div className="Customer">
                    <div className="Customer__filter">
                    </div>
                    <div className="">
                        <DataGrid
                            rows={users}
                            columns={userColumns(handleUpdateUserRole, handleOpenBankDialog)}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            </div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Thông Tin Ngân Hàng</DialogTitle>
                <DialogContent>
                    {/* Bank Name Field */}
                    <TextField
                        margin="dense"
                        label="Bank Name"
                        name="bankName"
                        value={bankDetails?.bankName}
                        fullWidth
                    />
                    {/* Bank ID Field */}
                    <TextField
                        margin="dense"
                        label="Bank ID"
                        name="bankId"
                        value={bankDetails?.bankId}
                        fullWidth
                    />
                    {/* Full Name Field */}
                    <TextField
                        margin="dense"
                        label="Full Name"
                        name="fullName"
                        value={bankDetails?.fullName}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Customers;
