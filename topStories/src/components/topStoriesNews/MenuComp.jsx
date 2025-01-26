import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
const MenuComp = ({anchor,isOpen,handleClose}) => {
    console.log("Ancho",anchor)

    return (
        <Menu 
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            sx={{left:"-150px"}} 
            open={isOpen}
            onClose={handleClose}
            >
            <MenuItem>
                <ListItemIcon>
                    <VisibilityOffOutlinedIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText sx={{
                    paddingBottom:0,
                    ".MuiTypography-root ":{
                        fontSize:"0.8rem"
                    }
                }}>
                    Hide this card
                </ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <SettingsOutlinedIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText sx={{
                    paddingBottom:0,
                    ".MuiTypography-root ":{
                        fontSize:"0.8rem"
                    }
                }}>
                    Settings
                </ListItemText>
            </MenuItem>
        </Menu>
    )
}

export default MenuComp