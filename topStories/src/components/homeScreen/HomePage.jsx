import { AppBar, Box, Container, IconButton, styled, Toolbar, Typography } from "@mui/material"
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import SettingsIcon from '@mui/icons-material/Settings';
import MainCard from "../topStoriesNews/MainCard";
import SportsCard from "../topSports/SportsCard";
import CurrencyCard from "../moneyMarket/CurrencyCard";


const Search = styled("div")(({theme})=>({
    postion:"relative",
    width:"100%",
    marginLeft:0,
    backgroundColor:"#dde0dd",
    borderRadius:"50px"
}))

const SearchIconWrapper = styled("div")(({theme})=>({
    position:"absolute",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:"10px",
    bottom:0
}))

const InputBaseStyled = styled(InputBase)(({theme})=>({
    color: 'inherit',
  width: '100%',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))
const HomePage = () => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color="#c2d9c3" position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            // color="success"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <ListIcon />
                        </IconButton>

                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <InputBaseStyled
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{display:{xs:"none",md:"flex"}}}>
                            <IconButton>
                                <SettingsIcon />
                            </IconButton>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",flexWrap:"wrap",marginTop:"30px",justifyContent:"space-around"}}>
                <MainCard />
                <SportsCard />
                <CurrencyCard />
            </Box>
        </Container>
    )
}

export default HomePage